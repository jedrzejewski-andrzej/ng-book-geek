import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CONTROL_INPUT_SMART_COMPONENTS } from './_smart-components';
import { OnlyNumberDirective } from '../../../../directives/only-number.directive';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    ...CONTROL_INPUT_SMART_COMPONENTS,
    OnlyNumberDirective,
  ],
  exports: [...CONTROL_INPUT_SMART_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    ClipboardModule,
  ],
})
export class ControlInputModule {}
