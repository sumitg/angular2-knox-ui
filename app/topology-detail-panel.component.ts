import { Component } from '@angular/core';
@Component({
    selector: 'topology-detail-panel',
    template: `
     <div class="panel panel-default">
      <div class="panel-heading">
     <h3 class="panel-title">{{title}}</h3>
     </div>
     <router-outlet></router-outlet>
     </div>
   `
})
export class TopologyDetailPanelComponent {
    title = 'Topology Detail'
}