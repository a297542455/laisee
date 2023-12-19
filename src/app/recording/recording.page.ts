import { AudioService } from './../services/audio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.page.html',
  styleUrls: ['./recording.page.scss'],
})
export class RecordingPage implements OnInit {
  constructor(private audioService: AudioService) {}

  ngOnInit() {
    console.log('ngOnInit is ready!');
  }

  startRecording() {
    this.audioService.startRecording();
  }

  stopRecording() {
    this.audioService.stopRecording();
  }

  playRecording() {
    this.audioService.playRecording();
  }
}
