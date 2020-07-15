import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router) {
        // localStorage.setItem('isLoggedin', 'true');
        
    }

    ngOnInit() {
        
        // localStorage.setItem('isLoggedin', 'true');
        // this.router.navigate(['/dashboard']);
        this.onIIEG();
    }

    onIIEG() {
        // localStorage.setItem('isLoggedin', 'true');
        // this.router.navigate(['/dashboard']);
        this.router.navigate(['/']);
    }

    onCovid() {
        // localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/screen1']);
    }

    onPrincipal() {
        // localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/screen2']);
    }
}
