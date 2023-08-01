import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { CartComponent } from './Pages/cart/cart.component';
import { DetailsComponent } from './Pages/details/details.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',component:LoginComponent},
  {path:'cart',component:CartComponent},
  {path:'productdetails/:id',component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
