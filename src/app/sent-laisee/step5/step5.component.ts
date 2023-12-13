import { Form, SentLaiseeService } from './../../api/sent-laisee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}

  formValue!: Form;
  ngOnInit() {
    this.formValue = this.form.value;
  }

  goNext() {
    this.nextStep.emit(1);
  }

  get nowDate() {
    return moment().format('D MMM YYYY');
  }

  get blessing() {
    return this.form.get('blessing')?.value;
  }

  get total() {
    return (Number(this.formValue.amount) * this.formValue.count).toFixed(2);
  }
}
