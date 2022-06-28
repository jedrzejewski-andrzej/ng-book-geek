import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelContainerComponent } from './_smart-components/panel-container/panel-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: PanelContainerComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          panelAnimationState: 1,
        },
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            m => m.DashboardModule,
          ),
      },
      {
        path: 'books',
        data: {
          panelAnimationState: 2,
        },
        loadChildren: () =>
          import('./modules/books/books.module').then(
            m => m.BooksModule,
          ),
      },
      {
        path: 'categories',
        data: {
          panelAnimationState: 3,
        },
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            m => m.CategoriesModule,
          ),
      },
      {
        path: 'authors',
        data: {
          panelAnimationState: 4,
        },
        loadChildren: () =>
          import('./modules/authors/authors.module').then(
            m => m.AuthorsModule,
          ),
      },
      {
        path: 'prizes',
        data: {
          panelAnimationState: 5,
        },
        loadChildren: () =>
          import('./modules/prizes/prizes.module').then(
            m => m.PrizesModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
