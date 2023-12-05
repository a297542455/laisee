import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  get name() {
    return this.form.get('name');
  }
  ngOnInit() {
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      // 在这里可以执行你想要的逻辑
      this.nameInput(value.name as string);
    });
  }

  contacts = [
    { value: '13333333333', label: 'Tina電話' },
    { value: '123@qq.com', label: 'Tina郵箱' },
    { value: '888888888', label: 'Tina FPS' },
  ];

  actionSheetButtons = [
    {
      text: 'Tina電話: 13333333333',
      data: '13333333333',
    },
    {
      text: 'Tina郵箱: 123@qq.com',
      data: '123@qq.com',
    },
    {
      text: 'Tina FPS: 888888888',
      data: '888888888',
    },
    {
      text: 'Cancel',
      role: 'cancel',
    },
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

  get datavalid() {
    return this.checkboxOptions.some((item) => item.checked);
  }
}
