import { Injectable } from '@angular/core';
import { Office } from './models/office.model';
import { Pantry } from './models/pantry.model';

@Injectable()
export class Globals {
  office: Office;
  pantry: Pantry;
  name: string;
}
