import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PizzasDataService {
  _url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getOrderPizzaData() {
    return this.http.get(this._url + 'pizza');
  }
  getBuildPizzaData() {
    return this.http.get(this._url + 'ingredients');
  }
}
