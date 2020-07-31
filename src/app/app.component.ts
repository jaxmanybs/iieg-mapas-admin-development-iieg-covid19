import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { RequestService } from './layout/services/request.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe) {
        translate.setDefaultLang('en');
        
        // console.log('app');

        // this._requestService.getDateNow().subscribe(data => {
        //     data.features.forEach(feature => {
            
        //     var re = /Z/gi;
        //     var str = feature.properties.date_now;
        //     var date_now_covid = str.replace(re, "");

        //     re = /-/gi; 
        //     str = date_now_covid;
        //     date_now_covid = str.replace(re, ", ");

        //     console.log('date_now_covid');
        //     console.log(date_now_covid);
            
            
        //     // this.maxDate = new Date(this.date_now_covid);
        //     // this.date = new FormControl(this.maxDate);

        //     // this.eventDatePicker = this.date_now_covid;
        //     this._router.navigate(['/', date_now_covid]);

        //     })
        // })
    }

    ngOnInit() {
    }
}
