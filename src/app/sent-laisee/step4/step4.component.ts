import { SentLaiseeService } from '../../services/sent-laisee.service';
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
import { AudioService } from 'src/app/services/audio.service';

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

  constructor(
    private service: SentLaiseeService,
    private audioService: AudioService
  ) {}
  ngOnInit() {
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
  async getEmojis() {
    this.emojis = await this.service.getEmojis();
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

  goNext() {
    // audioService 是一個單例，直接在服務中獲取數據即可，不用父子組件傳遞
    const { recordDataBase64 } = this.audioService.getRecording();

    if (recordDataBase64) {
      this.service.postRecording({ recordDataBase64 }).subscribe((fileUrl) => {
        if (fileUrl) {
          this.form.patchValue({ fileUrl });
          this.nextStep.emit(1);
        } else {
          alert('錄音保存失敗，請重試');
        }
      });
    } else {
      this.nextStep.emit(1);
    }
  }
}
