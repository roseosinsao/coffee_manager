import { Injectable } from '@angular/core';
import { Office } from './models/office.model';
import { Pantry } from './models/pantry.model';
import { Stock } from './models/stock.model';

@Injectable()
export class Globals {
  office: Office;
  pantry: Pantry;
  stocks: Array<Stock>;
  name = '';
}
