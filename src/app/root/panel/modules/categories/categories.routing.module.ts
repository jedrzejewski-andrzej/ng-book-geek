import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesContainerComponent} from "./_smart-components/categories-container/categories-container.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
