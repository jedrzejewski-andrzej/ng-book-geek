import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorsRoutingModule } from './authors.routing.module';
import { AUTHORS_DUMB_COMPONENTS } from './_dumb-components';
import { AUTHORS_SERVICES } from './_services';
import { AUTHORS_SMART_COMPONENTS } from './_smart-components';
import {PaginationModule} from "../../../../ui-modules/pagination/pagination.module";
import {MatTableModule} from "@angular/material/table";
import {ButtonModule} from "../../../../ui-modules/button/button.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ControlInputModule} from "../../../../utility-modules/forms/modules/control-input/control-input.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  ControlDatepickerModule
} from "../../../../utility-modules/forms/modules/control-datepicker/control-datepicker.module";

@NgModule({
  declarations: [...AUTHORS_DUMB_COMPONENTS, ...AUTHORS_SMART_COMPONENTS],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    MatTableModule,
    ButtonModule,
    HttpClientModule,
    ControlInputModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    ControlDatepickerModule,
  ],

  providers: [...AUTHORS_SERVICES],
})
export class AuthorsModule {}
