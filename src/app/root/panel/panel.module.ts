import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelRoutingModule } from './panel.routing.module';
import { PANEL_SERVICES } from './services';
import { PANEL_DUMB_COMPONENTS } from './_dumb-components';
import { PANEL_SMART_COMPONENTS } from './_smart-components';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MainMenuModule} from "../../ui-modules/main-menu/main-menu.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [...PANEL_DUMB_COMPONENTS, ...PANEL_SMART_COMPONENTS],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MainMenuModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [...PANEL_SERVICES],
})
export class PanelModule {}
