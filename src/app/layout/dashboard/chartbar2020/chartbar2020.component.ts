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
    @Input() cvegeoDash: string;
    @Input() layerDash: string;
    tot_edades
    

    
    dateParamMap;
    date_covid_acum


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
        backgroundColor: ['#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9'],
        }
    ];
    // grafica 2 bar ng2

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService ) {

            // 

            this._route.params.forEach(params => {
                
                // console.log('constructor');
                // console.log('this.cvegeoDash');
                // console.log(this.cvegeoDash);

                var date_now = new Date(params.date.split('-')[0]);
                var layer = this._router.url.split('-')[1];

                
                this.date_covid_acum   = formatDate(date_now,'yyyyMMdd', 'en-US');
      
                // console.log('this.cvegeoDash');
                // console.log(this.cvegeoDash);
 
                this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
                    data.features.forEach(feature => {
                        
                        // console.log(feature.properties);
                        this.graficaChartsJs(feature.properties)
                        
                    })
                })
            })
        }

    ngOnChanges(changes: SimpleChanges): void {


        // console.log('this.cvegeoDash');
        // console.log(this.cvegeoDash);
        // console.log(this.layer);

        var layer = this._router.url.split('-')[1];
        // console.log('layer');
        // console.log(layer);
        


        // switch(layer) {
        //     case 'act': { 
        //         console.log('Activos');
        //         layer = 'activosacumedades'
        //         break;  
        //       } 
        //     case 'acu': { 
        //         console.log('Acumulados');
        //         layer = 'postivosacumedades'
        //         break; 
        //     }
        //     case 'def': {
        //         console.log('Defunciones');

        //         break; 
        //     } 
        //     case 'nac': {
        //         console.log('Activos Nacionales');

        //         break; 
        //     }
        //     default: { 
        //         console.log('Activos x Municipio');

        //         break; 
        //     } 
            
        // }

        this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
            data.features.forEach(feature => {
                
                // console.log(feature.properties);
                this.graficaChartsJs(feature.properties)
                
            })
        })
    }


    graficaChartsJs(json){
        this.tot_edades = json.activos;
        // console.log('json');
        // console.log(json);
        
        this.barChartData  = [
            { data: [json.menor10, json.e1019, json.e2029, json.e3039, json.e4049, json.e5059, json.e6069, json.e7079, json.e8089, json.e9099, json.emayor100], label : 'Total acumulados' }
        ];
    }

}