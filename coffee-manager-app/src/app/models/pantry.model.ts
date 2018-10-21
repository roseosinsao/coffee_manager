import { Office } from './office.model';
import { Guid } from 'guid';

export class Pantry {
  id: Guid;
  name: string;
  officeId: Guid;
}
