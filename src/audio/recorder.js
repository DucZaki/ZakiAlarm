import {audioFile} from './library.js';

// Explicit 60-second samples. No automatic snore diagnosis or background promise.
export class NightRecorder {
  constructor(){this.recorder=null;this.stream=null;this.timer=null;this.starting=false;this.token=0;}
  async start(onSaved,onError,onStopped){
    if(this.recorder||this.starting)return;
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw new Error('Trình duyệt không hỗ trợ ghi âm.');
    const token=++this.token;this.starting=true;
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(token!==this.token){stream.getTracks().forEach(t=>t.stop());return;}
      this.stream=stream;
      const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(type=>MediaRecorder.isTypeSupported(type));
      const recorder=this.recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),chunks=[],start=Date.now();
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      recorder.onstop=async()=>{
        const end=Date.now();stream.getTracks().forEach(t=>t.stop());this.stream=null;this.recorder=null;clearTimeout(this.timer);
        try{
          if(chunks.length&&token===this.token){const id=`record_${crypto.randomUUID()}`,blob=new Blob(chunks,{type:recorder.mimeType});await audioFile('put',id,blob);onSaved({id,start,end,size:blob.size,mime:blob.type});}
        }catch{onError('Không lưu được bản ghi. Kiểm tra dung lượng trình duyệt.');}
        finally{onStopped();}
      };
      recorder.onerror=()=>{onError('Microphone bị gián đoạn.');this.stop();};
      recorder.start();this.timer=setTimeout(()=>this.stop(),60000);
      return start;
    }finally{this.starting=false;}
  }
  stop(){clearTimeout(this.timer);if(this.recorder?.state==='recording')this.recorder.stop();else this.stream?.getTracks().forEach(t=>t.stop());}
  cancel(){this.token++;this.stop();}
}
