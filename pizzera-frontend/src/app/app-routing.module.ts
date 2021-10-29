import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildPizzaComponent } from './components/build-pizza/build-pizza.component';
import { LoginComponent } from './components/login/login.component';
import { OrderPizzaComponent } from './components/order-pizza/order-pizza.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { StoryComponent } from './components/story/story.component';

const routes: Routes = [
  { path: '', component: StoryComponent, pathMatch: 'full' },
  { path: 'build-pizza', component: BuildPizzaComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order-pizza', component: OrderPizzaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
