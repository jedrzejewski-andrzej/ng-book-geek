import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrizesRoutingModule } from './prizes.routing.module';
import { PRIZES_DUMB_COMPONENTS } from './_dumb-components';
import { PRIZES_SERVICES } from './_services';
import { PRIZES_SMART_COMPONENTS } from './_smart-components';
import {PaginationModule} from "../../../../ui-modules/pagination/pagination.module";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "../../../../ui-modules/button/button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlInputModule} from "../../../../utility-modules/forms/modules/control-input/control-input.module";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [...PRIZES_DUMB_COMPONENTS, ...PRIZES_SMART_COMPONENTS],
  imports: [
    CommonModule,
    PrizesRoutingModule,
    PaginationModule,
    MatTableModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    ControlInputModule,
    MatDialogModule
  ],
  providers: [...PRIZES_SERVICES],
})
export class PrizesModule {}
