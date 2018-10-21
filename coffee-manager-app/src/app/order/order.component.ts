import { Component, OnInit } from '@angular/core';
import { Coffee } from '../models/coffee.model';
import { CoffeeService } from '../services/coffee.service';
import { Order } from '../models/order.model';
import { OfficesService } from '../services/office.service';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { PantryService } from '../services/pantry.service';
import { OrderService } from '../services/order.service';
import { Guid } from 'guid-typescript';
import { Globals } from '../globals';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  coffees: Array<Coffee>;
  orderName: string;

  constructor(
    private globals: Globals,
    private coffeeService: CoffeeService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getCoffees();
  }

  getCoffees(): void {
    this.coffeeService.getCoffees()
    .subscribe(coffees => {
      this.coffees = coffees;
    });
  }

  orderCoffee(coffee: Coffee): void {
    const order: Order = {
      id: Guid.create().toString(),
      name: this.globals.name,
      pantryId: this.globals.pantry.id,
      coffeeId: coffee.id,
      quantity: 1,
      orderDate: new Date(),
    };

    this.orderService.orderCoffee(order)
      .subscribe(() => console.log('success'));
  }
}
