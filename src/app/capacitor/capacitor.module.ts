import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapacitorPageRoutingModule } from './capacitor-routing.module';

import { CapacitorPage } from './capacitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapacitorPageRoutingModule
  ],
  declarations: [CapacitorPage]
})
export class CapacitorPageModule {}
