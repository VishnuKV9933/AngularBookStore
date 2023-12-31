import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FirstTwoWordsPipe } from './first-two-words-pipe';
import { CartComponent } from './Pages/cart/cart.component';
import { CommonModule, DatePipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './Pages/details/details.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopBarComponent,
    FirstTwoWordsPipe,
    CartComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [DatePipe,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
