import { Ingredient } from './ingredient.model';
import { Guid } from 'guid';

export class CoffeeIngredient {
  coffeeId: Guid;
  ingredientId: Guid;
  valueCost: Guid;
  ingredient: Ingredient;
}
