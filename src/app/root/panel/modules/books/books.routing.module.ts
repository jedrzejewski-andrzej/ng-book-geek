import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksContainerComponent} from "./_smart-components/books-container/books-container.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BooksContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
