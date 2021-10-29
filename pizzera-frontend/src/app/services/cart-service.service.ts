import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private subject = new Subject<any>();
  constructor() {}
  sendOrderToCart(orderArr: any) {
    this.subject.next({ orderArr });
  }
  getOrderFromCart() {
    return this.subject.asObservable();
  }
}
