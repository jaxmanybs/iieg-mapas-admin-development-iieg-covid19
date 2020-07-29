import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule} from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Ng5SliderModule } from 'ng5-slider';
import { Chartbar2020Component } from './chartbar2020/chartbar2020.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RequestService } from '../services/request.service';

@NgModule({
    imports: [
        LayoutModule,
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        MatRadioModule,
        MatDividerModule,
        MatSelectModule,
        MatTabsModule,
        MatExpansionModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StatModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        ChartsModule,
        MatPaginatorModule,
        MatSliderModule,
        MatSortModule,
        MatFormFieldModule,
        Ng5SliderModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent, MapComponent, Chartbar2020Component],
    providers:[DatePipe, RequestService]
})
export class DashboardModule {}
