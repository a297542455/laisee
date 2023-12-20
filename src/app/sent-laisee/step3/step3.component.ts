import {
  Account,
  ActionSheetButtons,
  SentLaiseeService,
} from '../../services/sent-laisee.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  btns = [20, 50, 100, 500];

  myNums = ['Send one', 'Double up'];

  btnClick(amount: number) {
    this.form.patchValue({ amount });
  }

  numClick(index: number) {
    this.form.patchValue({ count: index + 1 });
  }

  // 用作驗證，所以不要取值 value
  get amount() {
    return this.form.get('amount');
  }

  get count() {
    return this.form.get('count')?.value;
  }

  get btnCurrent() {
    return this.btns.indexOf(Number(this.form.get('amount')?.value));
  }

  get currency(): keyof Omit<Account, 'id' | 'userId'> {
    return this.form.get('currency')?.value;
  }

  get total() {
    return (
      this.form.get('count')?.value * Number(this.form.get('amount')?.value)
    ).toFixed(2);
  }

  // 金額格式化
  transformAmount(amount: number): string {
    // 将数字转为字符串，并且保留两位小数
    const formattedAmount = Number(amount).toFixed(2);

    // 使用正则表达式添加千位分隔符
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return formattedAmount.replace(regex, ',');
  }

  // 賬號選項
  actionSheetButtons: ActionSheetButtons<Account> = [];
  // 當前選中賬號數據
  currentAccount: Account = {
    id: '',
    CNY: 0,
    HKD: 0,
    USD: 0,
  };

  // 賬號選定 - 注意在點擊下一步時，才把數據更新到 form
  setValue(event: any) {
    if (event.detail.data) {
      this.currentAccount = event.detail.data;
    }
  }

  async getAccounts() {
    const arr = await this.service.getAccounts();
    if (!arr[0]) {
      this.message = '當前用戶沒有賬號!';
      this.isAlertOpen = true;
      return;
    }
    this.currentAccount =
      arr.find((a) => a.id === this.currentAccount.id) || arr[0];

    const actionSheetButtons: ActionSheetButtons<Account> = arr.map((item) => ({
      text: String(item.id),
      data: item,
    }));
    actionSheetButtons.push({
      text: 'Cancel',
      role: 'cancel',
    });
    this.actionSheetButtons = actionSheetButtons;
  }

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {
    // 獲取聯係人列表
    this.currentAccount.id = this.form.get('account')?.value;
    this.getAccounts();
  }

  isAlertOpen = false;
  message = '';
  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.isAlertOpen = false;
        this.getAccounts();
      },
    },
    {
      text: 'Try again',
      role: 'confirm',
      handler: () => {
        this.isAlertOpen = false;
        setTimeout(async () => {
          // 兩個方法都包含了 this.isAlertOpen = true，需要setTimeout等下一個節點才能觸發
          await this.getAccounts();
          this.goNext();
        }, 0);
      },
    },
  ];
  goNext() {
    if (!this.form.valid) {
      return alert('請輸入正確的金額格式');
    }
    if (Number(this.total) > this.currentAccount[this.currency]) {
      this.message = '當前賬戶餘額不足，請確認后再試!';
      this.isAlertOpen = true;
      return;
    }
    this.form.setValue({
      ...this.form.value,
      account: this.currentAccount.id,
    });
    this.nextStep.emit(1);
  }
}
