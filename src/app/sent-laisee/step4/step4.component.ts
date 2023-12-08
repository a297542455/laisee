import { SentLaiseeService } from './../../api/sent-laisee.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

type Account = {
  id: number;
  CNY: number;
  HKD: number;
  USD: number;
};

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component implements OnInit {
  @Input() form!: FormGroup;
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {
    // 订阅表单值的变化
    this.form.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      // 在这里可以执行你想要的逻辑
    });

    this.getEmojis();
    this.index = this.blessing?.value.length || 0;
  }

  // 用作驗證，所以不要取值 value
  get blessing() {
    return this.form.get('blessing');
  }

  get amount() {
    return this.form.get('amount');
  }

  get count() {
    return this.form.get('count')?.value;
  }

  get currency(): keyof Account {
    return this.form.get('currency')?.value;
  }

  get total() {
    return (
      this.form.get('count')?.value * Number(this.form.get('amount')?.value)
    ).toFixed(2);
  }

  emojis: string[] = [];
  getEmojis() {
    this.emojis = this.service.getEmojis();
  }

  index = 0;
  maxLength = 30;
  // 获取光标位置
  getIndex() {
    this.index = this.inputElement.nativeElement.selectionStart;
  }
  emojiClick(emoji: string) {
    const i = this.index;
    const old = this.blessing?.value || '';

    // 不能超出最長
    if (old.length + emoji.length > this.maxLength) {
      return;
    }
    // 光標位置添加内容
    const blessing = old.slice(0, i) + emoji + old.slice(i);
    this.form.patchValue({ blessing });
    // 添加了内容，下標+length
    this.index += emoji.length;
  }

  // 錄音
  onTouchStart(event: TouchEvent) {
    console.log('Touch start:', event);
    // 处理 touchstart 事件的逻辑
  }

  onTouchMove(event: TouchEvent) {
    console.log('Touch move:', event);
    // 处理 touchmove 事件的逻辑
  }

  onTouchEnd(event: TouchEvent) {
    console.log('Touch end:', event);
    // 处理 touchend 事件的逻辑
  }

  proceed() {
    this.nextStep.emit(1);
  }
}
