import { FormGroup } from '@angular/forms';
import { Form, SentLaiseeService } from '../../services/sent-laisee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
})
export class Step7Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}
  formValue!: Form;
  showMoreItems = false;
  ngOnInit() {
    this.formValue = this.form.value;
  }

  get total() {
    return (Number(this.formValue.amount) * this.formValue.count).toFixed(2);
  }

  get nowDate() {
    return moment().format('D MMM YYYY');
  }

  get payee() {
    let payee = this.form.get('payee')?.value || '';
    payee = payee.substring(0, 2) + '**' + payee.substring(4);
    return payee;
  }

  goNext() {
    this.nextStep.emit(1);
  }

  share() {
    alert('Share success');
  }

  goHistory() {
    alert('查看歷史');
  }
}
