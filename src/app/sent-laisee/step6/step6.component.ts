import { SentLaiseeService } from '../../services/sent-laisee.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
})
export class Step6Component implements OnInit, OnDestroy, AfterViewInit {
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('myInput') myInput!: ElementRef;

  constructor(private service: SentLaiseeService) {}
  count = 0;
  countTimer = 0;

  startCount = (time = 60) => {
    if (this.count > 0) return;
    this.count = time;
    this.countTimer = window.setInterval(() => {
      this.count--;
      if (this.count === 0) {
        clearInterval(this.countTimer);
      }
    }, 1000);
  };

  code!: string;
  get codeValid() {
    if (this.code && /^\d{6}$/g.test(this.code.toString())) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.startCount();
  }

  ngAfterViewInit() {
    // 当视图初始化完成后，执行自动聚焦
    setTimeout(() => {
      this.myInput?.nativeElement?.focus();
    }, 300);
  }

  ngOnDestroy() {
    clearInterval(this.countTimer);
  }

  senting = false;
  async goNext() {
    this.senting = true;
    // goNext前發請求到後臺驗證
    this.service.sentCode(this.code).subscribe((bl) => {
      if (bl) {
        this.nextStep.emit(1);
      } else {
        alert('驗證碼不正確');
      }
      this.senting = false;
    });
  }
}
