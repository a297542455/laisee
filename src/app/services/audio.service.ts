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
  recordingData!: RecordingData;
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

  stopRecording() {
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        console.log(result.value);
        this.recordingData = result;
      })
      .catch((error) => console.log(error));
  }

  playRecording() {
    const { recordDataBase64, mimeType } = this.recordingData.value; // from plugin
    const audioRef = new Audio(`data:${mimeType};base64,${recordDataBase64}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }
}
