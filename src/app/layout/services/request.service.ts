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
  cvegeo = "&CQL_FILTER=cvegeo like '14039'"
  url = "https://indices.jalisco.gob.mx/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:defacumedades&outputFormat=application/json&CQL_FILTER=cvegeo like '14039'";


  viewparams;
  viewparams7;
  viewparams14;
  dateNowService;
  dateNowServiceRes;

  
  cqlfilter;

  date_now_def;

	getDateNow(){

    var cvegeo = "&CQL_FILTER=cvegeo like '14039'"

    var urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + cvegeo}`

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

    // console.log('urlActives');
    // console.log(urlActives);
    

    return this.http.get<any>(urlActives)
  }
  getActives7(viewparams7){

    viewparams7 = ('&VIEWPARAMS=aaaammdd:' + viewparams7);

    let urlActives7 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams7 + this.cvegeo}`

    // console.log('urlActives7');
    // console.log(urlActives7);
    
    return this.http.get<any>(urlActives7)
  }
  getActives14(viewparams14){

    viewparams14 = ('&VIEWPARAMS=aaaammdd:' + viewparams14);

    let urlActives14 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams14 + this.cvegeo}`
    
    // console.log('urlActives14');
    // console.log(urlActives14);
    
    return this.http.get<any>(urlActives14)
  }
  getActivesMun(viewparams, cvegeo){

    // console.log('viewparams');
    // console.log(viewparams);

    // console.log('cvegeo');
    // console.log(cvegeo);
    var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    // console.log('cqlfilter');
    // console.log(cqlfilter);

    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    let getActivesMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + cqlfilter}`
    console.log('getActivesMun');
    console.log(getActivesMun);
    
    return this.http.get<any>(getActivesMun)
  }
  getActives7Mun(viewparams, cvegeo){

    // console.log('cvegeo');
    // console.log(cvegeo);
    var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    // console.log('cqlfilter');
    // console.log(this.cqlfilter);

    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    let getActives7Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + cqlfilter}`
    // console.log('getActives7Mun');
    // console.log(getActives7Mun);
    
    return this.http.get<any>(getActives7Mun)
  }
  getActives14Mun(viewparams, cvegeo){

    // console.log('cvegeo');
    // console.log(cvegeo);
    var cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    // console.log('cqlfilter');
    // console.log(cqlfilter);



    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    let getActives14Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + viewparams + cqlfilter}`
    
    // console.log('getActives14Mun');
    // console.log(getActives14Mun);
    
    return this.http.get<any>(getActives14Mun)
  }

  defAcumEdades1(viewparams, cvegeo){
    // console.log('cvegeo');
    // console.log(cvegeo);
    var cqlfilter

    if(cvegeo == undefined){
      cqlfilter = "&CQL_FILTER=cvegeo like '14039'";
      // viewparams = "&VIEWPARAMS=aaaammdd:20200729";
      
      // console.log('cqlfilter - if');
      // console.log(cqlfilter);
      
    }else{
      cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
      // console.log('cqlfilter');
      // console.log(cqlfilter);
    }

    viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
   
    let urlDefAcumEdades1 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?' 
    + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    + 'typeName=' + environment.workspaceCovid + ':' + environment.defacumedades +'&' + environment.outputJson + viewparams + cqlfilter}`
    
    // console.log('urlDefAcumEdades1');
    // console.log(urlDefAcumEdades1);
    
    return this.http.get<any>(urlDefAcumEdades1)
    
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