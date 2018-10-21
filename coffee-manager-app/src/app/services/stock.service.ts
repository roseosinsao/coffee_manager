import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';
import { Order } from '../models/order.model';
import { Stock } from '../models/stock.model';
import { Guid } from 'guid-typescript';
import { StockWebModel } from '../models/stocks-request.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocksURL = 'http://localhost:5000/api/stocks';

  constructor(private http: HttpClient) { }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(this.stocksURL, stock);
  }

  addNewStocks(stocks: StockWebModel): Observable<StockWebModel> {
    return this.http.post<StockWebModel>(`${this.stocksURL}/fill`, stocks);
  }

  getOrdersPerPantry(pantryId: Guid): Observable<Array<Stock>> {
    if (pantryId) {
      return this.http.get<Array<Stock>>(`${this.stocksURL}/pantry/${pantryId}`);
    }
    return this.http.get<Array<Stock>>(this.stocksURL);
  }
}
