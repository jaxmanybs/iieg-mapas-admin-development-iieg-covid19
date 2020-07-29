import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-chartbar2020',
  templateUrl: './chartbar2020.component.html',
  styleUrls: ['./chartbar2020.component.scss']
})
export class Chartbar2020Component implements OnChanges  {

    // @Input() pob_sex_hm_2020: string;
    @Input() dateParamMapDash: string;
    tot_def

    
    dateParamMap;


    // grafica 2 bar ng2

    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datalabels: {
              anchor: 'end',
              align: 'end',
            }
          }
    };
    public barChartLabels: Label[] = ['Menor de 10', '10 a 19', '20 a 29', '30 a 39', '40 a 49', '50 a 59', '60 a 69', '70 a 79', '80 a 89', '90 a 99', '100 o más'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartDataSets[] = [{}];
    public barChartColors = [
        {
        backgroundColor: ['#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9','#778DA9'],
        }
    ];
    // grafica 2 bar ng2

    constructor(
        private _route: ActivatedRoute,
        private _requestService: RequestService ) {
            this._route.params.forEach(params => {
      
                var date_now = new Date(params.date);
                var date_covid_defacum   = formatDate((date_now.getMonth()+1).toString()+ '/'+(date_now.getDate()).toString()+ '/'+date_now.getFullYear().toString(),'yyyyMMdd', 'en-US');
      
                this._requestService.defAcumEdades(date_covid_defacum).subscribe(data => {
                    data.features.forEach(feature => {
                        this.graficaChartsJs(feature.properties)
                    })
                })
            })
        }

    ngOnChanges(changes: SimpleChanges): void {}


    graficaChartsJs(json){
        this.tot_def = json.defunciones;
        this.barChartData  = [
            { data: [json.menor10, json.e1019, json.e2029, json.e3039, json.e4049, json.e5059, json.e6069, json.e7079, json.e8089, json.e9099, json.emayor100], label : 'Total defunciones' }
        ];
    }

}