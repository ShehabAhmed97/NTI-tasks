import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/user/login/login.component';
import { LoginformComponent } from './forms/loginform/loginform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    NavbarComponent,
    LoginComponent,
    LoginformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
