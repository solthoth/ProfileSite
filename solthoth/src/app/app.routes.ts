import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-detail/job-detail.component';

export const routes: Routes = [
    {
        path:'',
        title: 'SolThoth',
        component: HomeComponent
    },
    {
        path: 'details/:id',
        title: 'Details Page',
        component: JobDetailsComponent
    }
];
