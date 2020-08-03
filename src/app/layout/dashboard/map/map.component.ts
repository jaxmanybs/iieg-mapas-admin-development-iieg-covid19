import { environment } from './../../../../environments/environment';
import { Component, OnInit, KeyValueDiffers, Output, Input, EventEmitter, OnChanges, SimpleChanges, LOCALE_ID} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { formatDate } from '@angular/common';

import { Router, ActivatedRoute, Params } from '@angular/router'

import { RequestService } from '../../services/request.service';
import { take } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls, FullScreen} from 'ol/control';
import 'ol/ol.css';

import 'rxjs/add/operator/map';
import { Logger } from '@syncfusion/ej2-angular-grids';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { url } from 'inspector';

declare var ol;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ { provide: LOCALE_ID, useValue: 'en-GB' } ],
})
export class MapComponent implements OnChanges {

  public mensajeGoku: string;

  
  dateParam;
  parametro

  ////// COVID-19 ///////
  map: any
  // VIEW_PARAMS = 'aaaammdd:';
  // VIEW_PARAMS = "aaaammdd:20200719"
  VIEW_PARAMS;
  @Input() date_siderbar;
  date_now;
  date_7;
  date_14;
  @Output() desde_el_hijo = new EventEmitter();


  public date_now_covid_service;

  // petiiones mediante CQL_FILTER¿
  // 14039 cvegeo GDL
  //  http://10.13.23.32:8080/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:defacumedades&outputFormat=application/json

  jsonMap: any;

  url_dateNow: any;
  date_Now_covid = new Date();

  panelOpenState = false;

  @Input()
  cveSubsector: number = 311

  @Input()
  empleoyees: string = ""

  myLayers = [];
  view
  overlay
  
  
  myStyles = [
    `${environment.workspaceCovid}:activosxmpio`,
    `${environment.workspaceCovid}:defsxmpio`,
  ]

  geoserverLayers = [
    "activosxmpiograf",
    "defuncionesxmpio"
  ]

  osmLayer: any
  activosxmpio: any
  defuncionesxmpio: any

  urlIieg = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/wms?' }`
  urlCovid = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`
  // urlGraphics = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`
  owsGraphics = `${ environment.wfsService + '&' + 
                environment.version + '&' + 
                environment.requestFeature + '&' + 
                environment.typeNameFechas + '&' + 
                environment.maxFeatures + '&' + 
                environment.outputJson}`
  urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`
  owsDate = `${ environment.wfsService + '&' + 
                environment.version + '&' + 
                environment.requestFeature + '&' + 
                environment.typeNameFechas + '&' + 
                environment.maxFeatures + '&' + 
                environment.outputJson}`

  //  END COVID-19
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
          ticks: {
            beginAtZero: true,
          }
      }]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors = [
    {
      backgroundColor: ['#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C'],
    },
    {
      backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF'],
    }
  ];

  public barChartData: ChartDataSets[] = [];

  mensaje: string = 'Map!';
  myData: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService,
    private miDatePipe: DatePipe
    ) {

      // this.createLayers()
      
      
    }
    // console.log(this._requestService.getFirstActivities());
    // var requestData = [];
    // var request = this._requestService.getData()


    // this._requestService.getData().subscribe(data => {
    //   data.features.forEach(feature => {
        // console.log('map-constructor');
    //   })
    // })
      
    // console.log('requestMap');
    // console.log(request);    
    // console.log('requestData');
    // console.log(requestData);
    
    // this.date_now = new Date(2020,6,19);
    // this.date_7 = new Date(2020,6,19);
    // this.date_14 = new Date(2020,6,19);

    // console.log(this.date_now);
    // console.log(this.date_7);
    // console.log(this.date_14);

    // this.date_7.setDate(this.date_now.getDate() - 7);
    // this.date_14.setDate(this.date_now.getDate() - 14);

    // console.log(this.date_now.getYear() );
    // console.log(this.date_7);
    // console.log(this.date_14);
    
    // this.VIEW_PARAMS = this.date_now;
    // this.VIEW_PARAMS = '20200719';

    // this.getDateNow()


    // this.jsonMap = { nombre: "Zapotiltic"}

  // }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log('this._requestService.getData() app-map');
    // this.date_now_covid_service = this._requestService.getData();
    // console.log('this.date_now_covid_service');
    // console.log(this.date_now_covid_service);
    // console.log('this.date_now_covid_service');
    // console.log('this._requestService.getData() app-map');

    // this.CQL_FILTER = ""
    // if(changes.cveSubsector != undefined && !changes.cveSubsector.firstChange){
    //   this.CQL_FILTER += "cve_subsec = " + changes.cveSubsector.currentValue
    // } else {
    //   this.CQL_FILTER += "cve_subsec = " + this.cveSubsector
    // }

    // if(changes.empleoyees != undefined) {
    //   if(changes.empleoyees.currentValue != "all"){
    //     this.CQL_FILTER += " AND empleo LIKE '" +  changes.empleoyees.currentValue + "%'" 
    //   }
    // }


    // var viewparams = this.activosxmpio.getSource().getParams().VIEWPARAMS;
    // this.VIEW_PARAMS = "20200709";
    // viewparams = this.VIEW_PARAMS;
    // this.activosxmpio.getSource().updateParams(viewparams);
  }

  ngOnInit() {
    
    this.createLayers()
    this._route.params.forEach(params =>{
      // console.log('params.date-ngOnIniti()');
      // console.log(typeof(params.date));
              var date_covid = new Date(params.date);
  
        this.parametro = params.date
  
        // console.log('params.date ngOnIniti()');
        // console.log(params.date);
        
        
        this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');
        // console.log('this.dateParam');
        // console.log(this.dateParam);
        
  
        var viewparams = this.activosxmpio.getSource().getParams();
        this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;
  
        viewparams.VIEWPARAMS = this.VIEW_PARAMS;
        this.activosxmpio.getSource().updateParams(viewparams);
  
        // this.desde_el_hijo.emit(this.dateParam);
    })

      // if(typeof(params.date) === undefined){
      //   console.log('if');


      //   this._requestService.getDateNow().subscribe(data => {
      //     data.features.forEach(feature => {

      //       console.log('feature.properties.date_now');
      //       console.log(feature.properties.date_now);
            
          
      //       var re = /Z/gi;
      //       var str = feature.properties.date_now;
      //       var date_now_covid = str.replace(re, "");

      //       re = /-/gi; 
      //       str = date_now_covid;
      //       date_now_covid = str.replace(re, "");

      //       // this.dateParam = date_now_covid

      //       console.log('date_now_covid');
      //       console.log(date_now_covid);

            // var date_covid = new Date(params.date);
  
            // this.parametro = params.date
      
            // console.log('params.date ngOnIniti()');
            // console.log(params.date);
            
            
            // this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');
            // console.log('this.dateParam');
            // console.log(this.dateParam);
            
      
            // var viewparams = this.activosxmpio.getSource().getParams();
            // this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;
      
            // viewparams.VIEWPARAMS = this.VIEW_PARAMS;
            // this.activosxmpio.getSource().updateParams(viewparams);

            // var viewparams = this.activosxmpio.getSource().getParams();
            // this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;
      
            // viewparams.VIEWPARAMS = this.VIEW_PARAMS;
            // this.activosxmpio.getSource().updateParams(viewparams);
            
            
            // this.maxDate = new Date(this.date_now_covid);
            // this.date = new FormControl(this.maxDate);

            // this.eventDatePicker = this.date_now_covid;
            // this.ngOnInit()

        //   })
        // })
        

        
      // }else{
        
      //   console.log('else');

      //         console.log(typeof(params.date));
        
        
        // var date_covid = new Date(params.date);
  
        // this.parametro = params.date
  
        // // console.log('params.date ngOnIniti()');
        // // console.log(params.date);
        
        
        // this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');
        // console.log('this.dateParam');
        // console.log(this.dateParam);
        
  
        // var viewparams = this.activosxmpio.getSource().getParams();
        // this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;
  
        // viewparams.VIEWPARAMS = this.VIEW_PARAMS;
        // this.activosxmpio.getSource().updateParams(viewparams);
  
        // this.desde_el_hijo.emit(this.dateParam);
  
    //   }
    // })

    // this._route.params.forEach(params =>{
      
    //   var date_covid = new Date(params.date);

    //   this.parametro = params.date

    //   // console.log('params.date ngOnIniti()');
    //   // console.log(params.date);
      
      
    //   this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');
    //   console.log('this.dateParam');
    //   console.log(this.dateParam);
      
 
    //   var viewparams = this.activosxmpio.getSource().getParams();
    //   this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;

    //   viewparams.VIEWPARAMS = this.VIEW_PARAMS;
    //   this.activosxmpio.getSource().updateParams(viewparams);

    //   // this.desde_el_hijo.emit(this.dateParam);

    // })
    this.createMap();

  }

  // redirigir(){
  //   // this._router.navigate(['/',"2020, 07, 29"]);
  //   console.log('redirigir()');
    
  //   this.ngOnInit();
    

  // }

  enviarMensaje(mensajeVegeta) {
    this._requestService.enviar(mensajeVegeta);
  }

  verMensaje() {
    // take es un operador que hará que solo obtengamos el último valor
    // que tiene bulma$ almacenado. Si no lo usamos, cuando enviemos un mensaje
    // de cualquiera de los dos componentes, se mostrará automaticamente
    // en el que ya haya visto un mensaje anteriormente.
    this._requestService.bulma$.pipe(take(1))
      .subscribe(mensaje => this.mensajeGoku = mensaje);
  }

  updateData(value: boolean) {
    this._requestService.updateData(value);
  }
  
  createLayers(){
    this.osmLayer = new ol.layer.Tile({
      'title': 'OpenStreetMap',
      'type': 'base',
      'opacity': 1.000000,
      source: new ol.source.XYZ({
        url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      })
    });
    
    this.activosxmpio = new ol.layer.Image({
      title: "Casos activos",
      visible: true,
      source: new ol.source.ImageWMS({
        url: this.urlCovid,
        params: {
          LAYERS: this.geoserverLayers[0], 
          STYLES: this.myStyles[0]
        },
        serverType: 'geoserver'
      })
    })
    this.activosxmpio.setZIndex(1)

    this.view = new View({
      // center: ol.proj.fromLonLat([-103.5864,20.704]),
      // zoom: 7.5,
      center: ol.proj.fromLonLat([-103.3564,20.564]),
      zoom: 9
    });
  }

  createMap(){

    this.map = new Map({
      controls: defaultControls().extend([
        new FullScreen({
          source: 'fullscreen'
        })
      ]),
      layers: [
        this.osmLayer,
        this.activosxmpio,
      ],
      target: document.getElementById('map'),
      view: this.view
    });
    
    this.map.on('singleclick', (event) =>{
    
      this.callback(event);
      
    });
  }

  updateMap(viewparam){
    // console.log('updateMap()');
    // console.log('viewparams');
    // console.log(viewparam);
    
    
    var viewparams = this.activosxmpio.getSource().getParams();
    this.VIEW_PARAMS = "aaaammdd:" + viewparam;
    // console.log('this.VIEW_PARAMS');
    // console.log(this.VIEW_PARAMS);
    
    viewparams.VIEWPARAMS = this.VIEW_PARAMS;
    this.activosxmpio.getSource().updateParams(viewparams);
  }

  callback(evt){

    // console.log('callback(evt)');

    var viewResolution = /** @type {number} */ (this.view.getResolution());
    var url1 = this.activosxmpio.getSource().getFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
        // console.log('url1');
        // console.log(url1);

        fetch(url1).then(data => {
          return data.json()
        }).then(json => {

          try {
            // console.log('json.features[0].properties.date_now');
            // console.log(json.features[0].properties);
            
            this.desde_el_hijo.emit(json.features[0].properties);
            // this.desde_el_hijo.emit(json.features[0].properties);
            
          } catch (error) {
          }

        return null;
        });

  
    
    


    // this.desde_el_hijo.emit(urls)

    
    ///////////////////////////////////////////////////////////////////////////////////

    // var viewResolution = /** @type {number} */ (this.view.getResolution());

    // viewparams = this.activosxmpio.getSource().getParams();
    // this.VIEW_PARAMS = "aaaammdd:"+this.dateParam;
    // viewparams.VIEWPARAMS = this.VIEW_PARAMS;

    // this.activosxmpio.getSource().updateParams(viewparams);


    // var url1 = this.activosxmpio.getSource().getFeatureInfoUrl(
    //   evt.coordinate, viewResolution, 'EPSG:3857',
    //   {'INFO_FORMAT': 'application/json'});
    //   // console.log('url1');
    //   // console.log(url1);
      

    //   var viewparams = this.activosxmpio.getSource().getParams();
    //   this.VIEW_PARAMS = "aaaammdd:" + (this.dateParam-7);
    //   // console.log(this.VIEW_PARAMS);
      
    //   viewparams.VIEWPARAMS = this.VIEW_PARAMS;
  
    //   this.activosxmpio.getSource().updateParams(viewparams);
  
    // var url2 = this.activosxmpio.getSource().getFeatureInfoUrl(
    //   evt.coordinate, viewResolution, 'EPSG:3857',
    //   {'INFO_FORMAT': 'application/json'});
    //   // console.log('url2');
    //   // console.log(url2);


    //   viewparams = this.activosxmpio.getSource().getParams();
    //   this.VIEW_PARAMS = "aaaammdd:" + (this.dateParam-14);
    //   viewparams.VIEWPARAMS = this.VIEW_PARAMS;

    //   this.activosxmpio.getSource().updateParams(viewparams);

    // var url3 = this.activosxmpio.getSource().getFeatureInfoUrl(
    //   evt.coordinate, viewResolution, 'EPSG:3857',
    //   {'INFO_FORMAT': 'application/json'});
    //   // console.log('url3');
    //   // console.log(url3);

    //   var urls = [url1, url2, url3]
    //   viewparams = this.activosxmpio.getSource().getParams();
    //   this.VIEW_PARAMS = "aaaammdd:"+"20200722";
    //   viewparams.VIEWPARAMS = this.VIEW_PARAMS;
  
    //   this.activosxmpio.getSource().updateParams(viewparams);
  

    // this.desde_el_hijo.emit(urls)
    
    // fetch(url1).then(data => {
    //   return data.json()
    // }).then(json => {

    //   try {
        // console.log('json.features[0].properties.date_now');
        // console.log(json.features[0].properties.date_now);
        
        // this.desde_el_hijo.emit(json.features[0].properties);
        // this.desde_el_hijo.emit(json.features[0].properties);
        
    //   } catch (error) {
    //   }

    // return null;
    // });
  }

  getDateNow(){
    this.url_dateNow = this.urlDate + this.owsDate;
    fetch(this.url_dateNow ).then(data => {
      return data.json();
    }).then(json => {
      try {
        var re = /Z/gi; 
        var str = json.features[0].properties.date_now;
        this.date_Now_covid = str.replace(re, "");
        
        re = /-/gi; 
        str = this.date_Now_covid;
        this.date_Now_covid = str.replace(re, "");

        // console.log(this.date_Now_covid);
        
        
      } catch (error) {}

      return null;
    });
  }
  
}
