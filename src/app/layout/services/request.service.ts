import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    private bulma = new BehaviorSubject<string>('');

    // No se utiliza directamente el BehaviorSubject (buena practica)
    // Se canaliza su uso a través de un observable que será público.
    // Este observable llamará quién quiera ver el último mensaje que se dejó.
    bulma$ = this.bulma.asObservable();

    // Almacenar mensaje, listo para mostrarlo a quién lo pida.
    enviar(mensaje) {
        // function que llamará quien quiera transmitir un mensaje.
        this.bulma.next(mensaje);
    }

    public date_now_covid_service;

    nombre$ = new EventEmitter<string>();

    onGetData = new EventEmitter<string>();

    private dataObs$ = new Subject();

    datePipeString : string;

        constructor(
        private http: HttpClient
        ) {
        //   this.datePipeString = formatDate(Date.now(),'yyyyMMdd', 'en-US');
        // console.log('this.datePipeString');
        // console.log(this.datePipeString);
    }


    
    // petiiones mediante CQL_FILTER¿
    // 14039 cvegeo GDL
    //http://10.13.23.32:8080/geoserver / covid19 / ows? service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:defacumedades&outputFormat=application/json&CQL_FILTER=cvegeo like '14039'
    cvegeo = '14039'
    cqlFilter = `&CQL_FILTER=cvegeo like '+${this.cvegeo}'`
    url = "https://indices.jalisco.gob.mx/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:defacumedades&outputFormat=application/json&CQL_FILTER=cvegeo like '14039'";


    mpioSelected;
    layer = environment.activosxmpiograf;
    viewparams;
    viewparams7;
    viewparams14;
    dateNowService;
    dateNowServiceRes;

    
    // cqlfilter;

    date_now_def;

        getDateNow(){

        var cvegeo = "&CQL_FILTER=cvegeo like '14039'"

        var urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + cvegeo}`

        return this.http.get<any>(urlDate)
    }

    getActives(viewparams, cvegeo){

        viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
        
        let urlActives = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + cqlfilter}`

        // console.log('urlActives');
        // console.log(urlActives);
        

        return this.http.get<any>(urlActives)
    }
    getActives7(viewparams7, cvegeo){

        viewparams7 = ('&VIEWPARAMS=aaaammdd:' + viewparams7);
        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        let urlActives7 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams7 + cqlfilter}`

        // console.log('urlActives7');
        // console.log(urlActives7);
        
        return this.http.get<any>(urlActives7)
    }
    getActives14(viewparams14, cvegeo){

        viewparams14 = ('&VIEWPARAMS=aaaammdd:' + viewparams14);
        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        let urlActives14 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams14 + cqlfilter}`
        
        // console.log('urlActives14');
        // console.log(urlActives14);
        
        return this.http.get<any>(urlActives14)
    }
    getAcumMun(layers, viewparams2, cvegeo){

        layers += '_7_14'

        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        viewparams2 = ('&VIEWPARAMS=aaaammdd:' + viewparams2);
        // console.log(viewparams2);
        

        let getAcumMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layers +'&' + environment.outputJson + viewparams2 + cqlfilter}`
            // console.log('getAcumMun');
            // console.log(getAcumMun);
        return this.http.get<any>(getAcumMun)
    }
    getAcumMun7(layers, viewparams2, cvegeo){

        layers += '_7_14'

        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        viewparams2 = ('&VIEWPARAMS=' + viewparams2);
        // console.log(viewparams2);
        

        let getAcumMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layers +'&' + environment.outputJson + viewparams2 + cqlfilter}`
            // console.log('getAcumMun7');
            // console.log(getAcumMun);
        return this.http.get<any>(getAcumMun)
    }
    getActivesMun(layers, viewparams2, cvegeo){

        layers += '_7_14'

        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        viewparams2 = ('&VIEWPARAMS=' + viewparams2);
        // console.log(viewparams2);
        

        let getActivesMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layers +'&' + environment.outputJson + viewparams2 + cqlfilter}`
            // console.log('getActives7Mun');
            // console.log(getActives7Mun);
        return this.http.get<any>(getActivesMun)
    }
    getActives7Mun(layers, viewparams, cvegeo){

        layers += '_7_14'

        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
        // console.log(viewparams);

        let getActives7Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layers +'&' + environment.outputJson + viewparams + cqlfilter}`
        // console.log('getActives7Mun');
        // console.log(getActives7Mun);
        
        return this.http.get<any>(getActives7Mun)
    }
    getActives14Mun(layers, viewparams, cvegeo){

        layers += '_7_14'

        var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

        viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
        // console.log(viewparams);

        let getActives14Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layers +'&' + environment.outputJson + viewparams + cqlfilter}`
        
        // console.log('getActives14Mun');
        // console.log(getActives14Mun);
        
        return this.http.get<any>(getActives14Mun)
    }

    getCvegeo(){
        return this.cvegeo;
    }
    updateCvegeo(cvegeo){
        this.cvegeo = cvegeo;
    }
    getLayers(){
        return this.layer;
    }
    updateLayers(layer){
        this.layer = layer;
        // console.log('this.layer');
        // console.log(this.layer);
        
        // this.viewparams7 = param;
        // this.viewparams14 = param;

    }

    acumEdades1(layer, viewparams, cvegeo){
        // console.log('acumEdades1(layer, viewparams, cvegeo)');

        var cqlfilter

        if(cvegeo == undefined){
        cqlfilter = "&CQL_FILTER=cvegeo like '14039'";
        
        // console.log('cqlfilter - if');
        
        }else{
        cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
        // console.log('cqlfilter - else');
        }

        switch(layer) {
            case 'act': { 
                // console.log('Activos');
                layer = 'activosacumedades'
                break;  
              } 
            case 'acu': { 
                // console.log('Acumulados');
                layer = 'postivosacumedades'
                break; 
            }
            case 'def': {
                // console.log('Defunciones');

                break; 
            } 
            case 'nac': {
                // console.log('Activos Nacionales');

                break; 
            }
            default: { 
                // console.log('Activos x Municipio');
                layer = 'activosacumedades'
                break; 
            } 
            
        }

        // console.log(layer);
        // console.log(viewparams);
        // console.log(cvegeo);
        

        viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
    
        let urlAcumEdades1 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + layer +'&' + environment.outputJson + viewparams + cqlfilter}`
        
        // console.log('urlAcumEdades1');
        // console.log(urlAcumEdades1);
        
        return this.http.get<any>(urlAcumEdades1)
        
    }

    // getActivesMunClick(urlActivesClick){
    //   console.log('getActivesMunClick(urlActivesClick)');
        
    //   // var viewparams = '20200728'

    //   // cvegeo = '14121';
        
    //   // console.log('cvegeo');
    //   // console.log(cvegeo);
    //   // var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //   // console.log('cqlfilter');
    //   // console.log(cqlfilter);
    //   // console.log('cvegeo');
    //   // console.log(cvegeo);
        
        
    //   // viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    //   // urlActivesClick = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    //   // + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //   // + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + cqlfilter}`
    //   console.log('urlActivesClick');
    //   console.log(urlActivesClick);
        

    //   return this.http.get<any>(urlActivesClick)
    // }
    acumEdades(viewparams){
        
        viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
        
        var cqlfilter = (`&CQL_FILTER=cvegeo like '${this.cvegeo}'`);
    
        let urlAcumEdades = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
        + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        + 'typeName=' + environment.workspaceCovid + ':' + environment.activosacumedades +'&' + environment.outputJson + viewparams + cqlfilter}`

        // console.log(urlAcumEdades);
        // console.log('urlAcumEdades');
        
        return this.http.get<any>(urlAcumEdades)
        
    }

    ///////////////// no se utiliza hasta ahorita /////////////////////////////////////////////////////////////////////////////////
    getData() {
        return this.dataObs$;
    }

    updateData(data: boolean) {
        this.dataObs$.next(data);
    }

}