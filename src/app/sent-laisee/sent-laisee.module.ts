import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentLaiseePageRoutingModule } from './sent-laisee-routing.module';

import { SentLaiseePage } from './sent-laisee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentLaiseePageRoutingModule
  ],
  declarations: [SentLaiseePage]
})
export class SentLaiseePageModule {}
