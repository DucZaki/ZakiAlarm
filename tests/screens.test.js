import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {store} from '../src/state/store.js';
import {newAlarm} from '../src/domain/alarm.js';
import {renderFunctional} from '../src/screens/functional.js';
import {renderAlarms} from '../src/screens/alarms.js';
import {renderOnboarding} from '../src/screens/onboarding.js';
const source=readFileSync(new URL('../src/components/prototypeToolbar.js',import.meta.url),'utf8');
const screens=[...source.matchAll(/id: '([A-G]\d+_[^']+|exec_[^']+)'/g)].map(x=>x[1]);
const render=s=>renderFunctional(s)??(s.currentScreen.startsWith('A')?renderOnboarding(s):renderAlarms(s));

test('every exposed route renders even with an empty user account',()=>{
  assert.ok(screens.length>=45);
  for(const currentScreen of screens){
    const state={...structuredClone(store.getState()),currentScreen,alarms:[],editingAlarm:newAlarm()};
    const html=render(state);assert.equal(typeof html,'string',currentScreen);
    assert.ok(html.length>50,currentScreen);assert.ok(!html.includes('undefined'),currentScreen);
    assert.ok(!html.includes('NaN'),currentScreen);
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
    assert.equal(ids.length,new Set(ids).size,`Duplicate IDs in ${currentScreen}`);
  }
});
test('user labels and local filenames are escaped in saved and edit views',()=>{
  const a={...newAlarm(),label:'<img src=x onerror=alert(1)>',sound:'<script>bad</script>'};
  const base={...structuredClone(store.getState()),alarms:[a],editingAlarm:a,selectedAlarmForAction:a};
  for(const screen of ['B1_home','B2_create_edit','B7_actions']){
    const html=render({...base,currentScreen:screen});
    assert.ok(!html.includes('<img src=x'),screen);assert.ok(!html.includes('<script>bad'),screen);
  }
});
test('multi-mission practice can show completion without a ringing alarm',()=>{
  const html=render({...store.getState(),currentScreen:'D3_mission_completed',ringingAlarm:null,missionPractice:true,currentMissionSequence:['math','typing'],currentMissionStep:0});
  assert.ok(html.includes('Nhiệm vụ tiếp theo'));
});
test('quick nap countdown offers replacement and cancellation without an alarm card',()=>{
  const html=render({...store.getState(),currentScreen:'B9_nap_countdown',quickNap:{minutes:30,deadline:Date.now()+30*60000}});
  assert.ok(html.includes('id="quick-nap-countdown"'));
  assert.ok(html.includes('data-do="start-nap" data-value="15"'));
  assert.ok(html.includes('data-do="cancel-nap"'));
  assert.ok(!html.includes('alarm-card'));
});
