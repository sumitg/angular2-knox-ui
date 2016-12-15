import {Component, OnInit} from '@angular/core';
import {Topology} from './topology';
import {TopologyService} from "./topology.service";
import { Subscription }   from 'rxjs/Subscription';


@Component({
    selector: 'topology',
    template: `
        <div class="table-responsive" style="max-height: 400px; width:100%; overflow: auto;">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Topology Name</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
         <tbody>
         <tr *ngFor="let topology of topologies"
          [class.selected]="topology === selectedTopology"
        (click)="onSelect(topology)">
         <td>{{topology.name}}</td> 
         <td>{{topology.timestamp | date:'yMMMdjms'}}</td> 
         </tr>
        </tbody>
        </table>
        </div>
       `
})
export class TopologyComponent implements OnInit {

    value :any;
    topologies: Topology[];
    selectedTopology: Topology;


    constructor(private topologyService : TopologyService) {
    }

    getTopologies(): void {
        this.topologyService.getTopologies().then(topologies => this.topologies = topologies);
    }

    ngOnInit(): void {
        this.getTopologies();
        this.topologyService.changedTopology$.subscribe(value => this.getTopologies());
    }

    onSelect(topology: Topology): void {
        this.selectedTopology = topology;
        this.topologyService.selectedTopology(topology);
    }
}

