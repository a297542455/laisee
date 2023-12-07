import { SentLaiseeService } from './../../api/sent-laisee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class Step2Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {
    // 當前頁面禁止輸入id，下一個頁面記得要恢復
    this.form.get('name')?.disable();
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      // 在这里可以执行你想要的逻辑
    });
  }

  goNext() {
    this.nextStep.emit(1);
  }
}
