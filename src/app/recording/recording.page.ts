import { AudioService } from './../services/audio.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.page.html',
  styleUrls: ['./recording.page.scss'],
})
export class RecordingPage implements OnInit {
  @ViewChild('audio') audio!: ElementRef;
  constructor(private audioService: AudioService) {}

  playing = false;
  permission = false;

  async ngOnInit() {
    this.permission = await this.audioService.getPermission();
  }

  startRecording() {
    this.audioService.startRecording();
    this.playing = true;
  }

  async stopRecording() {
    const result = await this.audioService.stopRecording();
    const { recordDataBase64, mimeType } = result.value;
    this.audio.nativeElement.src = `data:${mimeType};base64,${recordDataBase64}`;
    this.audio.nativeElement.load();
    this.playing = false;
  }
}
