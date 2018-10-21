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

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  coffees: Array<Coffee>;
  offices: Array<Office>;
  isSelectedOffice: Office;
  isSelectedPantry: Pantry;
  pantries: Array<Pantry>;
  orderName: string;

  constructor(
    private coffeeService: CoffeeService,
    private officeService: OfficesService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOffices();
    this.getCoffees();
  }

  getCoffees(): void {
    this.coffeeService.getCoffees()
    .subscribe(coffees => {
      this.coffees = coffees;
    });
  }

  getOffices(): void {
    this.officeService.getOffices()
    .subscribe(offices => {
      this.offices = offices;
    });
  }

  onChangeOffice(office: Office): void {
    this.isSelectedOffice = office;
    this.pantries = office.pantry;
  }

  onChangePantry(pantry: Pantry): void {
    this.isSelectedPantry = pantry;
  }

  orderCoffee(coffee: Coffee): void {
    const order: Order = {
      id: Guid.create().toString(),
      name: this.orderName,
      pantryId: this.isSelectedPantry.id,
      coffeeId: coffee.id,
      quantity: 1,
      orderDate: new Date(),
    };

    this.orderService.orderCoffee(order)
    .subscribe(() => {
      console.log('success');
    });
  }
}
