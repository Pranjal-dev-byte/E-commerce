import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { PizzasDataService } from '../../services/pizzas-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggeddIn: boolean = false;
  showButton: boolean = false;
  emptyCart = false;
  subscription: Subscription;
  email: any;
  cartOrderItems: any = [];
  cartBuildItems: any = [];
  cart: any;
  cartActual: any = [];
  constructor(
    private pizzaDataService: PizzasDataService,
    private cartService: CartServiceService
  ) {
    this.subscription = this.cartService
      .getOrderFromCart()
      .subscribe((orderArr) => {
        if (orderArr) {
          this.cartOrderItems = orderArr;
        }
      });
  }
  ngOnInit(): void {
    // console.log(event);
    this.getCartDetails();
  }
  getCartDetails() {
    this.loggeddIn = localStorage.getItem('token') ? true : false;
    console.log(this.loggeddIn);
    // console.log(localStorage.getItem('token'));
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
          this.emptyCart = false;
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
    if (this.cart.length === 0) {
      this.emptyCart = true;
      console.log(this.emptyCart);
    } else {
      this.emptyCart = false;
    }
  }
  // ngOnChanges() {
  //   console.log('Changed');
  // }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.loggeddIn = false;
  }
  onHover() {
    this.cart = [];
    this.getCartDetails();
    this.subscription = this.cartService
      .getOrderFromCart()
      .subscribe((orderArr) => {
        if (orderArr) {
          this.cartOrderItems = orderArr;
        }
      });
    // if (!this.email) {
    //   this.cart = [];
    // }
    // window.location.reload();
    this.showButton = true;
  }
}
