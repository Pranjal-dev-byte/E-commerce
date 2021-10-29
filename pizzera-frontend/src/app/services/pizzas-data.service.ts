import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PizzasDataService {
  _url = 'http://localhost:3000/';
  constructor(private http: HttpClient, private httpParams: HttpParams) {}

  getOrderPizzaData() {
    return this.http.get(this._url + 'pizza');
  }
  getBuildPizzaData() {
    return this.http.get(this._url + 'ingredients');
  }
  getCartData(email: any) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get(this._url + 'cart', { params });
  }
  updateCartData(cart: any, email: any) {
    return this.http.put(this._url + 'cart', { cart: cart, email: email }, {});
  }
  deleteCartItem(id: any) {
    let params = new HttpParams();
    params = params.append('_id', id);
    return this.http.delete(this._url + 'cart', { params });
  }
}
