import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private audioService: AudioService) {}

  @Input() defaultText: string = '長按錄音(最長1分鐘)';
  // @Input() setupText: string = '錄音設備啓動中...';
  @Input() recordingText: string = '滑動取消<';
  @Input() swipeText: string = '鬆開手指 取消發送';
  @Input() overtimeText: string = '方便測試，超過10秒停止';
  // 提示文本
  text = '';
  // 录音时间
  count = 0;
  countTimer = 0;
  maxCount = 10;
  //手指移动相关
  posStart = 0; //初始化起点坐标
  posEnd = 0; //初始化终点坐标
  posMove = 0; //初始化滑动坐标

  // active 錄音中標識，解決 啓動錄音需要時間，但是啓動完成前用戶已經取消 問題
  active = false;

  touchstartFn(event: TouchEvent) {
    console.time('setup');
    this.posStart = 0;
    this.posStart = event.touches[0].pageX; //获取起点坐标
    // this.text = this.setupText;

    // 開始統計時間
    this.startCountTime();
  }

  touchmoveFn(event: TouchEvent) {
    this.posMove = event.targetTouches[0].pageX; //获取滑动实时坐标

    if (this.posStart - this.posMove < 100) {
      this.text = this.recordingText;
    } else {
      this.text = this.swipeText;
    }
  }

  touchendFn(event: TouchEvent) {
    this.posEnd = event.changedTouches[0].pageX; //获取终点坐标
    this.endCountTime();
  }

  async startCountTime() {
    this.active = true;
    if (!!this.count) return;
    await this.audioService.startRecording();

    console.timeEnd('setup');
    // 用戶點擊就取消，錄音可能還沒啓動，直接取消掉
    if (!this.active) {
      await this.audioService.stopRecording();
      return;
    }
    this.text = this.recordingText;
    this.countTimer = window.setInterval(() => {
      this.count++;
      if (this.count > this.maxCount) {
        alert(this.overtimeText);
        this.count = this.maxCount;
        this.endCountTime();
      }
    }, 1000);
  }

  // 停止錄音和回復原始狀態
  stopRecordingAndInitStatus() {
    window.clearInterval(this.countTimer);
    this.countTimer = 0;
    this.audioService.stopRecording();
    this.audioService.clearRecording();
    this.initStatus();
  }

  async endCountTime() {
    this.active = false;
    // 用戶主動取消
    if (this.posStart - this.posEnd > 100) {
      this.stopRecordingAndInitStatus();
      return;
    }
    // 錄音時間太短
    if (this.count < 1) {
      alert('錄音時間太短');
      this.stopRecordingAndInitStatus();
      return;
    }
    window.clearInterval(this.countTimer);
    this.countTimer = 0;
    // 拿到錄音base64數據
    const result = await this.audioService.stopRecording();
    const { recordDataBase64, mimeType } = result.value;
    this.audio.nativeElement.src = `data:${mimeType};base64,${recordDataBase64}`;
    this.audio.nativeElement.load();
    this.playing = false;
  }

  //初始化状态
  initStatus() {
    this.text = this.defaultText;
    this.count = 0;
    this.active = false;
  }

  // 錄音權限
  permission = true;
  async ngOnInit() {
    this.initStatus();
    const { msDuration = 0 } = this.audioService.getRecording();
    this.count = Math.floor(msDuration / 1000);
    this.permission = await this.audioService.getPermission();
  }

  ngOnDestroy() {
    this.pause();
    window.clearInterval(this.countTimer);
  }

  get countFormat() {
    return moment.unix(this.count).format('mm:ss');
  }

  // 錄音内容
  @ViewChild('audio') audio!: ElementRef;
  ngAfterViewInit() {
    const audioElement: HTMLAudioElement = this.audio.nativeElement;
    setTimeout(() => {
      audioElement.src = this.audioService.getRecordingSrc();
    }, 0);

    // 添加播放状态变化事件监听器
    audioElement.addEventListener('play', () => {
      // console.log('音频开始播放');
      this.playing = true;
    });

    audioElement.addEventListener('pause', () => {
      // console.log('音频暂停');
      this.playing = false;
    });

    audioElement.addEventListener('ended', () => {
      // console.log('音频播放结束');
      this.playing = false;
    });
  }

  get hasRecording() {
    return this.audio?.nativeElement?.src?.length > 100;
  }

  playing = false;
  del() {
    this.pause();
    this.initStatus();
    this.audio.nativeElement.src = '';
    this.audioService.clearRecording();
  }

  play() {
    this.audio?.nativeElement?.play();
  }

  pause() {
    this.audio?.nativeElement?.pause();
  }
}
