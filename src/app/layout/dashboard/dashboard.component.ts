import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  municipio: string;
  pob_sex_hm_2020 = [];
  pob_sex_tot_2020: number;

  // grafica bar ng2

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
  // grafica bar ng2
  
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Mujeres', 'Hombres'];
  public pieChartData: number[] = [727865, 705495];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['#C9388C', '#05ADBF'],
    },
  ];
  // pie
  
  constructor() {
  }

  ngOnInit() {
    this.loadCharts()
  }

  recibirDatos(event){

    this.municipio = event.nombre;
    this.graficaChartsJs(event);
    this.pob_sex_tot_2020 = event.pob_tot__5;

    this.pob_sex_hm_2020 = [];
    this.pob_sex_hm_2020.push(event.pob_m_2020, event.pob_h_2020);

  }

  loadCharts(){
    var url = 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=iieg%3Aproymunsex1530&LAYERS=iieg%3Aproymunsex1530&STYLES=mpiospobsex&TILED=true&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=-11564479.571985418%2C2324756.575924868%2C-11477136.160074158%2C2412099.9878361295';
    
    fetch(url).then(data => {
      return data.json()
    }).then(json => {

      try {
        
        this.recibirDatos(json.features[0].properties);
        
      } catch (error) {
      }

    return null;
    });
  }

  graficaChartsJs(json){    

    this.barChartLabels = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  
    this.barChartData  = [
      { data: [json.pob_m_2015, json.pob_m_2016, json.pob_m_2017, json.pob_m_2018, json.pob_m_2019, json.pob_m_2020, json.pob_m_2021, json.pob_m_2022, json.pob_m_2023, json.pob_m_2024, json.pob_m_2025, json.pob_m_2026, json.pob_m_2027, json.pob_m_2028, json.pob_m_2029, json.pob_m_2030], label: 'Mujeres' },
      { data: [json.pob_h_2015, json.pob_h_2016, json.pob_h_2017, json.pob_h_2018, json.pob_h_2019, json.pob_h_2020, json.pob_h_2021, json.pob_h_2022, json.pob_h_2023, json.pob_h_2024, json.pob_h_2025, json.pob_h_2026, json.pob_h_2027, json.pob_h_2028, json.pob_h_2029, json.pob_h_2030], label: 'Hombres' }
    ];

    this.pieChartData = [json.pob_m_2020, json.pob_h_2020];
    
  }
  // ng2 chartjs
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  // ng2 chartjs
}
