import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentLaiseePage } from './sent-laisee.page';

const routes: Routes = [
  {
    path: '',
    component: SentLaiseePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentLaiseePageRoutingModule {}
