import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../services/office.service';
import { PantryService } from '../services/pantry.service';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { Guid } from 'guid-typescript';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../models/ingredient.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  offices: Array<Office>;
  pantries: Array<Pantry>;
  selectedOffice: Office;
  officeName: string;
  pantryName: string;
  ingredients: Array<Ingredient>;
  sugar: Ingredient;
  coffeebean: Ingredient;
  milk: Ingredient;

  constructor(
    private officeService: OfficesService,
    private pantryService: PantryService,
    private ingredientService: IngredientService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getOffices();
    this.getIngredients();
  }

  getOffices(): void {
    this.officeService.getOffices()
    .subscribe(offices => {
      this.offices = offices;
    });
  }

  setPantries(office: Office): void {
    this.selectedOffice = office;
    this.pantries = this.selectedOffice.pantry;
  }

  getPantries(): void {
    this.pantryService.getPantries(this.selectedOffice.id)
      .subscribe(pantries => {
        this.pantries = pantries;
      });
  }

  createOffice() {
    const office: Office = {
      id: Guid.create().toString(),
      name: this.officeName,
      pantry: []
    };

    this.officeService.createOffice(office)
    .subscribe(() => {
      this.officeName = '';
      this.getOffices();
      this.openSnackBar('Add Office Success!', 'Okay');
    });
  }

  getIngredients(): void {
    this.ingredientService.getIngredients()
    .subscribe((ingredients) => {
      this.ingredients = ingredients;
      this.setIngredients();
    });
  }

  setIngredients(): void {
    this.ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name === 'Coffee beans') {
        this.coffeebean = ingredient;
      } else if (ingredient.name === 'Sugar') {
        this.sugar = ingredient;
      } else if (ingredient.name === 'Milk') {
        this.milk = ingredient;
      }
    });
  }

  addPantry() {
    const pantry: Pantry = {
      id: Guid.create().toString(),
      name: this.pantryName,
      officeId: this.selectedOffice.id,
    };

    this.pantryService.addPantry(pantry)
      .subscribe(() => {
        this.pantryName = '';
        this.getOffices();
        this.getPantries();
        this.openSnackBar('Add Pantry Success!', 'Okay');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
