import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DASHBOARD_DUMB_COMPONENTS } from './_dumb-components';
import { DASHBOARD_SERVICES } from './_services';
import { DASHBOARD_SMART_COMPONENTS } from './_smart-components';

@NgModule({
  declarations: [...DASHBOARD_DUMB_COMPONENTS, ...DASHBOARD_SMART_COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],

  providers: [...DASHBOARD_SERVICES],
})
export class DashboardModule {}
