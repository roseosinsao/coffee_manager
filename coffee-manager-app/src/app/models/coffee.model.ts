import { CoffeeIngredient } from './coffee-ingredient.model';
import { Guid } from 'guid';

export class Coffee {
  id: Guid;
  name: Guid;
  coffeeIngredient: CoffeeIngredient;
}
