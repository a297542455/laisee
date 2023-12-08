import { emojis } from './../api/sent-laisee.service';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-sent-laisee',
  templateUrl: './sent-laisee.page.html',
  styleUrls: ['./sent-laisee.page.scss'],
})
export class SentLaiseePage {
  constructor(private locationStrategy: LocationStrategy) {}
  // 這個表單數據在全 sent-laisee 公用
  form = new FormGroup({
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
    count: new FormControl(1),
    account: new FormControl(''),
    blessing: new FormControl('恭喜發財利是逗來🧧🧧', [
      this.blessingValidator(),
    ]),
  });

  // 祝福語校驗，目前僅支持 中英文，數字，和提供的emojis
  blessingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const str = control.value;
      // 将表情符号数组转换成正则表达式的字符集
      const emojiPattern = emojis.map((emoji) => `${emoji}`).join('|');

      // 构造正则表达式
      const regexPattern = new RegExp(
        `^[\\u4e00-\\u9fa5a-zA-Z0-9${emojiPattern}]+$`
      );

      const isValid = regexPattern.test(str);

      console.log('str -----> ', isValid, regexPattern);
      return !isValid ? { blessing: { value: control.value } } : null;
    };
  }

  currentStep = 4;
  goBack() {
    // this.locationStrategy.back();
    this.nextStep(-1);
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
