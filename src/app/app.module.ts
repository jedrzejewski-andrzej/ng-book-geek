import {CommonModule, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_SMART_COMPONENTS } from './_smart-components';
import { AppComponent } from './_smart-components/app-component/app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [...APP_SMART_COMPONENTS],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class AppModule {
  constructor() {
    // used in some decimal pipes across the app
    registerLocaleData(localeFr, 'fr');
  }
}
