import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from '../pizzas-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private pizzaDataService: PizzasDataService) {}
  _token: boolean = false;
  email: any;
  total = 0;
  cartOrderItems: any = [];

  cartBuildItems: any = [];
  cart: any;
  cartActual: any = [];
  ngOnInit(): void {
    this._token = localStorage.getItem('token') ? true : false;
    this.email = localStorage.getItem('email');
    this.cartOrderItems = JSON.parse(
      localStorage.getItem('cartOrderItems') || '{}'
    );
    this.cartBuildItems = JSON.parse(
      localStorage.getItem('cartBuildItems') || '{}'
    );
    console.log(this.cartOrderItems);
    if (
      Object.entries(this.cartBuildItems).length === 0 &&
      Object.entries(this.cartOrderItems).length === 0
    ) {
      console.log('None');
      this.cart = [this.cartOrderItems, this.cartBuildItems];
    } else if (Object.entries(this.cartOrderItems).length === 0) {
      console.log('Cart order');
      this.cart = [this.cartOrderItems, ...this.cartBuildItems];
    } else if (Object.entries(this.cartBuildItems).length === 0) {
      console.log('Build items');
      this.cart = [...this.cartOrderItems, this.cartBuildItems];
    } else if (
      !(Object.entries(this.cartOrderItems).length === 0) &&
      !(Object.entries(this.cartBuildItems).length === 0)
    ) {
      console.log('Both');
      this.cart = [...this.cartOrderItems, ...this.cartBuildItems];
    }
    // console.log('local cart', this.cart);
    if (this.email) {
      this.pizzaDataService.getCartData(this.email).subscribe((res: any) => {
        // console.log(res);
        for (let cartItem of res[0].cart) {
          if (!(Object.entries(cartItem).length === 0)) {
            this.cart.push(cartItem);
            // this.total += cartItem.price;
          }
        }
      });

      console.log('1');
    }

    this.cart = this.cart.filter(
      (value: any) => Object.keys(value).length !== 0
    );
    console.log(this.cart);

    this.syncDb();
  }
  syncDb() {
    setTimeout(() => {
      this.total = 0;
      for (let cartItem of this.cart) {
        // this.cart.push(cartItem);
        this.total += cartItem.price;
        console.log(cartItem.price);
      }
      if (this._token) {
        console.log(this.cart);
        this.pizzaDataService
          .updateCartData(this.cart, this.email)
          .subscribe((res) => {
            console.log(res);
            localStorage.removeItem('cartBuildItems');
            localStorage.removeItem('cartOrderItems');
          });
      }
    }, 1200);
  }
  deleteItem(idx: any, price: number) {
    console.log(this.cart.splice(idx, 1));
    console.log(this.cart.length);
    this.total -= price;
    this.syncDb();
    // this.pizzaDataService.deleteCartItem(idx).subscribe((res) => {
    //   console.log(res);
    // });
  }
  checkout() {}
}
