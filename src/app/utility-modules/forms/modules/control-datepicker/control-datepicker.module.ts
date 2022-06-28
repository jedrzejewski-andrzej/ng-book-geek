import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CONTROL_DATEPICKER_SMART_COMPONENTS } from './_smart-components';

@NgModule({
  declarations: [...CONTROL_DATEPICKER_SMART_COMPONENTS],
  exports: [...CONTROL_DATEPICKER_SMART_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
})
export class ControlDatepickerModule {}
