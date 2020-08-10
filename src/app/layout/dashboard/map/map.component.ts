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
import { equal } from 'assert';
import { equals } from 'ol/extent';
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
  cvegeo
  // VIEW_PARAMS = 'aaaammdd:';
  // VIEW_PARAMS = "aaaammdd:20200719"
  VIEW_PARAMS;
  @Input() date_siderbar;
  date_now;
  date_7;
  date_14;
  @Output() desde_el_hijo = new EventEmitter();
  @Output() desde_el_hijo2 = new EventEmitter();
  @Output() desde_el_hijo_map = new EventEmitter();


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
  // actualizar capa
  source;
  params;

  
  myStyles = [
    `${environment.workspaceCovid}:activosxmpio_iieg`,
    `${environment.workspaceCovid}:positivosacumxmpio`,
    `${environment.workspaceCovid}:defsxmpio`,
    `${environment.workspaceCovid}:activosxmpionac`
  ]

  geoserverLayers = [
    "activosxmpiograf",
    "positivosacumxmpio",
    "defuncionesxmpio",
    "mat2019_2020"
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

  layer

  show:boolean = true

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _requestService: RequestService,
    private miDatePipe: DatePipe
    ) {

      
    // console.log('constructor');

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

    if(changes.layer.currentValue  != changes.layer.previousValue){
        const nuevaLayer = changes.layer.currentValue;

        // console.log('nuevaLayer');
        // console.log(nuevaLayer);
        
      }

   
    // console.log('ngOnChanges');
    // console.log('this.layer');
    // console.log(this.layer);
    
    switch(this.layer) { 
      case '/activos': { 
        //statements;
        console.log('Activos');
        // this.params = {LAYERS: "vjal:vmConfirmados", TILED: false}
        break; 
      } 
      case '/activosnac': { 
        //statements;
        console.log('Activos Nacionales');
        // this.params = {LAYERS: "vjal:vmMunicipios", TILED: false}
        break; 
      }
      default: { 
        //statements;
        
        break; 
      } 
    } 
    
    
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

    // console.log('ngOninit');
    
  
    this.createLayers()
    this.createMap();
    this._route.params.forEach(params =>{
      // console.log('params.date-ngOnIniti()');
        //   console.log(typeof(params.date));
        //   console.log(params.date);
        //   console.log(params.date.split('-')[0]);

        //   console.log('this._router.url');
        //   console.log(this._router.url);
        //   console.log("this._router.url.split('-')[0]");
        //   console.log(this._router.url.split('-')[0]);
        //   console.log("this._router.url.split('-')[1]");
        //   console.log(this._router.url.split('-')[1]);
        //   console.log(this._router.url);

        var layer = this._router.url.split('-')[1];
        //   console.log('nac');
        //   console.log(layer);
        //   console.log(typeof(layer));
      

        var date_covid = new Date(params.date.split('-')[0]);
  
        this.parametro = params.date.split('-')[0]


  
        // console.log('params.date ngOnIniti()');
        // console.log(params.date);
        
        
        this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');
        // console.log('this.dateParam');
        // console.log(this.dateParam);
        
  
        var viewparams = this.activosxmpio.getSource().getParams();
        this.VIEW_PARAMS = "aaaammdd:" + this.dateParam;

        // console.log('viewparams');
        // console.log(viewparams);

        
        // this.activosxmpio.getSource().clear();
        // if(nac == 'acu'){
        //     console.log('if-acu');
            
            
        //     this.layer = "/acumulados"
        // }else if(nac == 'def'){
        //     console.log('if-def');
            
            
        //     this.layer = "/defunciones"
        // }else if(nac == 'nac'){
        //     console.log('if-nac');
            
            
        //     this.layer = "/activosnac"
        // }else{
            
        //     console.log('else');
        //     this.layer = "/activos"
        // }
        
  
        viewparams.VIEWPARAMS = this.VIEW_PARAMS;
        this.activosxmpio.getSource().updateParams(viewparams);

        // console.log('ngOnChanges');
        // console.log('this.layer');
        // console.log(this.layer);
        
        switch(layer) {
            case 'act': { 
                // console.log('Activos x Municipio');
                this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
                var view = new View({
                center: ol.proj.fromLonLat([-103.4564,20.664]),
                zoom: 7.8
                });
                this.map.setView(view)
                this.desde_el_hijo_map.emit('act');
                break;  
              } 
            case 'acu': { 
                // console.log('Acumulados');
                this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[1], STYLES:this.myStyles[0]});
                var view = new View({
                center: ol.proj.fromLonLat([-103.4564,20.664]),
                zoom: 7.8
                });
                this.map.setView(view)
                this.desde_el_hijo_map.emit('acu');
                break; 
            } 
            case 'def': {
                // console.log('Defunciones');
                this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[2], STYLES:this.myStyles[2]});
                var view = new View({
                center: ol.proj.fromLonLat([-103.4564,20.664]),
                zoom: 7.8
                });
                this.map.setView(view)
                this.desde_el_hijo_map.emit('def');
                break; 
            } 
            case 'nac': {
                // console.log('Activos Nacionales');
                this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[3], STYLES:'sej:mat2019_2020'});
                var view = new View({
                    center: ol.proj.fromLonLat([-103.3564,20.564]),
                    zoom: 8
                });
                this.map.setView(view)
                this.desde_el_hijo_map.emit('nac');
                break; 
            }
            default: { 
                // console.log('Activos x Municipio');
                this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
                var view = new View({
                center: ol.proj.fromLonLat([-103.4564,20.664]),
                zoom: 7.8
                });
                this.map.setView(view)
                this.desde_el_hijo_map.emit('act');
                break; 
            } 
        } 
    })

  }

  init(){
    this.createLayers()
    this.createMap()
  }

  resetChildForm(){
    // console.log('this.resetChildForm');
    
    this.show = false;
 
    setTimeout(() => {
       this.show = true
       this.createMap();
       
       
    // console.log('this.show');
     }, 100);
 }

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
    // center: ol.proj.fromLonLat([-103.4564,20.664]),
    // zoom: 7.8
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
      target: document.getElementById('map')
    });

    this.map.setView(this.view)

    this.map.addControl(new ol.control.ZoomSlider());

    this.source = this.activosxmpio.getSource()
    this.params = this.source.getParams();
    // console.log('source and params');
    // console.log(this.source);
    // console.log(this.params);

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
    // this.layer = "/activosnac"

    var viewResolution = /** @type {number} */ (this.view.getResolution());
    var url1 = this.activosxmpio.getSource().getFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
        // console.log('callback(evt)');
        // console.log('url1');
        // console.log(url1);
        // console.log('this.activosxmpio.getSource().getParams()');
        // console.log(this.activosxmpio.getSource().getParams());


        fetch(url1).then(data => {
          return data.json()
        }).then(json => {

          try {
            // console.log('json.features[0].properties');
            // console.log(json.features[0].properties);
            // this.cvegeo = json.features[0].properties.cvegeo;
            // console.log(json.features[0].properties.cvegeo);

            json.features[0].properties["layers"] = this.activosxmpio.getSource().getParams().LAYERS;
            json.features[0].properties["viewparams"] = this.activosxmpio.getSource().getParams().VIEWPARAMS;

            
            this._requestService.updateCvegeo(json.features[0].properties.cvegeo)
            this._requestService.updateLayers(json.features[0].properties.layers)
            
            this.desde_el_hijo.emit(json.features[0].properties);
            // this.desde_el_hijo.emit(datos_map);
            // this.desde_el_hijo2.emit(this.activosxmpio.getSource().getParams());
            
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
