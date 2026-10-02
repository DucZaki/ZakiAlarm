import './style.css';
import {store} from './state/store.js';
import {renderStatusBar} from './components/header.js';
import {renderBottomNav} from './components/bottomNav.js';
import {renderToast} from './components/toast.js';
import {renderPrototypeToolbar} from './components/prototypeToolbar.js';
import {renderOnboarding} from './screens/onboarding.js';
import {renderAlarms} from './screens/alarms.js';
import {renderSettings} from './screens/settings.js';
import {renderFunctional} from './screens/functional.js';
import {initializeRuntime,afterRender,ensureDraft} from './runtime.js';
import {escapeHTML} from './domain/alarm.js';

const appEl=document.querySelector('#app');
let renderedScreen=null;
function render(){
  const state=store.getState(),screen=state.currentScreen;
  if(screen.startsWith('B')&&screen!=='B1_home'||screen.startsWith('C'))ensureDraft();
  const same=renderedScreen===screen;
  const scroll=document.querySelector('.screen-content')?.scrollTop||0;
  const focus=document.activeElement;
  const focusId=focus?.id;
  const selection=focus?.selectionStart;
  let html=renderFunctional(state);
  if(html===null){
    if(screen.startsWith('A'))html=renderOnboarding(state);
    else if(screen.startsWith('B'))html=renderAlarms(state);
    else if(screen.startsWith('G'))html=renderSettings(state);
    else html=renderAlarms({...state,currentScreen:'B1_home'});
  }
  appEl.innerHTML=`
    ${renderPrototypeToolbar(state)}
    <main class="device-canvas">
      <div class="device-container ${state.viewMode==='fullscreen'?'mode-fullscreen':''}">
        ${renderStatusBar(state)}
        ${state.storageError?'<div class="z-storage-error" role="alert">Không lưu được dữ liệu. Kiểm tra dung lượng hoặc quyền lưu trữ.</div>':''}
        ${html}
        ${renderBottomNav(state)}
        ${renderToast({...state,toast:state.toast?{...state.toast,message:escapeHTML(state.toast.message),actionLabel:escapeHTML(state.toast.actionLabel)}:null})}
        <div class="home-indicator-bar"></div>
      </div>
    </main>`;
  renderedScreen=screen;
  afterRender();
  if(same){
    const content=document.querySelector('.screen-content');if(content)content.scrollTop=scroll;
    const element=focusId&&document.getElementById(focusId);
    if(element){element.focus({preventScroll:true});try{element.setSelectionRange(selection,selection);}catch{}}
  }
}
initializeRuntime();
store.subscribe(render);
render();
