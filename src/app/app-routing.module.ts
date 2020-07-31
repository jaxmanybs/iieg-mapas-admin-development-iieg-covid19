import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateService } from './layout/services/date.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
        // loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule)
        // canActivate: [AuthGuard]
    },
    // {
    //     path: 'login',
    //     // loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    //     // loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule)
    //     loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
