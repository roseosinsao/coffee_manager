import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Array<Ingredient>> {
    return this.http.get<Array<Ingredient>>(`${environment.apiUrl}ingredients`);
  }
}
