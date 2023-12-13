import { SentLaiseeService } from './../api/sent-laisee.service';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-sent-laisee',
  templateUrl: './sent-laisee.page.html',
  styleUrls: ['./sent-laisee.page.scss'],
})
export class SentLaiseePage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  constructor(
    private service: SentLaiseeService,
    private locationStrategy: LocationStrategy
  ) {}

  async ngOnInit() {
    // 異步獲取emojis表情,然後再給表單添加校驗規則
    await this.getEmojis();
    this.form.get('blessing')?.addValidators(this.blessingValidator());
  }

  //  異步獲取emojis表情
  emojis: string[] = [];
  async getEmojis() {
    this.emojis = await this.service.getEmojis();
  }

  // 這個表單數據在全 sent-laisee 公用，blessing需要在服務器拿回數據再添加校驗規則
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    payee: new FormControl('模擬**'),
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
    blessing: new FormControl('恭喜發財利是逗來🧧🧧'),
  });

  // 祝福語校驗，允許爲空，目前僅支持 中英文，數字，和提供的emojis
  blessingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const str = control.value;
      // 允許爲空
      if (!str) return null;
      // 将表情符号数组转换成正则表达式的字符集
      const emojiPattern = this.emojis.map((emoji) => `${emoji}`).join('|');

      // 构造正则表达式
      const regexPattern = new RegExp(
        `^[\\u4e00-\\u9fa5a-zA-Z0-9${emojiPattern}]+$`
      );

      const isValid = regexPattern.test(str);
      // console.log('isValid -----> ', isValid, regexPattern);
      return !isValid ? { blessing: { value: control.value } } : null;
    };
  }

  // 按照UI圖3步設計，前端頁面不好劃分
  // 目前每個步驟分一個step，再用 step 設置進度progress
  currentStep = 1;
  get progress() {
    if (this.currentStep <= 4) {
      return 1;
    } else if (this.currentStep <= 6) {
      return 2;
    } else {
      return 3;
    }
  }
  goBack() {
    // this.locationStrategy.back();
    this.nextStep(-1);
  }
  nextStep(num: number) {
    const nextStep = this.currentStep + num;
    if (nextStep > 7) {
      this.form.patchValue({ name: '' });
      this.currentStep = 1;
    } else if (nextStep < 1) {
      this.currentStep = 1;
    } else {
      this.currentStep = nextStep;
      this.content.scrollToTop();
    }
  }
}
