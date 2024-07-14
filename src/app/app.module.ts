import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InputComponent } from './app/components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './app/components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { Page1Component } from './app/pages/page1/page1.component';
import { Page2Component } from './app/pages/page2/page2.component';
import { FormComponent } from './app/pages/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    SelectComponent,
    Page1Component,
    Page2Component,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
