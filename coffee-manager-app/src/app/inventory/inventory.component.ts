import { Component, OnInit, Inject } from '@angular/core';
import { Pantry } from '../models/pantry.model';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock.model';
import { Globals } from '../globals';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  stocks: Array<Stock>;

  Math: any;
  public barChartType = 'bar';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  public barChartLabels: Array<string>;
  public barChartData: any[] = [
    { data: [],
      label: 'Unit/s'}
  ];
  public barChartColors: Array<any> = [ {
    backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2']
  }];

  constructor(
    private globals: Globals,
    private stockService: StockService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.Math = Math;
  }

  ngOnInit() {
    this.refreshStocks();
  }

  updateChart(pantry: Pantry): void {
    this.stockService.getStocksPerPantry(pantry.id)
      .subscribe(stocks => {
        this.stocks = stocks;
        const labels = this.stocks.map(a => a.ingredient.name);
        const data = this.stocks.map(a => a.value);
        this.barChartLabels = labels;
        this.barChartData.forEach((chart) => {
          chart.data = data;
        });
      });
  }

  refreshStocks() {
    if (this.globals.pantry) {
      this.getStocks(this.globals.pantry.id);
      this.updateChart(this.globals.pantry);
    }
  }

  getStocks(pantryId: String) {
    this.stockService.getStocksPerPantry(pantryId)
      .subscribe(stocks => this.stocks = stocks);
  }

  openAddStockDialog(): void {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      width: '250px',
      data: {
        stocks: this.stocks,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar('Add Stock Success!', 'Okay');
      this.updateChart(this.globals.pantry);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

export interface DialogData {
  stocks: Array<Stock>;
  selectedStock: Stock;
  value: number;
}

@Component({
  selector: 'app-add-stock-dialog-component',
  templateUrl: 'add-stock-dialog.html',
})
export class AddStockDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private stockService: StockService,
  ) {
  }

  updateStockValue(): void {
    const updatedStock: Stock = {
      id: this.data.selectedStock.id,
      pantryId: this.data.selectedStock.pantryId,
      ingredientId: this.data.selectedStock.ingredientId,
      value: this.data.selectedStock.value + (this.data.value * 15),
      ingredient: this.data.selectedStock.ingredient,
      pantry: this.data.selectedStock.pantry
    };

    this.stockService.updateStock(updatedStock)
      .subscribe();
  }

  onOkClick(): void {
    this.updateStockValue();
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
