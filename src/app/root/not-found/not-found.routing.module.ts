import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundContainerComponent } from './_smart-components/not-found-container/not-found-container.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
