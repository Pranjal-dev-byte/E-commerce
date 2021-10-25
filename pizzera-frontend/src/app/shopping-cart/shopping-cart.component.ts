import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor() {}
  _token: boolean = false;
  ngOnInit(): void {
    this._token = localStorage.getItem('token') ? true : false;
    // let itemsArr=[]
    // itemsArr = localStorage.getItem('cartItems');
    // localStorage.removeItem('cartBuildItems');
    // console.log(itemsArr?.length);
    // for (let item of itemsArr) {
    //   console.log(item);
    // }
    console.log(JSON.parse(localStorage.getItem('cartOrderItems') || '{}'));
    console.log(JSON.parse(localStorage.getItem('cartBuildItems') || '{}'));
    // console.log(localStorage.getItem('cartItems')?.length);
  }
  checkout() {
    if (this._token) {
      console.log(localStorage.getItem('email'));
      // console.log(localStorage.getItem('token'));
    }
  }
}
