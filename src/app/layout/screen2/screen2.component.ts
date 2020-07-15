import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

  constructor(public router: Router) { 
    
    // this.router.navigate(['/screen1']);
  }

  ngOnInit() {
  }

  onMap() {
    this.router.navigate(['/screen1']);
    console.log();
    
  }
}
