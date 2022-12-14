import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';


// vitrina
import { ViewVitrinaComponent } from '@layout/view-vitrina/view-vitrina.component';
import { VitrinaFilterComponent } from '@layout/view-vitrina/vitrina-filter/vitrina-filter.component';
import { VitrinaPagerComponent } from './layout/view-vitrina/vitrina-pager/vitrina-pager.component';

import { ViewCartComponent } from '@layout/view-cart/view-cart.component';
import { ViewLoginComponent } from '@layout/view-login/view-login.component';
import { ViewSigninComponent } from '@layout/view-signin/view-signin.component';

import { HeaderComponent } from '@shared/header/header.component';

@NgModule({
	declarations: [
		AppComponent,
		ViewVitrinaComponent,
		HeaderComponent,
		ViewCartComponent,
		ViewLoginComponent,
		ViewSigninComponent,
		VitrinaFilterComponent,
		VitrinaPagerComponent,
		VitrinaFilterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		ClickOutsideModule,

		// Toat with no animations
		ToastNoAnimationModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
