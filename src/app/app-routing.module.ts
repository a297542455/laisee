import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sent-laisee',
    pathMatch: 'full',
  },
  {
    path: 'sent-laisee',
    title: 'Sent Laisee',
    loadChildren: () =>
      import('./sent-laisee/sent-laisee.module').then(
        (m) => m.SentLaiseePageModule
      ),
  },
  {
    path: 'capacitor',
    loadChildren: () =>
      import('./capacitor/capacitor.module').then((m) => m.CapacitorPageModule),
  },
  {
    path: 'recording',
    loadChildren: () =>
      import('./recording/recording.module').then((m) => m.RecordingPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
