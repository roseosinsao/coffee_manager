import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { OfficesService } from '../services/office.service';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Array<Order>;
  isSelectedOffice: Office;
  pantries: Array<Pantry>;
  offices: Array<Office>;
  stocks: Array<Stock>;
  stockChart: Chart;

  constructor(
    private orderService: OrderService,
    private officeService: OfficesService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.getOffices();
  }

  getOffices(): void {
    this.officeService.getOffices()
    .subscribe(offices => {
      this.offices = offices;
    });
  }

  onChangeOffice(office: Office): void {
    this.isSelectedOffice = office;
    this.pantries = office.pantry;
  }

  onChangePantry(pantry: Pantry): void {
    this.getHistoryOrders(pantry);
    this.getDrinkPerCategory(pantry);
  }

  getHistoryOrders(pantry: Pantry): void {
    this.orderService.getOrdersPerPantry(pantry.id)
    .subscribe((orders) => {
      this.orders = orders;
    });
  }

  getDrinkPerCategory(pantry: Pantry): void {
    this.stockService.getStocksPerPantry(pantry.id)
    .subscribe((stocks) => {
      this.stocks = stocks;
      this.showChart();
    });
  }

  showChart() {
    const labels = this.stocks.map(a => a.ingredient.name);
    const data = this.stocks.map(a => a.value);
    const canvas: any = document.getElementById('stockBarChart');
    const ctx: CanvasRenderingContext2DSettings = canvas.getContext('2d');
    this.stockChart = new Chart(ctx, {
      type: 'bar',
      data: {
      labels: labels, // your labels array
      datasets: [
        {
          label: '# user count',
          data: data, // your data array
          backgroundColor: [
           'rgba(54, 162, 235, 1)',
           'rgba(255, 99, 132, 1)',
           'rgba(255, 206, 86, 1)'

          ],
          fill: true,
          lineTension: 0.2,
          borderWidth: 1
        }
      ]
      },
      options: {
        responsive: true,
        title: {
        text: 'Distribution of Drinks Ordered',
        display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  console.log(this.stockChart);
  }
}
