import { Component, OnInit } from '@angular/core';
import { PizzasDataService } from '../../services/pizzas-data.service';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css'],
})
export class BuildPizzaComponent implements OnInit {
  buildPizzaData: any;
  total: number = 0;
  orderArr: any = [];
  constructor(private pizzasData: PizzasDataService) {}

  ngOnInit(): void {
    // if (localStorage.getItem('token')) {
    //   console.log(localStorage.getItem('token'));
    this.pizzasData.getBuildPizzaData().subscribe((data: any) => {
      this.buildPizzaData = data;
      // });
    });
  }

  addcheckbox(event: any, list: any) {
    this.orderArr.push(list);
    localStorage.setItem('cartBuildItems', JSON.stringify(this.orderArr));
    console.log(event);
    if (event.target.checked) {
      this.total += list.price;
    } else {
      this.orderArr = this.orderArr.splice(this.orderArr.indexOf(list), 1);
      // console.log(this.orderArr);
      localStorage.setItem('cartBuildItems', JSON.stringify(this.orderArr));
      // console.log();
      this.total -= list.price;
    }
  }
}
