import { SentLaiseeService } from './../../api/sent-laisee.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit, OnDestroy {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {
    // 當前頁面禁止輸入id，離開頁面記得要恢復
    this.form.get('name')?.disable();
  }

  get name() {
    return this.form.get('name')?.value || '';
  }
  get payee() {
    let payee = this.form.get('payee')?.value || '';
    payee = payee.substring(0, 2) + '**' + payee.substring(4);
    return payee;
  }

  // 根據當前 id 簡單判斷
  get idType() {
    const name = this.name;
    if (name.includes('@')) {
      return 'Email';
    } else if (name.length === 11) {
      return 'Mobile';
    } else {
      return 'FPS ID';
    }
  }

  ngOnDestroy() {
    // 離開頁面要恢復
    this.form.get('name')?.enable();
  }

  goNext() {
    this.nextStep.emit(1);
  }
}
