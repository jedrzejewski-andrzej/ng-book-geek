import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonIconComponent } from './_dumb-components/button-icon/button-icon.component';
import { UI_MODULES_BUTTON_DUMB_COMPONENTS } from './_dumb-components';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  exports: [...UI_MODULES_BUTTON_DUMB_COMPONENTS],
  declarations: [...UI_MODULES_BUTTON_DUMB_COMPONENTS, ButtonIconComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
})
export class ButtonModule {}
