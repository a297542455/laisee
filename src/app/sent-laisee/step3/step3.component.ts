import { SentLaiseeService } from './../../api/sent-laisee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  btns = [20, 50, 100, 500];
  btnCurrent = 0;

  myNums = ['Send one', 'Double up'];
  numCurrent = 0;

  btnClick(amount: number, index: number) {
    this.form.setValue({ ...this.form.value, amount });
    this.btnCurrent = index;
  }

  numClick(index: number) {
    this.numCurrent = index;
  }

  get total() {
    return (this.numCurrent + 1) * Number(this.form.get('amount'));
  }

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {
    console.log('this.form', this.form.value);
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);

      this.btnCurrent = this.btns.indexOf(Number(this.form.get('amount')));
      // 在这里可以执行你想要的逻辑
    });
  }

  goNext() {
    this.nextStep.emit(1);
  }
}
