import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { Office } from '../models/office.model';
import { Pantry } from '../models/pantry.model';
import { Stock } from '../models/stock.model';
import { Chart } from 'chart.js';
import { Globals } from '../globals';
import { OrderPieChartModel } from '../models/order-chart.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSelectedOffice: Office;
  pantries: Array<Pantry>;
  offices: Array<Office>;
  stocks: Array<Stock>;
  stockChart: Chart;
  chart: Array<OrderPieChartModel>;
  loadChart = false;
  dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['name', 'order', 'quantity', 'orderDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public pieChartLabels: Array<string> = ['Sweet Latte', 'Flat White', 'Double Americano'];
  public pieChartData:  Array<number> = [];
  public pieChartType = 'pie';
  public pieChartColors: Array<any> = [ {
      backgroundColor:  ['#FF7360', '#6FC8CE', '#FAFFF2']
    }];

  constructor(
    private orderService: OrderService,
    private globals: Globals
  ) { }

  ngOnInit() {
    if (this.globals.pantry) {
      this.loadDashboard();
      this.loadChart = true;
    }
  }

  loadDashboard(): void {
    this.getHistoryOrders(this.globals.pantry);
    this.buildPieChart();
  }

  getHistoryOrders(pantry: Pantry): void {
    this.orderService.getOrdersPerPantry(pantry.id)
    .subscribe((orders) => {
      this.dataSource = new MatTableDataSource<Order>(orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  buildPieChart(): void {
    this.orderService.getPieChart(this.globals.pantry.id)
    .subscribe((chart) => {
      this.chart = chart;
      const labels = this.chart.map(a => a.coffeeName);
      const data = this.chart.map(a => a.total);
      this.pieChartLabels = labels;
      this.pieChartData = data;
      this.loadChart = true;
    });
  }
}
