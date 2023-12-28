import { Injectable, OnInit } from '@angular/core';
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
  recordingPermission: boolean = false;
  audioRef!: HTMLAudioElement;
  constructor() {
    // 在这里进行初始化操作
    this.checkPermission();
  }

  async checkPermission() {
    this.recordingPermission = (
      await VoiceRecorder.hasAudioRecordingPermission()
    ).value;
    if (this.recordingPermission) {
      const requestPermission =
        await VoiceRecorder.requestAudioRecordingPermission();
      if (!requestPermission.value) {
        alert('無法獲取錄音權限，請在"設置"中允許使用權限，並重新進入頁面');
      }
    }
  }

  async getPermission() {
    if (!this.recordingPermission) {
      await this.checkPermission();
    }
    return this.recordingPermission;
  }

  async startRecording() {
    if (!this.recordingPermission) {
      await this.checkPermission();
    }
    const result = await VoiceRecorder.startRecording();
  }

  async stopRecording() {
    const result = await VoiceRecorder.stopRecording();
    this.recordingData = result;
    this.loadRecording();
    return result;
  }

  loadRecording() {
    this.audioRef = new Audio(this.getRecordingSrc());
    this.audioRef.load();
    return this.audioRef;
  }

  getRecording() {
    return this.recordingData.value;
  }

  getRecordingSrc() {
    const { recordDataBase64, mimeType } = this.recordingData.value; // from plugin
    if (recordDataBase64) {
      return `data:${mimeType};base64,${recordDataBase64}`;
    } else {
      return '';
    }
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
    this?.audioRef?.play();
  }

  pause() {
    this?.audioRef?.pause();
  }
}
