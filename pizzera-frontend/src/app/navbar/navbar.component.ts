import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzasDataService } from '../pizzas-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggeddIn: boolean = false;
  showButton: boolean = false;
  email: any;
  cartOrderItems: any = [];
  cartBuildItems: any = [];
  cart: any;
  cartActual: any = [];
  constructor(private pizzaDataService: PizzasDataService) {}
  ngOnInit(): void {
    // console.log(event);
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
    // window.location.reload();
    this.showButton = true;
  }
}
