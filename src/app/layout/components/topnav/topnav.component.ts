import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from '../../services/request.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss'],
    providers:[RequestService]
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;

    mensaje: string = 'Navbar!';

    constructor(private _requestService: RequestService, public router: Router, private translate: TranslateService) {
        
        // console.log('topnav');
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';

        this._requestService.nombre$.subscribe( texto => {
            this.mensaje = texto;
            // console.log('Navbar:', texto);
          });
      
          this._requestService.nombre$.emit('topnav')
    }

    cambiarNombre(){
        // console.log('Cambiando nombre');
        this._requestService.nombre$.emit('topnav 2')
        
      }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        // localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
        console.log('onloggeedout');
        
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
