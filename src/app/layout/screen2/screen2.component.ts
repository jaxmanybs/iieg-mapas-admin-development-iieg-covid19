import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls, FullScreen} from 'ol/control';
import 'ol/ol.css';

declare var ol;

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

  myStyles = [
    `${environment.workspaceCovid}:activosxmpio`,
    `${environment.workspaceCovid}:acumuladosxmpio`,
  ]

  geoserverLayers = [
    "	covid19:radaractivosxmpio",
    "	covid19:radaracumuladospos"
  ]

  map: any
  osmLayer: any
  activosxmpio: any
  // myLayers = [];
  view
  // overlay

  urlCovid = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`

  constructor(public router: Router) { 
    
    // this.router.navigate(['/screen1']);
  }

  ngOnInit() {
    
    this.createLayers();
    this.createMap();
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
            console.log('json.features[0].properties');
            console.log(json.features[0].properties);
            
            // this.desde_el_hijo.emit(json.features[0].properties);
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

}
