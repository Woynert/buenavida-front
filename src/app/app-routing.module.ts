import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVitrinaComponent } from '@layout/view-vitrina/view-vitrina.component'
import { ViewCartComponent    } from '@layout/view-cart/view-cart.component'
import { ViewLoginComponent   } from '@layout/view-login/view-login.component'
import { ViewSigninComponent  } from '@layout/view-signin/view-signin.component'

const routes: Routes = [
	{ path: ""      , component: ViewVitrinaComponent }, // default route
	{ path: "cart"  , component: ViewCartComponent },
	{ path: "login" , component: ViewLoginComponent },
	{ path: "signin", component: ViewSigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
