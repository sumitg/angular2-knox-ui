import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import {TopologyService} from "./topology.service";
import {TopologyDetailComponent} from "./topology-detail.component";
import {GatewayVersionService} from "./gateway-version.service";
import {GatewayVersionComponent} from "./gateway-version.component";
import {TopologyComponent} from "./topology.component";
import {TopologyDetailPanelComponent} from "./topology-detail-panel.component";
import {XmlPipe} from "./xml.pipe";
import {JsonPrettyPipe} from "./json-pretty.pipe";
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

import { AceEditorDirective } from '../node_modules/ng2-ace-editor'; 
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal'

@NgModule({
  imports: [ BrowserModule,
    HttpModule,
    FormsModule,
    Ng2Bs3ModalModule
    ],
  declarations: [ AppComponent,
    TopologyComponent,
      TopologyDetailPanelComponent,
    TopologyDetailComponent,
    GatewayVersionComponent,
    AceEditorDirective,
    XmlPipe,
    JsonPrettyPipe,
    TabsComponent,
    TabComponent ],
  providers: [ TopologyService,
    GatewayVersionService ],
  bootstrap: [ AppComponent,
    GatewayVersionComponent]
})
export class AppModule { }
