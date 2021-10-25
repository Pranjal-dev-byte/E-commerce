import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { LoginComponent } from './login/login.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StoryComponent } from './story/story.component';

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
