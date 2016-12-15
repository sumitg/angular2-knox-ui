import { Component } from '@angular/core';
import {TopologyService} from "./topology.service";

@Component({
    selector: 'topology-management',
    template: `
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <topology></topology>
         </div>
          <div class="col-md-7">
            <topology-detail-panel></topology-detail-panel>
          </div>
        </div>
      </div>
  `,
    providers: [TopologyService]
})

export class AppComponent {
    constructor(private topologyService : TopologyService) {
    }
}