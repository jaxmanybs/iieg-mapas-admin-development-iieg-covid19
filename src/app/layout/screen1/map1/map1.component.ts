import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {defaults as defaultControls, FullScreen} from 'ol/control';

// mapa
declare var ol;

@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements OnChanges {

  datos = [
    { marca: 'Activos', value: 20 },
    { marca: 'Activos', value: 30 },
    { marca: 'Toyota', value: 40 },
    { marca: 'Toyota', value: 50 },
    { marca: 'Mercedes', value: 60 },
    { marca: 'Mercedes', value: 70 },
    { marca: 'Hyundai', value: 80 },
    { marca: 'Hyundai', value: 90 }
  ]

  @Input() marca: string

  total: number = 0;


  ngOnChanges(changes: SimpleChanges){
  // ngOnChanges(){
    console.log("ngOnChanges");
    if(changes.marca.currentValue  != changes.marca.previousValue){
      const nuevaMarca = changes.marca.currentValue;
      const datos = this.datos.filter(dato => dato.marca == nuevaMarca)
      console.log(datos);
      this.total = 0
      datos.forEach(dato => this.total += dato.value)
      
    }

    // this.getMap();
    console.log('this.marca');
    console.log(this.marca);
    
    switch(this.marca) { 
      case 'Activos': { 
        //statements;
        console.log('Activos');
        this.params = {LAYERS: "vjal:vmConfirmados", TILED: false}
        break; 
      } 
      case 'Toyota': { 
        //statements;
        console.log('Toyota');
        this.params = {LAYERS: "vjal:vmMunicipios", TILED: false}
        break; 
      }
      case 'Mercedes': { 
        //statements;
        console.log('Mercedes');
        this.params = {LAYERS: "vjal:vmDefunciones", TILED: false}
        break; 
      }
      case 'Hyundai': { 
        //statements;
        console.log('Hyundai');
        this.params = {LAYERS: "vjal:vmNegativos", TILED: false}
        break; 
      } 
      default: { 
        //statements;
        
        break; 
      } 
    } 
    
    // this.params = {LAYERS: "vjal:vmMunicipios", TILED: false}

    console.log(this.params);
    

    // this.source.updateParams(this.params);
    
  }

  col_inmb;
  view;
  map;
  // actualizar capa
  source;
  params;

  reload = false;

  constructor(public router: Router) { 
    // this.router.navigate(['/screen2']);
    

  }

  ngOnInit() {

    console.log('ngOnIniti');
    
    
    this.getMap();

  }

  //   console.log('ngOnInit');
    

    // const casosMenor = 10;
    // const casosMayor = 20;

    // this.col_inmb = new ol.layer.Tile({
    //   source: new ol.source.TileWMS(({
    //       // url: "http://10.25.6.213:8080/geoserver/iieg_it/wms?",
    //       url: 'https://mapa.jalisco.gob.mx/geos/vector/geoserver/vjal/wms?',
    //       params: {
    //       // "LAYERS": 'iieg_it:proypobsex2030',
    //       'LAYERS': 'vjal:vmConfirmados',
    //       // "CQL_FILTER" : "p_tot_2015>33190",
    //       // 'CQL_FILTER' : 'Confirmados BETWEEN ' + casosMenor + ' AND ' + casosMayor,
    //       // "CQL_FILTER" : "Municipio like '%ZAPO%'",
    //       'TILED': true
    //       },
    //       // viewparams: '',
    //   })),
    //   // title: 'COVID',
    //   // opacity: 1.000000,
    // });
    // const casosMenor = 10;
    // const casosMayor = 20;


    // this.col_inmb = new ol.layer.Tile({
    //     source: new ol.source.TileWMS(({
    //         // url: "http://10.25.6.213:8080/geoserver/iieg_it/wms?",
    //         url: 'https://mapa.jalisco.gob.mx/geos/vector/geoserver/vjal/wms?',
    //         params: {
    //         // "LAYERS": 'iieg_it:proypobsex2030',
    //         'LAYERS': 'vjal:vmConfirmados',
    //         // "CQL_FILTER" : "p_tot_2015>33190",
    //         // 'CQL_FILTER' : 'Confirmados BETWEEN ' + casosMenor + ' AND ' + casosMayor,
    //         // "CQL_FILTER" : "Municipio like '%ZAPO%'",
    //         'TILED': true
    //         },
    //         viewparams: '',
    //     })),
    //     title: 'Población',
    //     opacity: 1.000000,
    // });

    // this.view = new View({
    //   center: ol.proj.fromLonLat([-102.5564, 20.704]),
    //   // center: ol.proj.fromLonLat([-103.5564,20.844]),
    //   // center: ol.proj.fromLonLat([-103.3564,20.644]),
    //   zoom: 8.1
    // });

    // const map = new Map({
    //   controls: defaultControls().extend([
    //       new FullScreen({
    //       source: 'fullscreen'
    //       })
    //   ]),
    //   target: 'map',
    //   layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     }),
    //     this.col_inmb
    //   ],
    //   view: this.view
    // });
    
    // map.on('singleclick', (event) => {
    //   this.callback(event);
    // });
  
  // }

  // ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log('ngAfterViewIni');
    

    // const casosMenor = 10;
    // const casosMayor = 20;

    // this.col_inmb = new ol.layer.Tile({
    //   source: new ol.source.TileWMS(({
    //       // url: "http://10.25.6.213:8080/geoserver/iieg_it/wms?",
    //       url: 'https://mapa.jalisco.gob.mx/geos/vector/geoserver/vjal/wms?',
    //       params: {
    //       // "LAYERS": 'iieg_it:proypobsex2030',
    //       'LAYERS': 'vjal:vmConfirmados',
    //       // "CQL_FILTER" : "p_tot_2015>33190",
    //       // 'CQL_FILTER' : 'Confirmados BETWEEN ' + casosMenor + ' AND ' + casosMayor,
    //       // "CQL_FILTER" : "Municipio like '%ZAPO%'",
    //       'TILED': true
    //       },
    //       // viewparams: '',
    //   })),
    //   // title: 'COVID',
    //   // opacity: 1.000000,
    // });



    
    
  // }
  getMap() {
    const casosMenor = 10;
    const casosMayor = 20;

    this.col_inmb = new ol.layer.Tile({
      source: new ol.source.TileWMS(({
          // url: "http://sin.jalisco.gob.mx/geoserver/cite/wms?",
          url: 'https://mapa.jalisco.gob.mx/geos/vector/geoserver/vjal/wms?',
          params: {
          // "LAYERS": 'cite:mapa_densidad_eco_puntos',
          'LAYERS': 'vjal:vmConfirmados',
          // "CQL_FILTER" : "p_tot_2015>33190",
          // 'CQL_FILTER' : 'Confirmados BETWEEN ' + casosMenor + ' AND ' + casosMayor,
          // "CQL_FILTER" : "Municipio like '%ZAPO%'",
          'TILED': true
          },
          viewparams: '',
      })),
      title: 'Población',
      opacity: 1.000000,
    });

    this.view = new View({
      center: ol.proj.fromLonLat([-102.5564, 20.704]),
      // center: ol.proj.fromLonLat([-103.5564,20.844]),
      // center: ol.proj.fromLonLat([-103.3564,20.644]),
      zoom: 8.1
    });

     this.map = new Map({
      controls: defaultControls().extend([
          new FullScreen({
          source: 'fullscreen'
          })
      ]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.col_inmb
      ],
      view: this.view
    });

    this.source = this.col_inmb.getSource()
    this.params = this.source.getParams();
    console.log('source and params');
    console.log(this.source);
    console.log(this.params);
    
    
    
    
    this.map.on('singleclick', (event) => {
      console.log('singleclick');
      
      // this.map.reload();
      this.callback(event);
    });
  }
  callback(evt) {

    // document.getElementById('info').innerHTML = '';
    // document.getElementById('myChart').innerHTML = '';


    // const viewResolution = /** @type {number} */ (this.view.getResolution());
    const viewResolution = this.view.getResolution();

    // var url = this.mapserver;

    // console.log("info del mapserver");
    // console.log(this.mapserver.getSource() );
    // console.log("info del clic ");

    // var url = "https://gisviewer.semarnat.gob.mx/ArcGIS/rest/services/Delegaciones_SEMARNAT/MapServer/0?f=json&pretty=true";
    // var url = this.covidNac.getSource().getFeatureInfoUrl(
    // var url = this.col_inmb.getSource().getFeatureInfoUrl(
    const url = this.col_inmb.getSource().getFeatureInfoUrl(
      evt.coordinate, viewResolution, 'EPSG:3857',
      {'INFO_FORMAT': 'application/json'});
      // {'INFO_FORMAT': 'text/html'});

      console.log('url');
      console.log(url);

    fetch(url).then(data => {
      return data.json();
    }).then(json => {

      // console.log(json.features[0].properties.cvegeo);
      // console.log(json.features[0].properties.casos);


    //   this.mostrar()

      const html = '';
      try {

        console.log('json');
        console.log(json);
        // this.mun = json.features[0].properties

        // this.graficaChartsJs(json);

      } catch (error) {
      }

      return null;
    });
  }
}
