import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CONTROL_SELECT_SMART_COMPONENTS } from './_smart-components';

@NgModule({
  declarations: [...CONTROL_SELECT_SMART_COMPONENTS],
  exports: [...CONTROL_SELECT_SMART_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
})
export class ControlSelectModule {}
