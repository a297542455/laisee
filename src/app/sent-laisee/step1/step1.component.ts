import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SentLaiseeService } from './../../api/sent-laisee.service';
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

  constructor(private service: SentLaiseeService) {}

  get name() {
    return this.form.get('name');
  }
  ngOnInit() {
    this.form.get('name')?.enable();
    this.nameInput(this.name?.value);
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      // 在这里可以执行你想要的逻辑
      this.nameInput(this.name?.value);
    });
  }

  // 聯係人選項
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
      text: '錯誤示範: 999999999',
      data: '999999999',
    },
    {
      text: 'Cancel',
      role: 'cancel',
    },
  ];

  // 聯係人選定
  setValue(event: any) {
    if (event.detail.data) {
      this.form.patchValue({ name: event.detail.data });
    }
  }

  // 輸入的信息判斷
  checkboxOptions = [
    { label: 'Mobile No', checked: false },
    { label: 'Email', checked: false },
    { label: 'FPS ID', checked: false },
    // 可以根据需要添加更多选项
  ];

  // 輸入内容正則匹配 - 郵箱，11位手機號碼，9位FPS ID
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

  isToastOpen = false;
  goNext() {
    const name = this.form.get('name')?.value;
    const data = this.service.getData(name);
    if (data.name) {
      this.form.setValue(data);
      this.nextStep.emit(1);
    } else {
      this.isToastOpen = true;
    }
  }
}
