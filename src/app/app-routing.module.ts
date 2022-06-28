import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/panel/dashboard',
  },
  {
    path: 'panel',
    loadChildren: () =>
      import('./root/panel/panel.module').then(m => m.PanelModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./root/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
