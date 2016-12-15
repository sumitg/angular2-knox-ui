import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { Topology } from './topology';
import {TopologyService} from "./topology.service";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'topology-detail',
    template: `
  <!--<tabs>
      <tab [tabTitle]="'XML'"></tab>
      <tab tabTitle="JSON"></tab>
    </tabs>
    -->
    <div *ngIf="topology" class="panel-body">
      <div ace-editor
       [readOnly]="false" [text]="topology | xml" [mode]="'xml'"
        [theme]="'monokai'"
         style="min-height: 300px; width:100%; overflow: auto;" (textChanged)="onChange($event)"></div>
       <div class="panel-footer">
        <button (click)="duplicateModal.open('sm')" class="btn btn-default btn-sm" type="submit">
            <span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>
        </button>
        <button (click)="deleteConfirmModal.open('sm')" class="btn btn-default btn-sm" type="submit">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </button>
       <button (click)="saveTopology()" class="btn btn-default btn-sm pull-right" [disabled]="!changedTopology" type="submit">
            <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
        </button>
       </div>
         
    </div>
    <modal (onClose)="createTopology()" #duplicateModal>

        <modal-header [show-close]="true">
            <h4 class="modal-title">Create a new copy</h4>
        </modal-header>
        <modal-body>
            <div class="form-group">
                <label for="textbox">Name the new topology</label>
                <input autofocus type="text" class="form-control" required [(ngModel)]="newTopologyName" id="textbox">
            </div> 
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-default btn-sm" data-dismiss="duplicateModal" (click)="duplicateModal.dismiss()">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" [disabled]="!newTopologyName" (click)="duplicateModal.close()">Ok</button>
        </modal-footer>
    </modal>
    <modal (onClose)="deleteTopology()" #deleteConfirmModal>
        <modal-header [show-close]="true">
            <h4 class="modal-title">Deleting Topology</h4>
        </modal-header>
        <modal-body>
            Are you sure you want to delete the topology?
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-default btn-sm" data-dismiss="deleteConfirmModal" (click)="deleteConfirmModal.dismiss()">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" (click)="deleteConfirmModal.close()">Ok</button>
        </modal-footer>
    </modal>
  `
})

export class TopologyDetailComponent implements OnInit {
    // @Input()
    topology: string;
    changedTopology: string;
    url: string;
    newTopologyName: string;

    @ViewChild('duplicateModal')
    duplicateModal: ModalComponent;

    @ViewChild('deleteConfirmModal')
    deleteConfirmModal: ModalComponent;


    constructor(private topologyService : TopologyService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.topologyService.getTopology(this.url = params['href']))
            .subscribe(topology => this.topology = topology);
    }

    onChange(code: any) {
        this.changedTopology = code;
    }

    saveTopology() {
        this.topologyService.saveTopology(this.url, this.changedTopology);
    }

    createTopology() {
        if (this.changedTopology) {
            this.topologyService.createTopology(this.newTopologyName, this.changedTopology);
        } else {
            this.topologyService.createTopology(this.newTopologyName, this.topology);
        }
        this.topologyService.changedTopology("created top");
        // this.router.navigate(['/detail', this.topologyService.topologiesUrl, this.newTopologyName]);

    }

    deleteTopology() {
        this.topologyService.deleteTopology(this.url);
        this.topologyService.changedTopology("deleted topology");        

        // this.router.navigate(['/detail']);
    }

    // @Input() set populateContent(topology: Topology){
    //     this.topology = topology;
    //     if (this.topology) {
    //         if (this.topology.href) {
    //             this.topologyService.getTopology(this.topology.href).then( content => this.topology.content = content);
    //         }
    //     }
    // }
}
