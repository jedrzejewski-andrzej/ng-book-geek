import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books.routing.module';
import { BOOKS_DUMB_COMPONENTS } from './_dumb-components';
import { BOOKS_SERVICES } from './_services';
import { BOOKS_SMART_COMPONENTS } from './_smart-components';
import {PaginationModule} from "../../../../ui-modules/pagination/pagination.module";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "../../../../ui-modules/button/button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlInputModule} from "../../../../utility-modules/forms/modules/control-input/control-input.module";
import {
  ControlDatepickerModule
} from "../../../../utility-modules/forms/modules/control-datepicker/control-datepicker.module";
import {ControlSelectModule} from "../../../../utility-modules/forms/modules/control-select/control-select.module";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [...BOOKS_DUMB_COMPONENTS, ...BOOKS_SMART_COMPONENTS],
  imports: [
    CommonModule,
    BooksRoutingModule,
    PaginationModule,
    MatTableModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    ControlInputModule,
    ControlDatepickerModule,
    ControlSelectModule,
    MatDialogModule,
  ],

  providers: [...BOOKS_SERVICES],
})
export class BooksModule {}
