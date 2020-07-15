import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Screen1RoutingModule } from './screen1-routing.module';

import { Map1Component } from './map1/map1.component';

import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


// // import { CommonModule } from '@angular/common';
// // import { NgModule } from '@angular/core';
// // import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatTabsModule } from '@angular/material/tabs';
// // import { ChartsModule } from 'ng2-charts';
// // import { MatSelectModule } from '@angular/material/select';
// import { MatRadioModule } from '@angular/material/radio';

// import { StatModule } from '../../shared/modules/stat/stat.module';
// // import { DashboardRoutingModule } from './dashboard-routing.module';
// // import { DashboardComponent } from './dashboard.component';
// // import { MapComponent } from './map/map.component';
// import { FormsModule } from '@angular/forms';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSliderModule } from '@angular/material/slider';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSortModule} from '@angular/material/sort';
// import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [Screen1Component, Map1Component],
  imports: [
    CommonModule,
    Screen1RoutingModule,
    ChartsModule,
    MatSelectModule,
    MatFormFieldModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    // FormsModule,//
    // MatRadioModule,
    // MatSelectModule,
    // MatTabsModule,
    // MatExpansionModule,
    // MatGridListModule,
    // StatModule,
    // MatCardModule,
    // MatTableModule,
    // MatButtonModule,
    // MatIconModule,
    // ChartsModule,
    // MatPaginatorModule,
    // MatSliderModule,
    // MatSortModule,
    // MatFormFieldModule,
    // Ng5SliderModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class Screen1Module { }