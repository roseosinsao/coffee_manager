import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../services/office.service';
import { Globals } from '../globals';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { PantryService } from '../services/pantry.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  offices: Array<Office>;
  pantries: Array<Pantry>;
  selectedOffice: Office;
  selectedPantry: Pantry;

  constructor(
    private globals: Globals,
    private officeService: OfficesService,
    private pantryService: PantryService,
  ) { }

  ngOnInit() {
    this.getOffices();
  }


  getOffices(): void {
    this.officeService.getOffices()
      .subscribe(offices => this.offices = offices);
  }

  onChangeOffice(office: Office): void {
    this.globals.office = office;
    this.pantryService.getPantries(this.globals.office.id)
      .subscribe(pantries => this.pantries = pantries);
  }

  onChangePantry(pantry: Pantry): void {
    this.globals.pantry = pantry;
  }
}
