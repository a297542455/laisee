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
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() defaultText: string = '長按錄音(最長1分鐘)';
  @Input() recordingText: string = '滑動取消<';
  @Input() swipeText: string = '鬆開手指 取消發送';
  @Input() overtimeText: string = '方便測試，超過10秒停止';
  @ViewChild('btnRecording') btnRecording!: ElementRef;
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

  // 錄音成功
  isOk = false;

  // active 標識
  active = false;

  btnAddEvent() {
    // // 统计录音时长
    var startCountTime = () => {
      this.active = true;
      this.countTimer = window.setInterval(() => {
        this.count++;
        if (this.count > this.maxCount) {
          alert(this.overtimeText);
          this.count = this.maxCount;
          this.isOk = true;
          endCountTime();
        }
      }, 1000);
    };

    // // 结束录音
    var endCountTime = () => {
      window.clearInterval(this.countTimer);
      this.countTimer = 0;
      this.active = false;
    };

    const element = this.btnRecording.nativeElement;

    fromEvent<TouchEvent>(element, 'touchstart').subscribe(
      (event: TouchEvent) => {
        this.posStart = 0;
        this.posStart = event.touches[0].pageX; //获取起点坐标

        this.text = this.recordingText;

        // 開始統計時間
        startCountTime();
      }
    );

    fromEvent<TouchEvent>(element, 'touchmove').subscribe(
      (event: TouchEvent) => {
        this.posMove = event.targetTouches[0].pageX; //获取滑动实时坐标

        if (this.posStart - this.posMove < 100) {
          this.text = this.recordingText;
        } else {
          this.text = this.swipeText;
        }
      }
    );

    fromEvent<TouchEvent>(element, 'touchend').subscribe(
      (event: TouchEvent) => {
        if (this.count < 1) {
          alert('錄音時間太短');
          this.initStatus();
          endCountTime();
          return;
        }
        this.posEnd = event.changedTouches[0].pageX; //获取终点坐标
        if (this.posStart - this.posEnd < 100) {
          this.isOk = true;
          endCountTime();
        } else {
          this.initStatus();
          endCountTime();
        }
      }
    );
  }

  //初始化状态
  initStatus() {
    this.text = this.defaultText;
    this.count = 0;
    this.isOk = false;
    this.active = false;
  }

  play() {
    alert('播放');
  }

  ngOnInit() {
    this.initStatus();
  }

  ngAfterViewInit() {
    this.btnAddEvent();
  }

  ngOnDestroy() {
    window.clearInterval(this.countTimer);
  }

  get countFormat() {
    return moment.unix(this.count).format('mm:ss');
  }
}
