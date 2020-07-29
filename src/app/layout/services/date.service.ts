import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs';

@Injectable()
export class DateService {

    private dataSubject= new Subject<any>()

    getDataSubject(): Observable<any>{
        // console.log("service")
        return this.dataSubject.asObservable()
    }

    clearDataSubjet(){
        this.dataSubject.next()
    }

    setDataSubject(data){
        console.log(data)
        this.dataSubject.next(data)
    }

}