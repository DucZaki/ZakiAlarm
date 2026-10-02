import test from 'node:test';
import assert from 'node:assert/strict';
import {nextOccurrence,nextAlarm,newAlarm,normalizeText,memoryMatches,escapeHTML,validateAlarm} from '../src/domain/alarm.js';
import {restoreState,persistState,durableState} from '../src/state/persistence.js';
const at = (day,hour,minute=0) => new Date(2026,9,day,hour,minute).getTime();
const alarm = extra => ({...newAlarm(),...extra});

test('one-off alarm rolls past midnight and handles noon as 24-hour time',()=>{
  assert.equal(nextOccurrence(alarm({time:'00:10',days:[]}),at(2,23,59)),at(3,0,10));
  assert.equal(nextOccurrence(alarm({time:'12:45',days:[],period:'CH'}),at(2,12)),at(2,12,45));
});
test('weekday and weekend schedules select the actual next occurrence',()=>{
  assert.equal(nextOccurrence(alarm({time:'06:30'}),at(2,9)),at(5,6,30));
  assert.equal(nextOccurrence(alarm({time:'07:15',days:['T7','CN']}),at(2,9)),at(3,7,15));
});
test('skip only suppresses the next occurrence',()=>{
  const a=alarm({time:'06:30',days:['T2'],skipAt:at(5,6,30)});
  assert.equal(nextOccurrence(a,at(2,9)),at(12,6,30));
});
test('exact second quick naps expire and disabled alarms never schedule',()=>{
  const due=at(2,10)+45000;
  assert.equal(nextOccurrence(alarm({onceAt:due}),due-1),due);
  assert.equal(nextOccurrence(alarm({onceAt:due}),due),null);
  assert.equal(nextOccurrence(alarm({enabled:false}),at(2,5)),null);
});
test('next alarm is sorted by due time rather than list order',()=>{
  const late=alarm({time:'09:00'}),early=alarm({time:'06:00'});
  assert.equal(nextAlarm([late,early],at(2,5)).alarm.id,early.id);
});
test('typing requires complete normalized Unicode text and memory rejects partial sets',()=>{
  assert.equal(normalizeText('  Chào   buổi sáng.\n'),normalizeText('Chào buổi sáng.'.normalize('NFD')));
  assert.notEqual(normalizeText('Chao buoi sang.'),normalizeText('Chào buổi sáng.'));
  assert.equal(memoryMatches([0,3,8],[8,0,3]),true);
  assert.equal(memoryMatches([0,3,8],[0,3]),false);
  assert.equal(memoryMatches([0,3,8],[0,3,7]),false);
});
test('alarm validation rejects invalid time, blank labels and inaudible volume',()=>{
  assert.ok(validateAlarm(alarm({time:'24:00'})));
  assert.ok(validateAlarm(alarm({label:'  '})));
  assert.ok(validateAlarm(alarm({volume:0})));
  assert.equal(validateAlarm(newAlarm()),null);
  assert.equal(escapeHTML('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;');
});
test('persistence restores records but never auto-resumes ambient audio',()=>{
  let value;const storage={getItem:()=>value,setItem:(key,v)=>{value=v;}};
  const defaults={alarms:[],theme:'dark',relaxation:{volume:0.5}};
  const state={...defaults,alarms:[newAlarm()],relaxation:{isPlaying:true,deadline:123,favorites:['rain']},toast:{message:'temporary'},currentScreen:'D1_ringing'};
  assert.equal(persistState(state,storage),true);
  const restored=restoreState(defaults,storage);
  assert.equal(restored.alarms.length,1);assert.equal(restored.relaxation.isPlaying,false);
  assert.equal(restored.relaxation.deadline,null);assert.equal(durableState(state).toast,undefined);
});
test('corrupt/unavailable storage does not crash startup or falsely report a save',()=>{
  const defaults={alarms:[],relaxation:{}};
  assert.equal(restoreState(defaults,{getItem:()=>'{broken'}),defaults);
  assert.equal(restoreState(defaults,{getItem:()=>JSON.stringify({version:1,state:{alarms:[null]}})}),defaults);
  assert.equal(persistState(defaults,{setItem:()=>{throw new Error('quota');}}),false);
});
test('legacy quick naps are removed from alarm cards and only the newest timer survives migration',()=>{
  const now=Date.now();
  const standard=newAlarm();
  const first={...newAlarm(),id:'nap-a',label:'Chợp mắt 15 phút',onceAt:now+900000,days:[],missions:[]};
  const last={...newAlarm(),id:'nap-b',label:'Chợp mắt 30 phút',onceAt:now+1800000,days:[],missions:[]};
  const storage={getItem:()=>JSON.stringify({version:1,state:{alarms:[standard,first,last]}})};
  const restored=restoreState({alarms:[],relaxation:{},quickNap:null},storage);
  assert.deepEqual(restored.alarms.map(a=>a.id),[standard.id]);
  assert.deepEqual(restored.quickNap,{minutes:30,deadline:last.onceAt});
});
test('replacement quick nap state persists without adding alarm cards',()=>{
  let value;
  const storage={getItem:()=>value,setItem:(_key,data)=>{value=data;}};
  const defaults={alarms:[newAlarm()],relaxation:{},quickNap:null};
  const replacement={minutes:20,deadline:Date.now()+20*60000};
  persistState({...defaults,quickNap:replacement},storage);
  const restored=restoreState(defaults,storage);
  assert.equal(restored.alarms.length,1);
  assert.deepEqual(restored.quickNap,replacement);
});
