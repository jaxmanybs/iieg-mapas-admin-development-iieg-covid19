import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chartbar2020',
  templateUrl: './chartbar2020.component.html',
  styleUrls: ['./chartbar2020.component.scss']
})
export class Chartbar2020Component implements OnChanges  {

  @Input() pob_sex_hm_2020: string;

  // grafica 2 bar ng2

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  };

  public barChartLabels: Label[] = ['2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [727865], label: 'Mujeres' },
    { data: [705495], label: 'Hombres' }
  ];
  public barChartColors = [
    {
      backgroundColor: ['#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C'],
    },
    {
      backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF'],
    }
  ];
  // grafica 2 bar ng2

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.graficaChartsJs(this.pob_sex_hm_2020)
    
  }

  graficaChartsJs(json){
    this.barChartData  = [
      { data: [json[0]], label: 'Mujeres' },
      { data: [json[1]], label: 'Hombres' }
    ];
  }

}
