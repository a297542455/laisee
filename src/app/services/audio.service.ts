import { Injectable } from '@angular/core';
import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus,
} from 'capacitor-voice-recorder';
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  recordingData: RecordingData = {
    value: {
      recordDataBase64: '',
      msDuration: 0,
      mimeType: '',
    },
  };
  audioRef!: HTMLAudioElement;
  startRecording() {
    VoiceRecorder.requestAudioRecordingPermission().then(
      (result: GenericResponse) => console.log(result.value)
    );
    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => console.log(result.value))
      .catch((error) => console.log(error));

    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => {
        console.log(result.value);
      })
      .catch((error) => console.log(error));
  }

  async stopRecording() {
    const result = await VoiceRecorder.stopRecording();
    this.recordingData = result;
    this.loadRecording();
    return result;
  }

  loadRecording() {
    const { recordDataBase64, mimeType } = this.recordingData.value; // from plugin
    this.audioRef = new Audio(`data:${mimeType};base64,${recordDataBase64}`);
    this.audioRef.load();
    return this.audioRef;
  }

  getRecording() {
    return this.recordingData.value;
  }

  clearRecording() {
    this.recordingData.value = {
      recordDataBase64: '',
      msDuration: 0,
      mimeType: '',
    };
  }

  // 頁面不需要 audio 控制的話，可以用這裏的方法直接播放
  play() {
    this.audioRef && this.audioRef.play();
  }

  pause() {
    this.audioRef && this.audioRef.pause();
  }
}
