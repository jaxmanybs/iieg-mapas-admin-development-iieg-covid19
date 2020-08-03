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
    active_tot_mun;
    date_covid;
    date_covid7;
    date_covid14;

    dateParamMap;
    cvegeo;
    //para defacumedades charbar2020
    pob_sex_hm_2020 = [];


    mensajeVegeta: string;

    parametro

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
            
        // console.log('dashboard');

        this._route.params.forEach(params =>{

            // this.getDataToLoadCharts(params);


            this.parametro = params.date
            // console.log('this.parametro');
            // console.log(this.parametro);
            

            var date_now = new Date(params.date);

            var date_now = new Date(params.date);
            var date_now7 = new Date(params.date);
            var date_now14 = new Date(params.date);
    
    
            // date_now7.setDate(date_now.getDate())
            date_now7.setDate(date_now.getDate()-7)
            date_now14.setDate(date_now.getDate()-14)
            // console.log('date_now');
            // console.log(date_now);
            // console.log(date_now7);
            // console.log(date_now14);
            
    
            this.date_covid   = formatDate(date_now,'yyyyMMdd', 'en-US');
            this.date_covid7  = formatDate(date_now7,'yyyyMMdd', 'en-US');
            this.date_covid14 = formatDate(date_now14,'yyyyMMdd', 'en-US');

            this.getAllActives(this.date_covid, this.date_covid7, this.date_covid14)

            // this._requestService.getActives(this.date_covid).subscribe(data => {
            //     data.features.forEach(feature => {
            //         this.dataProperties = feature.properties;
                    
            //         this._requestService.getActives7(this.date_covid7).subscribe(data => {
            //             data.features.forEach(feature => {
            //                 this.dataProperties7 = feature.properties;
                            
            //                 this._requestService.getActives14(this.date_covid14).subscribe(data => {
            //                     data.features.forEach(feature => {
            //                         this.dataProperties14 = feature.properties;
                                    
            //                         this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
            //                     })
            //                 })
            //             })
            //         })
            //     })
            // })

        })
    }

    ngOnInit() {}

    async getAllActives(date_covid, date_covid7, date_covid14){

        // console.log('date_covid, date_covid7, date_covid14');
        // console.log(date_covid, date_covid7, date_covid14);
        
        
        await this._requestService.getActives(date_covid).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties = feature.properties;
            })
        })
                
        await this._requestService.getActives7(date_covid7).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties7 = feature.properties;
                
            })
        })
                
        await this._requestService.getActives14(date_covid14).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties14 = feature.properties;
                
                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                
            })
        })
        
    }

    getDataToLoadCharts(params){
        // console.log('getDataToLoadCharts(params)');
        
        var date_now = new Date(params.date);
        var date_now7 = new Date(params.date);
        var date_now14 = new Date(params.date);


        // date_now7.setDate(date_now.getDate())
        date_now7.setDate(date_now.getDate()-7)
        date_now14.setDate(date_now.getDate()-14)
        // console.log('date_now');
        // console.log(date_now);
        // console.log(date_now7);
        // console.log(date_now14);
        

        this.date_covid   = formatDate(date_now,'yyyyMMdd', 'en-US');
        this.date_covid7  = formatDate(date_now7,'yyyyMMdd', 'en-US');
        this.date_covid14 = formatDate(date_now14,'yyyyMMdd', 'en-US');
        
        // console.log(this.date_covid);
        // console.log(this.date_covid7);
        // console.log(this.date_covid14);
        
        this._requestService.getActives(this.date_covid).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties = feature.properties;
                
                this._requestService.getActives7(this.date_covid7).subscribe(data => {
                    data.features.forEach(feature => {
                        this.dataProperties7 = feature.properties;
                        
                        this._requestService.getActives14(this.date_covid14).subscribe(data => {
                            data.features.forEach(feature => {
                                this.dataProperties14 = feature.properties;                                
                                
                                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                            })
                        })
                    })
                })
            })
        })
    }

    getDataMap2(params){
        // this.dateParamMap = dateParam;
        // console.log('getDataMap2(params)');
        // console.log(params);

        var re = /Z/gi;
        var str = params.date_now;
        var date_covid = str.replace(re, "");

        re = /-/gi; 
        str = date_covid;
        date_covid = str.replace(re, ", ");

        // console.log('date_covid');
        // console.log(date_covid);
        

        var date_now = new Date(date_covid);
        var date_now7 = new Date(date_covid);
        var date_now14 = new Date(date_covid);

        // console.log('date_now.getDate()');
        // console.log(date_now.getDate());

        date_now7.setDate(date_now.getDate()-7)
        date_now14.setDate(date_now.getDate()-14)
        // console.log('date_now');
        // console.log(date_now);
        // console.log(date_now7);
        // console.log(date_now14);
        

        this.date_covid   = formatDate(date_now,'yyyyMMdd', 'en-US');
        this.date_covid7  = formatDate(date_now7,'yyyyMMdd', 'en-US');
        this.date_covid14 = formatDate(date_now14,'yyyyMMdd', 'en-US');

        // console.log('this.date_covid');
        // console.log(this.date_covid);
        // console.log(this.date_covid7);
        // console.log(this.date_covid14);
        


        // var re = /Z/gi;
        // var str = params.date_now;
        // this.date_covid = str.replace(re, "");

        // re = /-/gi; 
        // str = this.date_covid;
        // this.date_covid = str.replace(re, "");

        this.cvegeo = params.cvegeo
        // console.log('cvegeo');
        // console.log(this.cvegeo);


        
        // var viewparams = params.

        this._requestService.getActivesMun(this.date_covid, this.cvegeo).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties = feature.properties;
                // console.log('feature -- getDataMap2(params)');
                // console.log(feature);
                this._requestService.getActives7Mun(this.date_covid7, this.cvegeo).subscribe(data => {
                    data.features.forEach(feature => {
                        this.dataProperties7 = feature.properties;
                        
                        this._requestService.getActives14Mun(this.date_covid14, this.cvegeo).subscribe(data => {
                            data.features.forEach(feature => {
                                this.dataProperties14 = feature.properties;
                                
                                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                            })
                        })
                    })
                })
            })
        })
        // this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
        
        // this.getDataToLoadCharts(params);
        
    }

    enviarMensaje(mensajeGoku) {
        this._requestService.enviar(mensajeGoku);
    }

    verMensaje() {
        this._requestService.bulma$.pipe(take(1)).
        subscribe(mensaje => this.mensajeVegeta = mensaje);
    }

    loadCharts(dataProperties, dataProperties7, dataProperties14){

        // console.log('loadCharts(dataProperties, dataProperties7, dataProperties14)');
        // console.log(dataProperties);
        // console.log(dataProperties7);
        // console.log(dataProperties14);


        var date_covid_graf
        var date_covid_graf7
        var date_covid_graf14
        
        this.municipio = dataProperties.nombre
        this.active_tot_mun = dataProperties.activos

        var re = /Z/gi;
        var str = dataProperties.date_now;
        date_covid_graf = str.replace(re, "");

        re = /-/gi; 
        str = date_covid_graf;
        date_covid_graf = str.replace(re, ", ");

        var date = new Date(date_covid_graf);
        var date7 = new Date(date_covid_graf);
        var date14 = new Date(date_covid_graf);

        date7.setDate(date14.getDate()-7)
        date14.setDate(date14.getDate()-14)

        // console.log('date');
        // console.log(date);
        // console.log(date7);
        // console.log(date14);
        

        date_covid_graf = formatDate(date,'dd-MM-yyyy', 'en-US')
        date_covid_graf7 = formatDate(date7,'dd-MM-yyyy', 'en-US')
        date_covid_graf14 = formatDate(date14,'dd-MM-yyyy', 'en-US')

        // console.log('date_covid_graf');
        // console.log(date_covid_graf);
        // console.log(date_covid_graf7);
        // console.log(date_covid_graf14);
        
        this.lineChartLabels = [date_covid_graf14, date_covid_graf7, date_covid_graf];

        
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
