import { SentLaiseeService } from './../../api/sent-laisee.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
})
export class Step6Component implements OnInit, OnDestroy {
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}
  count = 0;
  countTimer = 0;

  startCount = (time = 10) => {
    if (this.count > 0) return;
    this.count = time;
    this.countTimer = window.setInterval(() => {
      this.count--;
      if (this.count === 0) {
        clearInterval(this.countTimer);
      }
    }, 1000);
  };

  code!: number;
  get codeValid() {
    if (this.code && this.code.toString().length === 6) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.startCount();
  }

  ngOnDestroy() {
    clearInterval(this.countTimer);
  }

  goNext() {
    // goNext前發請求到後臺驗證
    if (this.service.sentCode(this.code)) {
      this.nextStep.emit(1);
    } else {
      alert('驗證碼不正確');
    }
  }
}
