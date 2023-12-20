import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActionSheetButtons,
  Contact,
  SentLaiseeService,
} from '../../services/sent-laisee.service';
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
    this.getContacts();
    this.nameInput(this.name?.value);
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      // 在这里可以执行你想要的逻辑
      this.nameInput(this.name?.value);
    });
  }

  // 聯係人選項
  actionSheetButtons: ActionSheetButtons<Contact> = [];

  getContacts() {
    this.service.getContacts().subscribe((arr) => {
      const actionSheetButtons: ActionSheetButtons<Contact> = arr.map(
        (item) => ({
          text: '模擬：' + item.id,
          data: item,
        })
      );
      actionSheetButtons.push({
        text: '錯誤：999999999',
        data: { id: '999999999' },
      });
      actionSheetButtons.push({
        text: 'Cancel',
        role: 'cancel',
      });
      this.actionSheetButtons = actionSheetButtons;
    });
  }

  // 聯係人選定
  setValue(event: any) {
    if (event.detail.data) {
      this.form.patchValue({ name: event.detail.data.id });
    }
  }

  // 輸入的信息判斷
  checkboxOptions = [
    { label: 'Mobile No', checked: false },
    { label: 'Email', checked: false },
    { label: 'FPS ID', checked: false },
    // 可以根据需要添加更多选项
  ];

  type = '';
  // 輸入内容正則匹配 - 郵箱，11位手機號碼，9位FPS ID
  nameInput(name: string) {
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const mobileReg = /^1[3-9]\d{9}$/;
    const FPSReg = /^\d{9}$/;

    if (mobileReg.test(name)) {
      this.checkboxOptions[0].checked = true;
      this.type = 'mobile';
    } else {
      this.checkboxOptions[0].checked = false;
    }
    if (emailReg.test(name)) {
      this.checkboxOptions[1].checked = true;
      this.type = 'Email';
    } else {
      this.checkboxOptions[1].checked = false;
    }
    if (FPSReg.test(name)) {
      this.checkboxOptions[2].checked = true;
      this.type = 'FPSID';
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
    if (!this.datavalid) {
      return alert('id不存在');
    }
    this.service.getContactByName(name, this.type).subscribe((data) => {
      console.log('getContactByName -----> ', data);
      if (data?.[0]?.id) {
        this.form.patchValue(data[0]);
        this.nextStep.emit(1);
      } else {
        this.isToastOpen = true;
      }
    });
  }
}
