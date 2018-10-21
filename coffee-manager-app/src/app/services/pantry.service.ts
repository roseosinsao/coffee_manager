import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';
import { Pantry } from '../models/pantry.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  private pantriesURL = 'http://localhost:5000/api/pantries';

  constructor(private http: HttpClient) { }

  getPantries(officeId: Guid): Observable<Array<Pantry>> {
    if (officeId) {
      return this.http.get<Array<Pantry>>(`${this.pantriesURL}/office/${officeId}`);
    }
    return this.http.get<Array<Pantry>>(this.pantriesURL);
  }

  addPantry(model: Pantry): Observable<Pantry> {
    return this.http.post<Pantry>(this.pantriesURL, model);
  }
}
