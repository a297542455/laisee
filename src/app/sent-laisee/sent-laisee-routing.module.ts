import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentLaiseePage } from './sent-laisee.page';
import { Step2Component } from './step2/step2.component';

const routes: Routes = [
  {
    path: '',
    component: SentLaiseePage,
  },
  {
    path: 'step2',
    component: Step2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentLaiseePageRoutingModule {}
