import { Component, OnInit, KeyValueDiffers, Output, Input, EventEmitter} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls, FullScreen} from 'ol/control';
import 'ol/ol.css';

import 'rxjs/add/operator/map';

declare var ol;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  ////// pob_sex ///////
  map: any
  CQL_FILTER = "cve_subsec = 311"
  pob_sex
  @Output() desde_el_hijo = new EventEmitter();

  jsonMap: any;

  myLayers = [];
  view
  overlay

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

  constructor() {

    this.jsonMap = { nombre: "Zapotiltic"}

  }

  ngOnInit() {

    var OSM = new ol.layer.Tile({
      'title': 'OpenStreetMap',
      'type': 'base',
      'opacity': 1.000000,
      source: new ol.source.XYZ({
        url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      })
    });

    this.pob_sex = new ol.layer.Image({
      
      title: "Población",
      opacity: 1.000000,
      source: new ol.source.ImageWMS(({
        url: "https://indices.jalisco.gob.mx/geoserver/iieg/wms?",
        params: {
          "LAYERS": 'iieg:proymunsex1530',
          STYLES: 'mpiospobsex',
          "TILED": true
        }
      })),
    });
    this.pob_sex.setZIndex(1);

    this.view = new View({
      center: ol.proj.fromLonLat([-103.5864,20.704]),
      zoom: 7.5
    });
    
    var map = new Map({
      controls: defaultControls().extend([
        new FullScreen({
          source: 'fullscreen'
        })
      ]),
      layers: [
        OSM,
        this.pob_sex,
      ],
      target: document.getElementById('map'),
      view: this.view
    });
    
    map.on('singleclick', (event) =>{
    
      this.callback(event);
      
    });
  }

  callback(evt){

    var viewResolution = /** @type {number} */ (this.view.getResolution());
    
    var url = this.pob_sex.getSource().getFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});

    fetch(url).then(data => {
      return data.json()
    }).then(json => {

      try {
        
        this.desde_el_hijo.emit(json.features[0].properties);
        
      } catch (error) {
      }

    return null;
    });
  }
  
}
