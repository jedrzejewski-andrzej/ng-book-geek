import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAIN_MENU_DUMB_COMPONENTS } from './_dumb-components';

@NgModule({
  declarations: [...MAIN_MENU_DUMB_COMPONENTS],
  exports: [...MAIN_MENU_DUMB_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class MainMenuModule {}
