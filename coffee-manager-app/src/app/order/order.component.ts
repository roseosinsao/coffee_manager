import { Component, OnInit } from '@angular/core';
import { Coffee } from '../models/coffee.model';
import { CoffeeService } from '../services/coffee.service';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { Guid } from 'guid-typescript';
import { Globals } from '../globals';
import { MatSnackBar } from '@angular/material';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  coffees: Array<Coffee>;
  orderName: string;
  errorMessage = false;
  coffeeStatus = Array<Object>();

  constructor(
    private globals: Globals,
    private coffeeService: CoffeeService,
    private orderService: OrderService,
    private stockService: StockService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (this.globals.pantry) {
      this.getCoffees();
    }
  }

  getCoffees(): void {
    this.coffeeService.getCoffees()
      .subscribe(coffees => {
        this.coffees = coffees;
        this.getStockPerPantry();
      });
  }

  setAvailableCoffee(): void {
    this.coffeeStatus = [];
    if (this.globals.pantry) {
      const availableIngredients = this.globals.stocks
        .filter(stock => (stock.value > 0))
        .map(stock => {
          if (stock.value > 0) {
            return stock.ingredient;
          }
        });

      let isAvailable: boolean;
      this.coffees.forEach(coffee => {
        isAvailable = true;
        const coffeeIngredients = coffee.coffeeIngredient;

        coffeeIngredients.some(coffeeIngredient => {
          const ingredient = availableIngredients
            .filter(availableIngredient => availableIngredient.id === coffeeIngredient.ingredientId);

          if (ingredient.length === 0) {
            isAvailable = false;
            return false;
          }
        });

        this.coffeeStatus.push(Object.assign(coffee, { isAvailable }));
      });
    }
  }

  getStockPerPantry(): void {
    this.stockService.getStocksPerPantry(this.globals.pantry.id)
    .subscribe((stocks) => {
      this.globals.stocks = stocks;
      this.setAvailableCoffee();
    });
  }

  orderCoffee(coffee: Coffee): void {
    if (this.globals.pantry) {
      const order: Order = {
        id: Guid.create().toString(),
        name: this.globals.name ? this.globals.name : 'Anon',
        pantryId: this.globals.pantry.id,
        coffeeId: coffee.id,
        quantity: 1,
        orderDate: new Date(),
        coffee: coffee
      };

      this.orderService.orderCoffee(order)
        .subscribe(() => {
          this.getCoffees();
          this.openSnackBar('Order Success!', 'Okay');
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
