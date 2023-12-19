import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/capacitor',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
