import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/ui-modules/button/button.module';
import { NotFoundRoutingModule } from './not-found.routing.module';
import { NOT_FOUND_DUMB_COMPONENTS } from './_dumb-components';
import { NOT_FOUND_SMART_COMPONENTS } from './_smart-components';


@NgModule({
  declarations: [...NOT_FOUND_DUMB_COMPONENTS, ...NOT_FOUND_SMART_COMPONENTS],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    ButtonModule,
  ],
})
export class NotFoundModule {}
