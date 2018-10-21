import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocksURL = 'http://localhost:5000/api/stocks';

  constructor(private http: HttpClient) { }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(this.stocksURL, stock);
  }

  getStocksPerPantry(pantryId: String): Observable<Array<Stock>> {
    if (pantryId) {
      return this.http.get<Array<Stock>>(`${this.stocksURL}/pantry/${pantryId}`);
    }
    return this.http.get<Array<Stock>>(this.stocksURL);
  }
}
