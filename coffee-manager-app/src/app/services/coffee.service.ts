import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  getCoffees(): Observable<Array<Coffee>> {
    return this.http.get<Array<Coffee>>(`${environment.apiUrl}coffees`);
  }
}
