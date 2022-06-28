import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrizesContainerComponent} from "./_smart-components/prizes-container/prizes-container.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PrizesContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrizesRoutingModule {}
