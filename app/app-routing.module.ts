import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopologyDetailComponent }  from './topology-detail.component';
import {TopologyComponent} from "./topology.component";

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'detail/:href', component: TopologyDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
