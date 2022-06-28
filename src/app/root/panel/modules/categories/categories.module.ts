import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories.routing.module';
import { CATEGORIES_DUMB_COMPONENTS } from './_dumb-components';
import { CATEGORIES_SERVICES } from './_services';
import { CATEGORIES_SMART_COMPONENTS } from './_smart-components';
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "../../../../ui-modules/button/button.module";
import {PaginationModule} from "../../../../ui-modules/pagination/pagination.module";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlInputModule} from "../../../../utility-modules/forms/modules/control-input/control-input.module";
import {ControlSelectModule} from "../../../../utility-modules/forms/modules/control-select/control-select.module";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [...CATEGORIES_DUMB_COMPONENTS, ...CATEGORIES_SMART_COMPONENTS],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    PaginationModule,
    MatTableModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    ControlInputModule,
    ControlSelectModule,
    MatDialogModule
  ],

  providers: [...CATEGORIES_SERVICES],
})
export class CategoriesModule {}
