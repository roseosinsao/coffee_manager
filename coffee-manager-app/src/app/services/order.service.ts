import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersURL = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  orderCoffee(coffee: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersURL, coffee);
  }

  getAllOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.ordersURL);
  }

  getOrdersPerPantry(pantryId: Guid): Observable<Array<Order>> {
    if (pantryId) {
      return this.http.get<Array<Order>>(`${this.ordersURL}/pantry/${pantryId}`);
    }
    return this.http.get<Array<Order>>(this.ordersURL);
  }
}
