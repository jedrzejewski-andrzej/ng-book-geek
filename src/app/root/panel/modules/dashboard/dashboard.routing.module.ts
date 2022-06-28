import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from './_smart-components/dashboard-container/dashboard-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
