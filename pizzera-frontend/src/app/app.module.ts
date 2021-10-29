import { HttpClientModule, HttpParams } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildPizzaComponent } from './components/build-pizza/build-pizza.component';
import { FooterComponent } from './components/footer/footer.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderPizzaComponent } from './components/order-pizza/order-pizza.component';
import { PizzasDataService } from './services/pizzas-data.service';
import { StoryComponent } from './components/story/story.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderPizzaComponent,
    BuildPizzaComponent,
    StoryComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [PizzasDataService, HttpParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
