import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../services/office.service';
import { PantryService } from '../services/pantry.service';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { Guid } from 'guid-typescript';
import { StockService } from '../services/stock.service';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../models/ingredient.model';
import { Stock } from '../models/stock.model';
import { StockWebModel } from '../models/stocks-request.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  offices: Array<Office>;
  pantries: Array<Pantry>;
  selectedOffice: Office;
  officeName: string;
  pantryName: string;
  ingredients: Array<Ingredient>;
  sugar: Ingredient;
  coffeebean: Ingredient;
  milk: Ingredient;

  constructor(
    private officeService: OfficesService,
    private pantryService: PantryService,
    private stockService: StockService,
    private ingredientService: IngredientService
  ) { }

  ngOnInit() {
    this.getOffices();
    this.getIngredients();
  }

  getOffices(): void {
    this.officeService.getOffices()
    .subscribe(offices => {
      this.offices = offices;
    });
  }

  setPantries(office: Office): void {
    this.selectedOffice = office;
    this.pantries = this.selectedOffice.pantry;
  }

  getPantries(): void {
    this.pantryService.getPantries(this.selectedOffice.id)
      .subscribe(pantries => {
        this.pantries = pantries;
      });
  }

  createOffice() {
    const office: Office = {
      id: Guid.create().toString(),
      name: this.officeName,
      pantry: []
    };

    this.officeService.createOffice(office)
    .subscribe(() => {
      this.officeName = '';
      this.getOffices();
    });
  }

  getIngredients(): void {
    this.ingredientService.getIngredients()
    .subscribe((ingredients) => {
      this.ingredients = ingredients;
      this.setIngredients();
    });
  }

  setIngredients(): void {
    this.ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name === 'Coffee beans') {
        this.coffeebean = ingredient;
      } else if (ingredient.name === 'Sugar') {
        this.sugar = ingredient;
      } else if (ingredient.name === 'Milk') {
        this.milk = ingredient;
      }
    });
  }

  addStocks(pantry: Pantry): void {
    const addSugarStock: Stock = {
      id: Guid.create().toString(),
      pantryId: pantry.id,
      ingredientId: this.sugar.id,
      value: 0,
      ingredient: this.sugar,
      pantry: pantry
    };
    const addCoffeebeanStock: Stock = {
      id: Guid.create().toString(),
      pantryId: pantry.id,
      ingredientId: this.coffeebean.id,
      value: 0,
      ingredient: this.coffeebean,
      pantry: pantry
    };
    const addMilkStock: Stock = {
      id: Guid.create().toString(),
      pantryId: pantry.id,
      ingredientId: this.milk.id,
      value: 0,
      ingredient: this.milk,
      pantry: pantry
    };

    const stocks: Array<Stock> = [];
    stocks.push(addSugarStock);
    stocks.push(addCoffeebeanStock);
    stocks.push(addMilkStock);
    const stocksWebModel: StockWebModel = {
      stocks: stocks
    };

    this.stockService.addNewStocks(stocksWebModel)
    .subscribe(() => console.log('added stocks'));
  }

  addPantry() {
    const pantry: Pantry = {
      id: Guid.create().toString(),
      name: this.pantryName,
      officeId: this.selectedOffice.id,
    };

    this.pantryService.addPantry(pantry)
    .subscribe(() => {
      this.pantryName = '';
      this.getOffices();
      this.addStocks(pantry);
      this.getPantries();
    });
  }
}
