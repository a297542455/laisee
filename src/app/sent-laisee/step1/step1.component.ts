import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component {
  constructor() {}

  contacts = [
    { value: '13333333333', label: 'Tina電話' },
    { value: '123@qq.com', label: 'Tina郵箱' },
    { value: '88888888', label: 'Tina FPS' },
  ];

  form = { name: '' };
  checkboxOptions = [
    { label: 'Mobile No', checked: false },
    { label: 'Email', checked: false },
    { label: 'FPS ID', checked: false },
    // 可以根据需要添加更多选项
  ];

  nameInput(name: string) {
    const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const mobileReg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    const FPSReg = /^\d{8}$/;

    if (mobileReg.test(name)) {
      this.checkboxOptions[0].checked = true;
    } else {
      this.checkboxOptions[0].checked = false;
    }
    if (emailReg.test(name)) {
      this.checkboxOptions[1].checked = true;
    } else {
      this.checkboxOptions[1].checked = false;
    }
    if (FPSReg.test(name)) {
      this.checkboxOptions[2].checked = true;
    } else {
      this.checkboxOptions[2].checked = false;
    }
  }

  onSubmit() {}
}
