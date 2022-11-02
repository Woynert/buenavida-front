import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewVitrinaComponent } from './view-vitrina/view-vitrina.component';
import { HeaderComponent } from './header/header.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewLoginComponent } from './view-login/view-login.component';
import { ViewSigninComponent } from './view-signin/view-signin.component';
import { VitrinaFilterComponent } from './vitrina-filter/vitrina-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewVitrinaComponent,
    HeaderComponent,
    ViewCartComponent,
    ViewLoginComponent,
    ViewSigninComponent,
    VitrinaFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
