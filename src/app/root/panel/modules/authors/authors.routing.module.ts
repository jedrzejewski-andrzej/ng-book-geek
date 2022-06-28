import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthorsContainerComponent
} from './_smart-components/authors-container/authors-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthorsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
