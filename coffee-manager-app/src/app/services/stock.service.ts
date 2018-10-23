import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${environment.apiUrl}stocks`, stock);
  }

  getStocksPerPantry(pantryId: String): Observable<Array<Stock>> {
    if (pantryId) {
      return this.http.get<Array<Stock>>(`${environment.apiUrl}stocks/pantry/${pantryId}`);
    }
    return this.http.get<Array<Stock>>(`${environment.apiUrl}stocks`);
  }
}
