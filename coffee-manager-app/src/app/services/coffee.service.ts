import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private coffeesURL = 'http://localhost:5000/api/coffees';

  constructor(private http: HttpClient) { }

  getCoffees(): Observable<Array<Coffee>> {
    return this.http.get<Array<Coffee>>(this.coffeesURL);
  }
}
