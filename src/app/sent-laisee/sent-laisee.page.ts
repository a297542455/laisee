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
  });
  currentStep = 1;
  goBack() {
    this.locationStrategy.back();
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
