import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../services/office.service';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { Order } from '../models/order.model';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock.model';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  isSelectedOffice: Office;
  pantries: Array<Pantry>;
  offices: Array<Office>;
  stocks: Array<Stock>;
  isSelectIngredient = false;
  isSelectedPantry: Pantry;
  isSelectedStock: Stock;
  valueCost: number;
  ingredientValue: number;
  reload = false;
  value: number;
  Math: any;
  reloadStock = false;

  constructor(
    private officeService: OfficesService,
    private stockService: StockService
  ) {
    this.Math = Math;
  }

  ngOnInit() {
    this.getOffices();
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
    this.stockService.getOrdersPerPantry(pantry.id)
    .subscribe((stocks => {
      this.stocks = stocks;
      if (this.stocks.length > 0) {
      this.reload = true;
      } else {
        this.reloadStock = true;
      }
    }));
  }

  setIngredient(stock: Stock): void {
    this.isSelectedStock = stock;
    this.isSelectIngredient = true;
    this.valueCost = stock.value;
  }

  addNewStock(): void {

  }

  updateStockValue(): void {
    this.reload = false;
    const updatedStock: Stock = {
      id: this.isSelectedStock.id,
      pantryId: this.isSelectedStock.pantryId,
      ingredientId: this.isSelectedStock.ingredientId,
      value: this.ingredientValue,
      ingredient: this.isSelectedStock.ingredient,
      pantry: this.isSelectedStock.pantry
    };

    this.stockService.updateStock(updatedStock)
    .subscribe(() => {
      this.onChangePantry(this.isSelectedPantry);
      this.ingredientValue = 0;
      this.isSelectIngredient = false;
    });
  }
}
