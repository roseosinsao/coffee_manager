import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';
import { Pantry } from '../models/pantry.model';
import { Guid } from 'guid-typescript';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  constructor(private http: HttpClient) { }

  getPantries(officeId: Guid): Observable<Array<Pantry>> {
    if (officeId) {
      return this.http.get<Array<Pantry>>(`${environment.apiUrl}pantries/office/${officeId}`);
    }
    return this.http.get<Array<Pantry>>(`${environment.apiUrl}pantries`);
  }

  addPantry(model: Pantry): Observable<Pantry> {
    return this.http.post<Pantry>(`${environment.apiUrl}pantries`, model);
  }
}
