import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sent-laisee',
  templateUrl: './sent-laisee.page.html',
  styleUrls: ['./sent-laisee.page.scss'],
})
export class SentLaiseePage {
  constructor(private locationStrategy: LocationStrategy) {}

  currentStep = 1;
  goBack() {
    this.locationStrategy.back();
  }
  nextStep(num: number) {
    if (this.currentStep + num > 4) {
      this.currentStep = 4;
    } else if (this.currentStep + num < 1) {
      this.currentStep = 1;
    } else {
      this.currentStep += num;
    }
  }
}
