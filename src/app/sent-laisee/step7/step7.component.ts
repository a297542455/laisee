import { SentLaiseeService } from './../../api/sent-laisee.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
})
export class Step7Component implements OnInit, OnDestroy {
  @Output() nextStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: SentLaiseeService) {}
  ngOnInit() {}

  ngOnDestroy() {}

  goNext() {
    this.nextStep.emit(1);
  }
}
