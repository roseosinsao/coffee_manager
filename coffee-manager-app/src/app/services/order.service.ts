import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Guid } from 'guid-typescript';
import { OrderPieChartModel } from '../models/order-chart.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  orderCoffee(coffee: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}orders`, coffee);
  }

  getAllOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${environment.apiUrl}orders`);
  }

  getOrdersPerPantry(pantryId: Guid): Observable<Array<Order>> {
    if (pantryId) {
      return this.http.get<Array<Order>>(`${environment.apiUrl}orders/pantry/${pantryId}`);
    }
    return this.http.get<Array<Order>>(`${environment.apiUrl}orders`);
  }

  getPieChart(pantryId: Guid): Observable<Array<OrderPieChartModel>> {
    if (pantryId) {
      return this.http.get<Array<OrderPieChartModel>>(`${environment.apiUrl}orders/chart/${pantryId}`);
    }
  }
}
