import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../services/office.service';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { Order } from '../models/order.model';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock.model';
import { Ingredient } from '../models/ingredient.model';
import { Globals } from '../globals';
import { Guid } from 'guid-typescript';

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
    private globals: Globals,
    private stockService: StockService
  ) {
    this.Math = Math;
  }

  ngOnInit() {
    this.refreshStocks();
  }

  refreshStocks() {
    if (this.globals.pantry) {
      this.getStocks(this.globals.pantry.id);
    }
  }

  getStocks(pantryId: String) {
    this.stockService.getStocksPerPantry(pantryId)
      .subscribe(stocks => this.stocks = stocks);
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
      this.ingredientValue = 0;
      this.isSelectIngredient = false;
    });
  }
}
