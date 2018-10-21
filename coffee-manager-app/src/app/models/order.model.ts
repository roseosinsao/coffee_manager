import { Guid } from 'guid';
import { Coffee } from './coffee.model';

export class Order {
  id: Guid;
  name?: string;
  coffeeId: Guid;
  quantity: number;
  pantryId: Guid;
  orderDate: Date;
}
