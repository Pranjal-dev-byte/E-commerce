import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from '../pizzas-data.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css'],
})
export class OrderPizzaComponent implements OnInit {
  orderPizzasData: any;
  orderArr: any = [];
  constructor(private pizzasData: PizzasDataService) {}

  ngOnInit(): void {
    this.pizzasData.getOrderPizzaData().subscribe((data: any) => {
      this.orderPizzasData = data;
      // console.log(data);
      console.log(this.orderPizzasData);
    });
  }
  addToCart(item: any) {
    this.orderArr.push(item);
    localStorage.setItem('cartOrderItems', JSON.stringify(this.orderArr));
    console.log(this.orderArr);
  }
}
