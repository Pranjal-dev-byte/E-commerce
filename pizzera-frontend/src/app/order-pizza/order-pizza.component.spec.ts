import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPizzaComponent } from './order-pizza.component';

describe('OrderPizzaComponent', () => {
  let component: OrderPizzaComponent;
  let fixture: ComponentFixture<OrderPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
