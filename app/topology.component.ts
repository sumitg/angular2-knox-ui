import {Component, OnInit} from '@angular/core';
import {Topology} from './topology';
import {TopologyService} from "./topology.service";
import { Router } from '@angular/router';
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

       `,
    providers: [TopologyService]
})
// <topology-detail [populateContent]="selectedTopology"></topology-detail>
export class TopologyComponent implements OnInit {

    value :any;
    topologies: Topology[];
    selectedTopology: Topology;


    constructor(    private router: Router,
                    private topologyService : TopologyService) {
    }

    getTopologies(): void {
        this.topologyService.getTopologies().then(topologies => this.topologies = topologies);
    }

    ngOnInit(): void {
        this.getTopologies();
        this.topologyService.changeTopologySource.subscribe(value => console.log('received new subject value: '));
    }

    onSelect(topology: Topology): void {
        this.selectedTopology = topology;
        this.router.navigate(['/detail', this.selectedTopology.href]);
    }
}

