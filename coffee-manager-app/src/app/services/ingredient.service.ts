import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsURL = 'http://localhost:5000/api/ingredients';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Array<Ingredient>> {
    return this.http.get<Array<Ingredient>>(this.ingredientsURL);
  }
}
