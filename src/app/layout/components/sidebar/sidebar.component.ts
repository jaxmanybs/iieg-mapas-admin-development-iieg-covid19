import { Component, EventEmitter, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RequestService } from '../../services/request.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { take } from 'rxjs/operators';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [ { provide: LOCALE_ID, useValue: 'en-GB' } ],

})
export class SidebarComponent implements OnInit {
    public showMenu: string;

    public mensajeVegeta: string;

    public parametro

    mensaje: string = 'Sidebar!!';
    
    myData: string;

    // dates: string[] = ['14-07-2020', '13-07-2020', '12-07-2020', '11-07-2020'];
    minDate = new Date(2020, 6, 2);
    // el Mx date se debe traer del fecth que se hace en el map mediante @Input o @Output
    date_now_covid;
    maxDate = new Date();
    date_calendar = new Date();

    datos_sidebar;
    
    date = new FormControl();
    serializedDate = new FormControl((new Date()).toISOString());

    @Output() mydate = new EventEmitter<any>();

    eventDatePicker: string;

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

        this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' + (event.target.value.getMonth() + 1).toString() + ', ' + event.target.value.getDate().toString())
        
        // console.log('this._requestService.getCvegeo()');
        // console.log(this._requestService.getCvegeo());
        
        this._router.navigate([this._router.url.split('/2')[0],this.eventDatePicker+'-'+this._router.url.split('-')[1]]);
        // this._router.navigate([this._router.url.split('/2')[0],this.eventDatePicker]);
        // console.log(this._router.url.split('/2')[0],this.eventDatePicker);
        // console.log('this._router.url');
        // console.log(this._router.url.split('/2')[0],this.eventDatePicker,this._router.url.split('-')[1]);
        // this._router.url.split('/2')[0]
        // console.log(this._router.url.split('/2')[0]);

    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe
    ){
        // _router.events.subscribe((url:any) => console.log(url.snapshot.url[0].path));
        // console.log('_router.url');
        // console.log(this._router.url.split('/2')[0]);
        this._requestService.getDateNow().subscribe(data => {
            data.features.forEach(feature => {

            // console.log('feature.cvegeo');
            // console.log(feature.properties.cvegeo);
                
            
            var re = /Z/gi;
            var str = feature.properties.date_now;
            this.date_now_covid = str.replace(re, "");

            re = /-/gi; 
            str = this.date_now_covid;
            this.date_now_covid = str.replace(re, ", ");
            
            this.maxDate = new Date(this.date_now_covid);
            this.date = new FormControl(this.maxDate);

            this.eventDatePicker = this.date_now_covid;
            // this._router.navigate(['/', this.eventDatePicker]);
            this._router.navigate(['/activos', this.eventDatePicker+'-act']);

            // console.log('feature.cvegeo2');
            // console.log(feature.properties.cvegeo);

            // console.log('this._router.url');
            // console.log(this._router.url);
            

            })
        })
    }

    ngOnInit() {
        this.showMenu = '';
    }


///////////////// no se utiliza hasta ahorita /////////////////////////////////////////////////////////////////////////////////
    enviarMensaje(mensajeGoku) {
        this._requestService.enviar(mensajeGoku);
    }
  
    verMensaje() {
        this._requestService.bulma$.pipe(take(1)).
                                    subscribe(mensaje => this.mensajeVegeta = mensaje);
    }

    updateData(value: boolean) {
        this._requestService.updateData(value);
    }

    cambiarNombre(){
      //console.log(this.maxDate);
      //this._requestService.nombre$.emit('sidebar')

        this.mydate.emit(this.maxDate)
      
    }

    getDateNow(urls){
        // console.log('urls sidebar');
        // console.log(urls);
        // console.log('urls sidebar');
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
