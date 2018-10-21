import { Pantry } from './pantry.model';
import { Guid } from 'guid';

export class Office {
  id: Guid;
  name: string;
  pantry: Array<Pantry>;
}
