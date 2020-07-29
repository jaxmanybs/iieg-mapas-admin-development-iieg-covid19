import { Component, EventEmitter, Injectable, Output, Inject, LOCALE_ID } from '@angular/core';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable'
import { FormControl } from '@angular/forms';
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
  cvegeo = "&CQL_FILTER=cvegeo like '14039'"
  url = "https://indices.jalisco.gob.mx/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:defacumedades&outputFormat=application/json&CQL_FILTER=cvegeo like '14039'";


  viewparams;
  viewparams7;
  viewparams14;
  dateNowService;
  dateNowServiceRes;

	getDateNow(){

    var urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + this.cvegeo}`

    return this.http.get<any>(urlDate)
  }

  updateParams(dateParam){
    this.viewparams = dateParam;
  }

  updateParams714(dateParam){

    var viewparamsDate = new Date(dateParam);

    var date_covid   = formatDate((viewparamsDate.getMonth()+1).toString()+ '/'+(viewparamsDate.getDate()).toString()+ '/'+viewparamsDate.getFullYear().toString(),'yyyyMMdd', 'en-US');
    var date_covid7  = formatDate((viewparamsDate.getMonth()+1).toString()+ '/'+(viewparamsDate.getDate()-7).toString()+ '/'+viewparamsDate.getFullYear().toString(),'yyyyMMdd', 'en-US');
    var date_covid14 = formatDate((viewparamsDate.getMonth()+1).toString()+ '/'+(viewparamsDate.getDate()-14).toString()+ '/'+viewparamsDate.getFullYear().toString(),'yyyyMMdd', 'en-US');

    this.viewparams = date_covid;
    this.viewparams7 = date_covid7;
    this.viewparams14 = date_covid14;

  }
  getActives(viewparams){

    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    let urlActives = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + this.cvegeo}`

    return this.http.get<any>(urlActives)
  }
  getActives7(viewparams7){

    viewparams7 = ('&VIEWPARAMS=aaaammdd:' + viewparams7);

    let urlActives7 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams7 + this.cvegeo}`

    return this.http.get<any>(urlActives7)
  }
  getActives14(viewparams14){

    viewparams14 = ('&VIEWPARAMS=aaaammdd:' + viewparams14);

    let urlActives7 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams14 + this.cvegeo}`

    return this.http.get<any>(urlActives7)
  }

  defAcumEdades(viewparams){
    
    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
   
    let urlDefAcumEdades = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.defacumedades +'&' + environment.outputJson + viewparams + this.cvegeo}`

    
    return this.http.get<any>(urlDefAcumEdades)
    
  }

///////////////// no se utiliza hasta ahorita /////////////////////////////////////////////////////////////////////////////////
  getData() {
      return this.dataObs$;
  }

  updateData(data: boolean) {
      this.dataObs$.next(data);
  }

}