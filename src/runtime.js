import {store} from './state/store.js';
import {sound} from './audio/soundEngine.js';
import {alarmSounds} from './audio/catalog.js';
import {audioFile} from './audio/library.js';
import {NightRecorder} from './audio/recorder.js';
import {newAlarm,nextOccurrence,nextAlarm,validateAlarm,duration,normalizeText,memoryMatches} from './domain/alarm.js';
import {missions,missionRoute,defaultSentence} from './screens/functional.js';
import {durableState,STORAGE_KEY,persistState} from './state/persistence.js';
import confetti from 'canvas-confetti';

const state=()=>store.getState();
const toast=message=>store.showToast(message);
let camera=null,scanTimer=null,motionHandler=null,memoryTimer=null,previewTimer=null,testTimer=null,holdLock=null;
let lastTick=Date.now(),lastMotion=0,lastScreen=null,boostStart=0;
const scheduled=new Map();
const recorder=new NightRecorder();
let recordingAudio=null,recordingURL=null;
const clone=value=>structuredClone(value);

export function ensureDraft(){
  if(!state().editingAlarm)state().editingAlarm=newAlarm();
  const d=state().editingAlarm;
  d.missionSettings ||= {};
  d.soundId ||= alarmSounds.find(x=>x.name===d.sound)?.id||'gentle';
  return d;
}
function cleanSensors(){
  camera?.getTracks().forEach(t=>t.stop()); camera=null;
  clearInterval(scanTimer);scanTimer=null;
  clearTimeout(memoryTimer);memoryTimer=null;
  if(motionHandler)window.removeEventListener('devicemotion',motionHandler);
  motionHandler=null;
}
function stopAudio(){clearTimeout(previewTimer);sound.stopAll();recordingAudio?.pause();recordingAudio=null;if(recordingURL)URL.revokeObjectURL(recordingURL);recordingURL=null;state().playingRecording=null;window.speechSynthesis?.cancel();navigator.vibrate?.(0);state().previewSound=null;state().relaxation.isPlaying=false;state().relaxation.deadline=null;}
function stopPreview(){if(state().previewSound){clearTimeout(previewTimer);sound.stopAll();state().previewSound=null;}}
export function navigate(screen){
  if(screen.startsWith('B')&&screen!=='B1_home'||screen.startsWith('C'))ensureDraft();
  const active=state().activeAlarmSession;
  if(active&&['ringing','mission','check','snooze'].includes(active.phase)&&!screen.startsWith('D')&&!screen.startsWith('exec_')){
    toast('Hoàn thành báo thức hoặc dùng Thoát khẩn cấp trước khi rời màn hình.');return;
  }
  if(screen!==state().currentScreen){cleanSensors();stopPreview();}
  store.navigate(screen);
}
export function afterRender(){
  document.body.className=`theme-${state().theme} text-scale-${state().textScale}`;
  // Keep camera alive across toast/state renders without requesting access again.
  const video=document.querySelector('#mission-camera');
  if(video&&camera){video.srcObject=camera;video.play().catch(()=>{});}
  if(lastScreen!==state().currentScreen){
    lastScreen=state().currentScreen;
    document.querySelector('.screen-content')?.scrollTo(0,0);
  }
  document.querySelectorAll('.alarm-card-clickable-area,[id^="menu-"]').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');});
  document.querySelectorAll('.alarm-toggle').forEach(el=>el.setAttribute('aria-label','Bật/tắt báo thức'));
  document.querySelectorAll('.prototype-select').forEach(el=>el.disabled=!!state().activeAlarmSession);
  tickDisplays();
}
function edit(id){
  const original=state().alarms.find(a=>a.id===id);
  state().editingAlarm=original?clone(original):newAlarm();
  navigate('B2_create_edit');
}
function saveAlarm(){
  const d=ensureDraft(),error=validateAlarm(d);if(error)return toast(error);
  for(const id of d.missions){
    if(id==='qr'&&!d.missionSettings?.qr?.code?.trim())return toast('Nhập nội dung mã QR cần quét trước khi lưu.');
    if(id==='photo'&&!d.missionSettings?.photo?.reference)return toast('Chọn ảnh mẫu cho nhiệm vụ chụp ảnh trước khi lưu.');
  }
  const saved=clone(d);saved.label=saved.label.trim();saved.enabled=true;saved.period=Number(saved.time.slice(0,2))<12?'SA':'CH';
  saved.snoozeRemaining=saved.snoozeMax;delete saved.onceAt;delete saved.skipAt;delete saved.lastFiredAt;
  const index=state().alarms.findIndex(a=>a.id===saved.id);
  if(index<0)state().alarms.push(saved);else state().alarms[index]=saved;
  state().editingAlarm=null;navigate('B1_home');toast('Đã lưu báo thức trên thiết bị này.');
}
function addNap(minutes){
  const n=Number(minutes);if(!Number.isInteger(n)||n<1||n>180)return toast('Chọn từ 1 đến 180 phút.');
  if(state().activeAlarmSession)return toast('Hãy kết thúc báo thức đang reo trước khi bắt đầu nghỉ.');
  state().quickNap={minutes:n,deadline:Date.now()+n*60000};
  navigate('B9_nap_countdown');
}
function cancelNap(){
  state().quickNap=null;navigate('B1_home');toast('Đã hủy hẹn giờ chợp mắt.');
}
function ringNap(nap){
  state().quickNap=null;
  const a=newAlarm(),date=new Date();
  Object.assign(a,{label:`Hết giờ nghỉ ${nap.minutes} phút`,time:`${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`,period:date.getHours()<12?'SA':'CH',missions:[],snoozeEnabled:false,wakeupCheck:false});
  ring(a);
}
function ringingAudio(a){
  stopAudio();boostStart=a.boostSound?Date.now():0;
  sound.setVolume(a.boostSound?0.1:a.volume??0.8);sound.playAlarm(a.soundId||a.sound||'gentle');
  if(a.vibrate)navigator.vibrate?.([500,250,500]);
  if(a.speak&&'speechSynthesis'in window){const utterance=new SpeechSynthesisUtterance(a.label);utterance.lang='vi-VN';speechSynthesis.speak(utterance);}
}
export function ring(alarm,restore=false){
  cleanSensors();
  recorder.stop();
  const a=clone(alarm);a.snoozeRemaining=restore?(a.snoozeRemaining??a.snoozeMax??3):(a.snoozeMax??3);
  state().ringingAlarm=a;state().activeAlarmSession={alarm:a,phase:'ringing',deadline:null};
  state().currentMissionSequence=[];state().currentMissionStep=0;state().missionPractice=false;
  ringingAudio(a);store.navigate('D1_ringing');
  if('Notification'in window&&Notification.permission==='granted'&&document.hidden){try{new Notification('ZakiAlarm',{body:a.label,tag:'zaki-alarm'});}catch{}}
}
function finishAlarm(){
  const a=state().ringingAlarm;
  stopAudio();cleanSensors();
  if(state().missionPractice){endPractice();return;}
  if(a?.wakeupCheck){state().activeAlarmSession={alarm:a,phase:'check',deadline:Date.now()+300000};navigate('D4_wakeup_check');}
  else {state().activeAlarmSession=null;state().ringingAlarm=null;navigate('D6_morning_summary');}
}
function startAlarmMissions(){
  const a=state().ringingAlarm;if(!a)return;
  stopAudio();state().activeAlarmSession={alarm:a,phase:'mission',deadline:null};
  if(!a.missions.length)return finishAlarm();
  state().currentMissionSequence=[...a.missions];state().currentMissionStep=0;state().missionPractice=false;
  startMission(a.missions[0]);
}
function snooze(){
  const a=state().ringingAlarm;if(!a?.snoozeEnabled||a.snoozeRemaining<=0)return;
  a.snoozeRemaining--;stopAudio();
  state().activeAlarmSession={alarm:a,phase:'snooze',deadline:Date.now()+a.snoozeDuration*60000};
  navigate('D2_snoozing');
}
function randomMath(difficulty){
  const max=difficulty==='easy'?10:difficulty==='hard'?12:50;
  return {a:1+Math.floor(Math.random()*max),b:1+Math.floor(Math.random()*max),operator:difficulty==='hard'?'×':'+'};
}
function startMission(id){
  if(!missions[id])return;
  cleanSensors();const settings=(state().missionPractice?ensureDraft():state().ringingAlarm)?.missionSettings?.[id]||{};
  state().missionRun={id,count:settings.count||missions[id].count,completed:0,answer:'',difficulty:settings.difficulty||'medium',sentence:settings.sentence||defaultSentence,code:settings.code||'',reference:settings.reference,...randomMath(settings.difficulty||'medium')};
  if(id==='memory'){
    const pool=Array.from({length:9},(_,i)=>i);
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    Object.assign(state().missionRun,{target:pool.slice(0,Math.min(7,settings.count||3)),selected:[],reveal:true});
  }
  store.navigate(`exec_${id}`);
  if(id==='memory')memoryTimer=setTimeout(()=>{if(state().missionRun?.id==='memory'&&state().currentScreen==='exec_memory'){state().missionRun.reveal=false;store.notify();}},3000);
}
function tryMission(id){
  if(state().activeAlarmSession)return;
  state().missionPractice=true;state().currentMissionSequence=[id];state().currentMissionStep=0;startMission(id);
}
function endPractice(){cleanSensors();state().missionPractice=false;state().missionRun=null;state().currentMissionSequence=[];navigate('C1_mission_library');}
function victory(){
  cleanSensors();if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)confetti({particleCount:55,spread:60,origin:{y:0.65}});
  sound.playSuccess();
  if(state().missionPractice&&state().currentMissionStep+1>=state().currentMissionSequence.length){endPractice();toast('Thử nhiệm vụ thành công!');}
  else store.navigate('D3_mission_completed');
}
async function permission(key){
  let value='unsupported';
  try {
    if(key==='notifications'&&'Notification'in window)value=await Notification.requestPermission();
    if((key==='camera'||key==='microphone')&&navigator.mediaDevices?.getUserMedia){const stream=await navigator.mediaDevices.getUserMedia(key==='camera'?{video:true}:{audio:true});stream.getTracks().forEach(t=>t.stop());value='granted';}
    if(key==='motion'&&'DeviceMotionEvent'in window)value=typeof DeviceMotionEvent.requestPermission==='function'?await DeviceMotionEvent.requestPermission():'default';
  }catch{value='denied';}
  state().permissions[key]=value;store.notify();
  if(value==='denied')toast('Quyền bị từ chối. Bạn có thể cấp lại trong cài đặt trang web.');
  if(value==='unsupported')toast('Trình duyệt hoặc thiết bị chưa hỗ trợ tính năng này.');
  if(key==='motion'&&value==='default')toast('Quyền chuyển động sẽ được kiểm tra khi cảm biến phát dữ liệu.');
  return value;
}
async function startMotion(){
  const result=await permission('motion');if(result==='denied'||result==='unsupported')return;
  if(motionHandler)window.removeEventListener('devicemotion',motionHandler);
  let received=false;
  motionHandler=e=>{
    received=true;const r=state().missionRun;if(r?.id!=='shake'||state().currentScreen!=='exec_shake')return;
    const acc=e.acceleration||e.accelerationIncludingGravity;if(!acc)return;
    const magnitude=Math.hypot(acc.x||0,acc.y||0,acc.z||0);
    if(magnitude>14&&Date.now()-lastMotion>600){lastMotion=Date.now();state().permissions.motion='granted';r.completed++;if(r.completed>=r.count)victory();else store.notify();}
  };
  window.addEventListener('devicemotion',motionHandler);
  setTimeout(()=>{if(!received&&state().currentScreen==='exec_shake')toast('Chưa nhận dữ liệu cảm biến. Bạn có thể đổi sang nhiệm vụ toán.');},3000);
}
async function startCamera(id){
  if(!navigator.mediaDevices?.getUserMedia)return toast('Không có camera khả dụng. Hãy chọn nhiệm vụ toán thay thế.');
  if(id==='qr'&&!('BarcodeDetector'in window))return toast('Trình duyệt chưa hỗ trợ quét mã. Hãy chọn nhiệm vụ toán thay thế.');
  const expected=state().missionRun;
  try{
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
    if(state().missionRun!==expected||state().currentScreen!==`exec_${id}`){stream.getTracks().forEach(t=>t.stop());return;}
    camera?.getTracks().forEach(t=>t.stop());camera=stream;state().permissions.camera='granted';
    const video=document.querySelector('#mission-camera');video.srcObject=camera;await video.play();
    if(id==='qr'){
      if(!expected.code){cleanSensors();return toast('Bạn chưa đăng ký nội dung mã trong phần cài đặt nhiệm vụ.');}
      const detector=new BarcodeDetector();let scanning=false,lastWrong=0;
      clearInterval(scanTimer);scanTimer=setInterval(async()=>{
        if(scanning||video.readyState<2)return;scanning=true;
        try{const values=await detector.detect(document.querySelector('#mission-camera'));
          if(state().missionRun!==expected)return;
          if(values.some(x=>x.rawValue===expected.code))victory();
          else if(values.length&&Date.now()-lastWrong>4000){lastWrong=Date.now();toast('Mã vừa quét chưa khớp mã đã đăng ký.');}
        }catch{}finally{scanning=false;}
      },600);
    }
  }catch{state().permissions.camera='denied';toast('Không mở được camera. Kiểm tra quyền hoặc chọn nhiệm vụ toán.');}
}
function capturePhoto(){
  const video=document.querySelector('#mission-camera');if(!video?.videoWidth)return toast('Mở camera và chờ hình ảnh trước khi chụp.');
  const canvas=document.createElement('canvas');canvas.width=480;canvas.height=Math.round(480*video.videoHeight/video.videoWidth);
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);state().missionRun.captured=canvas.toDataURL('image/jpeg',0.7);store.notify();
}
async function importAudio(file){
  if(!file)return;if(file.size>20*1024*1024||!file.size)return toast('Chọn file âm thanh có dung lượng lớn hơn 0 và tối đa 20 MB.');
  if(!file.type.startsWith('audio/')&&!/\.(mp3|wav|ogg|m4a)$/i.test(file.name))return toast('Định dạng file không phải âm thanh hỗ trợ.');
  const url=URL.createObjectURL(file);
  try{
    await new Promise((resolve,reject)=>{const media=new Audio();const timeout=setTimeout(()=>{media.src='';reject(new Error());},7000);media.onloadedmetadata=()=>{clearTimeout(timeout);media.src='';resolve();};media.onerror=()=>{clearTimeout(timeout);reject(new Error());};media.src=url;});
    const id=`local_${crypto.randomUUID()}`;await audioFile('put',id,file);
    state().customSounds.push({id,name:file.name.replace(/\.[^.]+$/,''),category:'Nhạc của tôi',icon:'🎵',author:'Trên thiết bị',size:file.size});
    selectSound(id);toast('Đã nhập nhạc. File được lưu trên thiết bị này.');
  }catch{toast('Không đọc hoặc lưu được file. Thử MP3/WAV khác và kiểm tra dung lượng trình duyệt.');}
  finally{URL.revokeObjectURL(url);}
}
function selectSound(id){const selected=[...alarmSounds,...state().customSounds].find(x=>x.id===id);if(!selected)return;Object.assign(ensureDraft(),{soundId:id,sound:selected.name});store.notify();}
async function deleteSound(id){
  if(state().alarms.some(a=>a.soundId===id))return toast('Nhạc đang dùng trong báo thức. Đổi nhạc của báo thức trước khi xóa.');
  stopPreview();await audioFile('delete',id);state().customSounds=state().customSounds.filter(x=>x.id!==id);
  if(ensureDraft().soundId===id)Object.assign(ensureDraft(),{soundId:'gentle',sound:'Bình minh dịu êm'});store.notify();
}
async function photoReference(file){
  if(!file)return;if(!file.type.startsWith('image/')||file.size>10*1024*1024)return toast('Chọn ảnh tối đa 10 MB.');
  const url=URL.createObjectURL(file);
  try{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=320;canvas.height=Math.round(img.height/img.width*320);if(canvas.height>1200)throw new Error();canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);ensureDraft().missionSettings.photo={reference:canvas.toDataURL('image/jpeg',0.65)};store.notify();}catch{toast('Không đọc được ảnh này.');}finally{URL.revokeObjectURL(url);}
}
function playAmbient(id){
  const r=state().relaxation;if(r.isPlaying&&r.activeSound===id){stopAudio();store.notify();return;}
  stopAudio();sound.setVolume(r.volume??0.6);sound.playAmbient(id);Object.assign(r,{activeSound:id,isPlaying:true,deadline:r.timerMinutes?Date.now()+r.timerMinutes*60000:null});store.notify();
}
function download(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function startSleep(){if(state().sleepState.isTracking)return navigate('E4_active_session');Object.assign(state().sleepState,{isTracking:true,trackingStartTime:Date.now(),elapsedSeconds:0});if(state().sleepState.ambientInSleep)playAmbient('rain');navigate('E4_active_session');}
function stopSleep(){const s=state().sleepState;if(!s.isTracking)return;const report={id:crypto.randomUUID(),start:s.trackingStartTime,end:Date.now()};state().sleepHistory.push(report);state().selectedSleepId=report.id;Object.assign(s,{isTracking:false,trackingStartTime:null,elapsedSeconds:0});stopAudio();navigate('E5_night_report');}

async function startRecording(){
  if(state().recordingStarted)return;
  stopAudio();
  try{
    const start=await recorder.start(clip=>{state().recordings.push(clip);store.notify();},toast,()=>{state().recordingStarted=null;store.notify();});
    if(start){state().recordingStarted=start;state().permissions.microphone='granted';store.notify();}
  }catch{toast('Không mở được microphone. Kiểm tra quyền hoặc thiết bị ghi âm.');}
}
async function playRecording(id){
  const same=state().playingRecording===id;stopAudio();
  if(!same){
    const blob=await audioFile('get',id);if(!blob)return toast('File ghi âm không còn trên thiết bị này.');
    recordingURL=URL.createObjectURL(blob);recordingAudio=new Audio(recordingURL);recordingAudio.volume=0.7;
    try{await recordingAudio.play();state().playingRecording=id;recordingAudio.onended=()=>{stopAudio();store.notify();};}catch{stopAudio();toast('Không phát được bản ghi âm này.');}
  }
  store.notify();
}

async function action(name,value,el){
  const s=state(),d=ensureDraft();
  switch(name){
    case'navigate':return navigate(value);
    case'save-alarm':return saveAlarm();
    case'repeat-preset':d.days=({'Ngày thường':['T2','T3','T4','T5','T6'],'Cuối tuần':['T7','CN'],'Mỗi ngày':['T2','T3','T4','T5','T6','T7','CN'],'Một lần':[]})[value];break;
    case'sound-category':s.soundCategory=value;break;
    case'select-sound':return selectSound(value);
    case'preview-sound':{
      const same=s.previewSound===value;stopAudio();if(!same){s.previewSound=value;sound.setVolume(d.volume);await sound.playAlarm(value);previewTimer=setTimeout(()=>{stopPreview();store.notify();},12000);}store.notify();return;
    }
    case'delete-sound':return deleteSound(value);
    case'nap-duration':s.napMinutes=Number(value);break;
    case'start-nap':return addNap(value||s.napMinutes||20);
    case'cancel-nap':return cancelNap();
    case'toggle-mission':d.missions=d.missions.includes(value)?d.missions.filter(x=>x!==value):[...d.missions,value];break;
    case'save-mission':if(value==='qr'&&!d.missionSettings.qr?.code?.trim())return toast('Nhập mã cần quét.');if(value==='photo'&&!d.missionSettings.photo?.reference)return toast('Chọn ảnh mẫu trước.');if(!d.missions.includes(value))d.missions.push(value);return navigate('C1_mission_library');
    case'move-mission':{const [index,delta]=value.split(':').map(Number),target=index+delta;if(target>=0&&target<d.missions.length)[d.missions[index],d.missions[target]]=[d.missions[target],d.missions[index]];break;}
    case'try-mission':return tryMission(value);
    case'try-sequence':if(!d.missions.length)return toast('Chọn ít nhất một nhiệm vụ.');s.missionPractice=true;s.currentMissionSequence=[...d.missions];s.currentMissionStep=0;return startMission(d.missions[0]);
    case'submit-math':{const r=s.missionRun,answer=r.operator==='×'?r.a*r.b:r.a+r.b;if(String(answer)!==r.answer?.trim())return toast('Chưa đúng. Hãy thử lại phép tính này.');if(++r.completed>=r.count)return victory();Object.assign(r,randomMath(r.difficulty),{answer:''});break;}
    case'memory-cell':if(!s.missionRun.reveal){const r=s.missionRun,n=Number(value);r.selected=r.selected.includes(n)?r.selected.filter(x=>x!==n):[...r.selected,n];}break;
    case'submit-memory':if(s.missionRun.reveal)return;if(memoryMatches(s.missionRun.target,s.missionRun.selected))return victory();return toast('Các ô chưa đúng. Thử nhớ và chọn lại.');
    case'submit-typing':if(normalizeText(document.querySelector('#typing-answer')?.value??s.missionRun.answer??'')===normalizeText(s.missionRun.sentence))return victory();return toast('Câu chưa khớp. Kiểm tra chữ, dấu và dấu câu.');
    case'count-motion':if(++s.missionRun.completed>=s.missionRun.count)return victory();break;
    case'start-motion':return startMotion();
    case'start-camera':return startCamera(value);
    case'capture-photo':return capturePhoto();
    case'confirm-photo':if(s.missionRun.captured)return victory();return;
    case'fallback-mission':s.currentMissionSequence[s.currentMissionStep]='math';return startMission('math');
    case'end-practice':return endPractice();
    case'start-alarm-missions':return startAlarmMissions();
    case'snooze':return snooze();
    case'next-mission':if(s.currentMissionStep+1<s.currentMissionSequence.length){s.currentMissionStep++;return startMission(s.currentMissionSequence[s.currentMissionStep]);}return finishAlarm();
    case'confirm-awake':stopAudio();s.activeAlarmSession=null;s.ringingAlarm=null;return navigate('D6_morning_summary');
    case'emergency':cleanSensors();s.emergencyTapCount=0;return navigate('D5_emergency_exit');
    case'emergency-tap':if((s.emergencyTapCount=(s.emergencyTapCount||0)+1)>=15){stopAudio();s.activeAlarmSession=null;s.ringingAlarm=null;return navigate('B1_home');}break;
    case'cancel-emergency':if(s.ringingAlarm)return ring(s.ringingAlarm,true);return navigate('B1_home');
    case'test-alarm':clearTimeout(testTimer);toast('Chuông thử sẽ reo sau 5 giây.');testTimer=setTimeout(()=>{const a=newAlarm();Object.assign(a,{label:'Thử chuông ZakiAlarm',missions:[],snoozeDuration:1,wakeupCheck:false,soundId:'radar',sound:'Radar đánh thức'});ring(a);},5000);return;
    case'permission':return permission(value);
    case'start-sleep':return startSleep();
    case'stop-sleep':return stopSleep();
    case'record-start':return startRecording();
    case'record-stop':recorder.stop();return;
    case'record-play':return playRecording(value);
    case'record-delete':s.confirmRecordingDelete=value;break;
    case'record-delete-cancel':s.confirmRecordingDelete=null;break;
    case'record-delete-confirm':stopAudio();await audioFile('delete',value);s.recordings=s.recordings.filter(x=>x.id!==value);s.confirmRecordingDelete=null;break;
    case'save-schedule':navigate('E1_sleep_overview');return toast('Đã lưu mục tiêu giờ ngủ.');
    case'view-sleep':s.selectedSleepId=value;return navigate('E5_night_report');
    case'export-sleep':return download(s.sleepHistory.find(x=>x.id===value),'zaki-phien-nghi.json');
    case'play-ambient':return playAmbient(value);
    case'open-player':s.relaxation.activeSound=value;return navigate('F2_player');
    case'favorite':s.relaxation.favorites=s.relaxation.favorites.includes(value)?s.relaxation.favorites.filter(x=>x!==value):[...s.relaxation.favorites,value];break;
    case'relax-category':s.relaxCategory=value;break;
    case'relax-timer':s.relaxation.timerMinutes=Number(value);break;
    case'apply-timer':s.relaxation.deadline=s.relaxation.isPlaying&&s.relaxation.timerMinutes?Date.now()+s.relaxation.timerMinutes*60000:null;sound.setVolume(s.relaxation.volume??0.6);return navigate('F2_player');
    case'theme':s.theme=value==='Tối'?'dark':'light';break;
    case'text-scale':s.textScale=({'Chuẩn':'normal','Lớn':'large','Rất lớn':'xlarge'})[value];break;
    case'export':return download({version:1,exportedAt:new Date().toISOString(),state:durableState(s)},'zakialarm-backup.json');
    case'delete-request':s.confirmDelete=true;break;
    case'delete-cancel':s.confirmDelete=false;break;
    case'delete-confirm':
      stopAudio();cleanSensors();recorder.cancel();clearTimeout(testTimer);await audioFile('clear');s.recordings=[];s.recordingStarted=null;s.theme='dark';s.textScale='normal';s.viewMode='frame';
      Object.assign(s,{alarms:[],sleepHistory:[],customSounds:[],quickNap:null,editingAlarm:null,activeAlarmSession:null,ringingAlarm:null,confirmDelete:false,sleepState:{isTracking:false,trackingStartTime:null,ambientInSleep:false},sleepSchedule:{bedtime:'23:00',wakeTime:'07:00'},relaxation:{activeSound:null,isPlaying:false,volume:0.6,timerMinutes:30,fadeoutEnabled:true,favorites:[]}});
      localStorage.removeItem(STORAGE_KEY);navigate('G4_privacy');return toast('Đã xóa dữ liệu ZakiAlarm trên trình duyệt này.');
  }
  store.notify();
}

function fieldChange(el){
  const key=el.dataset.field,s=state(),d=ensureDraft();
  let value=el.type==='checkbox'?el.checked:el.value;
  if(['volume','snoozeDuration','snoozeMax','napMinutes','relaxVolume','mission-count'].includes(key))value=Number(value);
  if(key.startsWith('mission-')){
    const id=s.currentScreen.split('_')[1];d.missionSettings[id]||={};
    if(key==='mission-count')value=Math.max(1,Math.min(id==='memory'?7:100,value||1));
    d.missionSettings[id][key.slice(8)]=value;
  }else if(key==='answer')s.missionRun.answer=value;
  else if(key==='soundSearch'||key==='relaxSearch'){s[key]=value;store.notify();return;}
  else if(key==='napMinutes')s.napMinutes=Math.max(1,Math.min(180,value||1));
  else if(key==='relaxVolume'){s.relaxation.volume=value;sound.setVolume(value);}
  else if(key==='fadeoutEnabled')s.relaxation.fadeoutEnabled=value;
  else if(key==='ambientInSleep')s.sleepState.ambientInSleep=value;
  else if(key==='bedtime'||key==='wakeTime')s.sleepSchedule[key]=value;
  else{
    if(key==='snoozeDuration')value=Math.max(1,Math.min(60,value||1));
    if(key==='snoozeMax')value=Math.max(1,Math.min(10,value||1));
    d[key]=value;
    if(key==='volume'){sound.setVolume(value);const label=document.querySelector('#volume-label');if(label)label.textContent=`${Math.round(value*100)}%`;}
  }
  persistState(s);
}

export function initializeRuntime(){
  document.addEventListener('pointerdown',()=>{try{sound.init();}catch{}},{once:true});
  window.addEventListener('zaki-audio-error',()=>toast('Không phát được file nhạc. Đã chuyển sang chuông Radar dự phòng.'));
  document.addEventListener('click',async e=>{
    const el=e.target.closest('[data-do]');if(el){e.preventDefault();try{await action(el.dataset.do,el.dataset.value,el);}catch(error){console.error(error);toast('Thao tác chưa hoàn tất. Kiểm tra quyền và bộ nhớ trình duyệt.');}return;}
    const target=e.target.closest('button,[role="button"],.alarm-card-clickable-area');if(!target)return;
    if(target.classList.contains('nav-tab-item'))return navigate(({alarms:'B1_home',sleep:'E1_sleep_overview',relax:'F1_relax_library',profile:'G1_profile'})[target.dataset.tab]);
    if(target.classList.contains('nap-chip')&&target.dataset.quickMinutes)return addNap(target.dataset.quickMinutes);
    if(target.classList.contains('alarm-card-clickable-area'))return edit(target.closest('.alarm-card').dataset.alarmId);
    if(target.dataset.action==='alarm-menu'){state().selectedAlarmForAction=state().alarms.find(a=>a.id===target.dataset.alarmId);return navigate('B7_actions');}
    const links={'btn-splash-start':'A2_welcome','btn-welcome-next':'A3_slides','btn-welcome-skip':'B1_home','btn-slides-skip':'A4_setup','btn-setup-next':'A5_permissions','btn-permissions-finish':'B1_home','btn-quick-alarm-modal':'B6_quick_alarm','btn-cancel-action-menu':'B1_home','menu-appearance':'G2_appearance','btn-open-settings-appearance':'G2_appearance','menu-readiness':'G3_alarm_readiness','menu-privacy':'G4_privacy','menu-help':'G5_help','menu-about':'G6_about'};
    if(links[target.id])return navigate(links[target.id]);
    const s=state();
    switch(target.id){
      case'btn-add-alarm':return edit();
      case'btn-slides-next':s.onboardingSlide=(s.onboardingSlide||0)+1;return s.onboardingSlide>2?navigate('A4_setup'):store.notify();
      case'toggle-theme-btn':s.theme=s.theme==='dark'?'light':'dark';return store.notify();
      case'toggle-viewmode-btn':s.viewMode=s.viewMode==='frame'?'fullscreen':'frame';return store.notify();
      case'stop-all-audio-btn':if(s.activeAlarmSession)return toast('Dùng Thoát khẩn cấp trên màn hình báo thức để tắt chuông.');stopAudio();return store.notify();
      case'toast-action':return s.toast?.onAction?.();
      case'action-edit-alarm':return edit((s.selectedAlarmForAction||s.alarms[0])?.id);
      case'action-duplicate-alarm':store.duplicateAlarm((s.selectedAlarmForAction||s.alarms[0])?.id);return navigate('B1_home');
      case'action-delete-alarm':store.deleteAlarm((s.selectedAlarmForAction||s.alarms[0])?.id);return navigate('B1_home');
      case'action-skip-next':{const a=s.alarms.find(x=>x.id===(s.selectedAlarmForAction||s.alarms[0])?.id);if(!a)return;const at=nextOccurrence(a);if(!at)return toast('Báo thức đang tắt hoặc không có lịch tiếp theo.');a.skipAt=at;navigate('B1_home');return toast('Đã bỏ qua lần reo tiếp theo.');}
    }
  });
  document.addEventListener('input',e=>{if(e.target.dataset.field)fieldChange(e.target);});
  document.addEventListener('change',e=>{
    const el=e.target;
    if(el.dataset.day){const d=ensureDraft();d.days=el.checked?[...new Set([...d.days,el.dataset.day])]:d.days.filter(x=>x!==el.dataset.day);store.notify();}
    if(el.classList.contains('alarm-toggle')){const a=state().alarms.find(x=>x.id===el.dataset.alarmId);a.enabled=el.checked;if(a.enabled){delete a.skipAt;if(a.onceAt&&a.onceAt<Date.now())delete a.onceAt;}store.notify();}
    if(el.id==='import-audio')importAudio(el.files[0]);
    if(el.id==='photo-reference')photoReference(el.files[0]);
    if(el.id==='prototype-screen-select'&&el.value)navigate(el.value);
    if(el.id==='prototype-flow-select'&&el.value)prototypeFlow(Number(el.value));
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&e.target.dataset.field==='answer'&&state().missionRun?.id==='math'){e.preventDefault();action('submit-math');}
    else if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role="button"]')){e.preventDefault();e.target.click();}
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();requestWakeLock();}});
  window.addEventListener('pagehide',()=>{persistState(state());cleanSensors();recorder.cancel();});
  window.addEventListener('beforeunload',e=>{if(!import.meta.env.DEV&&(state().activeAlarmSession||state().recordingStarted)){e.preventDefault();e.returnValue='';}});
  const active=state().activeAlarmSession;
  if(active){state().ringingAlarm=active.alarm;state().currentScreen=active.phase==='snooze'?'D2_snoozing':active.phase==='check'?'D4_wakeup_check':'D1_ringing';if(active.phase==='mission')active.phase='ringing';}
  else if(state().quickNap)state().currentScreen='B9_nap_countdown';
  // Audio after a reload still requires a user gesture in most browsers.
  document.addEventListener('pointerdown',()=>{if(state().activeAlarmSession?.phase==='ringing')ringingAudio(state().ringingAlarm);requestWakeLock();},{once:true});
  setInterval(tick,500);tick();
}
async function requestWakeLock(){
  if(document.hidden||!navigator.wakeLock||holdLock)return;
  try{holdLock=await navigator.wakeLock.request('screen');holdLock.addEventListener('release',()=>{holdLock=null;});}catch{}
}
function prototypeFlow(id){
  if(state().activeAlarmSession)return toast('Kết thúc báo thức hiện tại trước khi đổi luồng.');
  const screens={1:'A1_splash',2:'C6_qr_setup',3:'B5_snooze_config',4:'B8_advanced',5:'E3_sleep_prep',6:'A5_permissions',7:'G3_alarm_readiness',8:'C10_mission_sequence'};
  ensureDraft();navigate(screens[id]||'B1_home');
}
function tick(){
  const now=Date.now(),s=state(),session=s.activeAlarmSession;
  if(session?.deadline&&session.deadline<=now)ring(session.alarm,true);
  if(boostStart&&s.activeAlarmSession?.phase==='ringing')sound.setVolume(Math.min(s.ringingAlarm.volume??0.8,0.1+(now-boostStart)/30000*(Math.max(0,(s.ringingAlarm.volume??0.8)-0.1))));
  if(!s.activeAlarmSession){
    for(const a of s.alarms){
      if(!a.enabled){scheduled.delete(a.id);continue;}
      const signature=JSON.stringify([a.time,a.days,a.onceAt,a.skipAt,a.enabled]);
      let item=scheduled.get(a.id);
      if(!item||item.signature!==signature){item={signature,at:nextOccurrence(a,lastTick-1)};scheduled.set(a.id,item);}
      if(item.at&&item.at<=now&&item.at!==a.lastFiredAt){
        if(now-item.at>300000){a.lastFiredAt=item.at;item.at=nextOccurrence(a,now);if(!a.days.length)a.enabled=false;store.notify();toast(`Bỏ lỡ báo thức “${a.label}” khi trang không hoạt động.`);continue;}
        a.lastFiredAt=item.at;if(!a.days.length)a.enabled=false;item.at=nextOccurrence(a,now);ring(a);break;
      }
    }
    if(!s.activeAlarmSession && s.quickNap?.deadline<=now) ringNap(s.quickNap);
  }
  const r=s.relaxation;
  if(r.isPlaying&&r.deadline){const left=r.deadline-now;if(left<=0){stopAudio();store.notify();}else if(r.fadeoutEnabled&&left<10000)sound.setVolume((r.volume??0.6)*left/10000);}
  lastTick=now;tickDisplays();
}
function tickDisplays(){
  const s=state(),now=Date.now();
  const text=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};
  const next=nextAlarm(s.alarms,now);
  if(next){const mins=Math.max(1,Math.ceil((next.at-now)/60000));text('.banner-countdown',`Còn ${Math.floor(mins/60)?`${Math.floor(mins/60)} giờ `:''}${mins%60} phút`);}
  if(s.activeAlarmSession?.deadline){const remaining=duration(Math.ceil((s.activeAlarmSession.deadline-now)/1000));text('#snooze-timer-digits',remaining);text('#wakeup-timer',remaining);}
  if(s.quickNap){const remaining=duration(Math.ceil((s.quickNap.deadline-now)/1000));text('#quick-nap-countdown',remaining);text('#quick-nap-home-countdown',remaining);}
  if(s.sleepState.isTracking)text('#sleep-elapsed',duration((now-s.sleepState.trackingStartTime)/1000));
  if(s.recordingStarted)text('#recording-timer',duration((now-s.recordingStarted)/1000));
  if(s.relaxation.deadline)text('#relax-countdown',`Tự dừng sau ${duration(Math.ceil((s.relaxation.deadline-now)/1000))}`);
  text('.status-bar-time',new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}));
}
