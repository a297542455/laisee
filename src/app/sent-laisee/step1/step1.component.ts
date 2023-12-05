import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component {
  constructor() {}

  form = { name: '' };

  contacts = [
    { value: '13333333333', label: 'Tina電話' },
    { value: '123@qq.com', label: 'Tina郵箱' },
    { value: '88888888', label: 'Tina FPS' },
  ];
  checkboxOptions = [
    { label: 'Mobile No', checked: false },
    { label: 'Email', checked: false },
    { label: 'FPS ID', checked: false },
    // 可以根据需要添加更多选项
  ];

  nameInput(name: string) {
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const mobileReg = /^1[3-9]\d{9}$/;
    const FPSReg = /^\d{9}$/;

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
