import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentLaiseePageRoutingModule } from './sent-laisee-routing.module';

import { SentLaiseePage } from './sent-laisee.page';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { RecordComponent } from './step4/record/record.component';
import { Step5Component } from './step5/step5.component';
import { Step6Component } from './step6/step6.component';
import { Step7Component } from './step7/step7.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentLaiseePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SentLaiseePage,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    RecordComponent,
    Step6Component,
    Step7Component,
  ],
})
export class SentLaiseePageModule {}
