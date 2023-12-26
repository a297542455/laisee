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
  @Input() overtimeText: string = '超過錄音時長，已自動保存';
  // 提示文本
  text = '';
  // 录音时间
  count = 0;
  countTimer = 0;
  maxCount = 60;
  //手指移动相关
  posStart = 0; //初始化起点坐标
  posEnd = 0; //初始化终点坐标
  posMove = 0; //初始化滑动坐标

  // active 錄音中標識，解決 啓動錄音需要時間，但是啓動完成前用戶已經取消 問題
  active = false;

  touchstartFn(event: TouchEvent) {
    console.time('啓動錄音耗時：');
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

    console.timeEnd('啓動錄音耗時：');
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
    const { recordDataBase64, mimeType, msDuration } = result.value;
    this.audio.nativeElement.src = `data:${mimeType};base64,${recordDataBase64}`;
    this.audio.nativeElement.load();
    this.playing = false;

    this.createLines(msDuration);
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
    window.clearInterval(this.playTimer);
    this.playTimer = 0;
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
    // 在音频加载完成后获取音频的时长
    audioElement.addEventListener('loadedmetadata', async () => {
      // 获取音频时长（以秒为单位）
      while (
        isNaN(audioElement.duration) ||
        audioElement.duration === Infinity
      ) {
        // 延迟一会 不然网页都卡死
        await new Promise((resolve) => setTimeout(resolve, 200));
        // 设置随机播放时间，模拟调进度条
        audioElement.currentTime = 10000000 * Math.random();
      }

      // 将时长打印到控制台
      console.log('音频时长：', audioElement.duration + '秒');
      audioElement.currentTime = 0;
    });
  }

  get hasRecording() {
    return this.audio?.nativeElement?.src?.length > 100;
  }

  playing = false;
  del() {
    this.pause();
    this.initStatus();
    this.currentPlayTime = 0;
    this.audio.nativeElement.src = '';
    this.audioService.clearRecording();
  }

  play() {
    const time = this.audio?.nativeElement?.duration || this.count;
    this.audio?.nativeElement?.play();
    if (!!this.playTimer) return;
    this.playTimer = window.setInterval(() => {
      this.currentPlayTime++;
      if (this.currentPlayTime / 20 >= time) {
        console.log('stop -----> ');
        this.currentPlayTime = 0;
        clearInterval(this.playTimer);
        this.playTimer = 0;
      }
    }, 50);
  }

  get progress() {
    const time = this.audio.nativeElement.duration || this.count;
    return (this.currentPlayTime / 20 / time) * this.lines.length;
  }

  pause() {
    this.audio?.nativeElement?.pause();
    clearInterval(this.playTimer);
    this.playTimer = 0;
  }

  currentPlayTime = 0;
  playTimer = 0;
  // 聲音模擬波浪綫
  lines: number[] = [];
  createLines(msDuration = 1000) {
    /*
      聲音 1-60 秒，顯示60條綫太長了，
      開方后 1-8,  * 3 就是 3-24 根綫
      +5，就是 8 - 29 跟綫
      每根綫寬度5，大概就是 40-150 寬度
    */
    const length = Math.floor(Math.sqrt(msDuration / 1000) * 3) + 5;
    this.lines = new Array(length)
      .fill(undefined)
      .map(() => Math.random() * 10 + 2);
  }
}
