import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PAGINATION_DUMB_COMPONENTS } from './_dumb-components';

@NgModule({
  declarations: [...PAGINATION_DUMB_COMPONENTS],
  exports: [...PAGINATION_DUMB_COMPONENTS],
  imports: [CommonModule, MatPaginatorModule, MatProgressBarModule],
  providers: [
    {
      provide: MatPaginatorIntl,
    },
  ],
})
export class PaginationModule {}
