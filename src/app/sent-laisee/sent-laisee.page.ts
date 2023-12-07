import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-sent-laisee',
  templateUrl: './sent-laisee.page.html',
  styleUrls: ['./sent-laisee.page.scss'],
})
export class SentLaiseePage {
  constructor(private locationStrategy: LocationStrategy) {}
  form = new FormGroup({
    // name: new FormControl(
    //   { value: '123456789', disabled: true },
    //   Validators.required
    // ),
    name: new FormControl('999999992', Validators.required),
    payee: new FormControl(''),
    bank: new FormControl(''),
    currency: new FormControl('CNY'),
    amount: new FormControl('20', [
      Validators.required,
      Validators.min(0.01),
      Validators.max(10000),
      Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
    ]),
    account: new FormControl(''),
  });
  currentStep = 3;
  goBack() {
    // this.locationStrategy.back();
    this.nextStep(-1);
  }
  nextStep(num: number) {
    console.log('Form value changed:', this.form.get('name')?.value);
    if (this.currentStep + num > 4) {
      this.currentStep = 4;
    } else if (this.currentStep + num < 1) {
      this.currentStep = 1;
    } else {
      this.currentStep += num;
    }
  }
}
