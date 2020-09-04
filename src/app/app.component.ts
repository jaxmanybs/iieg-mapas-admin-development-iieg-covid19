import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'
import { RequestService } from './layout/services/request.service';
import { DatePipe } from '@angular/common';

import { filter } from 'rxjs/operators';

declare var gtag;
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
            const navEndEvents$ = this._router.events
            .pipe(
              filter(event => event instanceof NavigationEnd)
            );
        
            navEndEvents$.subscribe((event: NavigationEnd) => {
              gtag('config', 'UA-176781706-1', {
                'page_path': event.urlAfterRedirects
              });
            });
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
