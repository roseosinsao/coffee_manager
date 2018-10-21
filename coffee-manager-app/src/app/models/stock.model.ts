import { Guid } from 'guid';
import { Ingredient } from './ingredient.model';
import { Pantry } from './pantry.model';

export class Stock {
  id: Guid;
  pantryId: Guid;
  ingredientId: Guid;
  value: number;
  ingredient: Ingredient;
  pantry: Pantry;
}
