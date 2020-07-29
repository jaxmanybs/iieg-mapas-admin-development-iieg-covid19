import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router'

import { DatePipe } from '@angular/common';

import { RequestService } from '../services/request.service';
import { take } from 'rxjs/operators';

// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
    // graficas
    dataProperties;
    dataProperties7;
    dataProperties14;
    municipio: string;
    active_tot_mun: number;

    dateParamMap;
    //para defacumedades charbar2020
    pob_sex_hm_2020 = [];


    mensajeVegeta: string;

    dataHombres;
    data1;
    data2;
    data3;
    urlToday: string;
    urlSeven: string;
    urlFourteen: string;
    urlParams1 = 'https://indices.jalisco.gob.mx/geoserver/covid19/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=activosxmpiograf&LAYERS=activosxmpiograf&STYLES=covid19%3Aactivosxmpio&VIEWPARAMS=aaaammdd:'
    urlParams2 = '&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=-11520273.173679635%2C2337414.386499927%2C-11495137.607241083%2C2362549.952938478'
    viewparams = ['20200716','20200715','20200714'];
    dataAll = [];

    mySub = new Subscription()
    // grafica line ng2
    public lineChartData: ChartDataSets[] = [
        { data: [], label: 'Mujeres' },
        { data: [], label: 'Hombres' },
        { data: [], label: 'NE' }
    ];

    public lineChartLabels: Label[] = ['14 días atrás', '7 días atrás', 'Hoy'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{ ticks: {
            fontColor: 'green',
        }}],
        yAxes: [{ ticks: {
                fontColor: 'red',
                beginAtZero: true
            }}]
            // {
            //   id: 'y-axis-0',
            //   position: 'left',
            // }
            // ,
            // {
            //   id: 'y-axis-1',
            //   position: 'right',
            //   gridLines: {
            //     color: 'rgba(255,0,0,0.3)',
            //   },
            //   ticks: {
            //     fontColor: 'red',
            //   }
            // }
        // ]
        },
        annotation: {
        annotations: [
            {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'green',
            borderWidth: 2,
            label: {
                enabled: true,
                fontColor: 'orange',
                content: 'LineAnno'
            }
            },
        ],
        },
    };

    public lineChartColors: Color[] = [
        { // mujeres
        backgroundColor: '#cb3788c5',
        borderColor: '#C9388C',
        pointBackgroundColor: '#C9388C',
        pointBorderColor: '#7',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#C9388C'
        },
        { // hombres
        backgroundColor: '#10e7ff94',
        borderColor: '#05ADBF',
        pointBackgroundColor: '#05ADBF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#05ADBF'
        },
        { // ne
        backgroundColor: '#c0c0c083',
        borderColor: '#c0c0c0',
        pointBackgroundColor: '#c0c0c0',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#c0c0c0'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    // public lineChartColors = [
    //   {
    //     backgroundColor: ['#C9388C', '#C9388C', '#C9388C'],
    //   },
    //   {
    //     backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF'],
    //   },
    //   {
    //     backgroundColor: ['#c0c0c0', '#c0c0c0', '#c0c0c0'],
    //   }
    // ];
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
    public pieChartLabels: Label[] = ['Mujeres', 'Hombres', 'Ne'];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public pieChartColors = [
        {
        backgroundColor: ['#C9388C', '#05ADBF', '#c0c0c0'],
        },
    ];
    // pie

    mensaje: string = 'Navbar!';
    myData: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe) {

        this._route.params.forEach(params =>{

            var date_now = new Date(params.date);

            var date_covid   = formatDate((date_now.getMonth()+1).toString()+ '/'+(date_now.getDate()).toString()+ '/'+date_now.getFullYear().toString(),'yyyyMMdd', 'en-US');
            var date_covid7  = formatDate((date_now.getMonth()+1).toString()+ '/'+(date_now.getDate()-7).toString()+ '/'+date_now.getFullYear().toString(),'yyyyMMdd', 'en-US');
            var date_covid14 = formatDate((date_now.getMonth()+1).toString()+ '/'+(date_now.getDate()-14).toString()+ '/'+date_now.getFullYear().toString(),'yyyyMMdd', 'en-US');
            
            this._requestService.getActives(date_covid).subscribe(data => {
                data.features.forEach(feature => {
                    this.dataProperties = feature.properties;
                    
                    this._requestService.getActives7(date_covid7).subscribe(data => {
                        data.features.forEach(feature => {
                            this.dataProperties7 = feature.properties;
                            
                            this._requestService.getActives14(date_covid14).subscribe(data => {
                                data.features.forEach(feature => {
                                    this.dataProperties14 = feature.properties;
                                    
                                    this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                })
                            })
                        })
                    })
                })
            })

        })
    }

    ngOnInit() {}

    getDataMap2(dateParam){
        this.dateParamMap = dateParam;
    }

    enviarMensaje(mensajeGoku) {
        this._requestService.enviar(mensajeGoku);
    }

    verMensaje() {
        this._requestService.bulma$.pipe(take(1)).
        subscribe(mensaje => this.mensajeVegeta = mensaje);
    }

    loadCharts(dataProperties: any, dataProperties7, dataProperties14){

        this.municipio = dataProperties.nombre
        this.active_tot_mun = dataProperties.activos
        
        this.pieChartData = [this.dataProperties.mujeres, dataProperties.hombres, dataProperties.ne ];

        this.lineChartData  = [
            { data: [dataProperties14.mujeres, dataProperties7.mujeres, dataProperties.mujeres], label: 'Mujeres' },
            { data: [dataProperties14.hombres, dataProperties7.hombres, dataProperties.hombres], label: 'Hombres' },
            { data: [dataProperties14.ne, dataProperties7.ne, dataProperties.ne], label: 'Ne' }
        ];
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
