import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Topology } from './topology';
import {TopologyService} from "./topology.service";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'topology-detail-panel',
    template: `
     <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">{{title}} <span class="label label-default pull-right">{{titleSuffix}}</span></h4>
         </div>
     <div *ngIf="topologyContent" class="panel-body">
      <div ace-editor
       [readOnly]="false" [text]="topologyContent | xml" [mode]="'xml'"
        [theme]="'monokai'"
         style="min-height: 300px; width:100%; overflow: auto;" (textChanged)="onChange($event)">
      </div>
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
export class TopologyDetailPanelComponent implements OnInit {

    title = 'Topology Detail';
    titleSuffix: string;
    topology: Topology;
    topologyContent: string;
    changedTopology: string;
    newTopologyName: string;

    @ViewChild('duplicateModal')
    duplicateModal: ModalComponent;

    @ViewChild('deleteConfirmModal')
    deleteConfirmModal: ModalComponent;

    constructor(private topologyService : TopologyService) {
    }

    ngOnInit(): void {
        this.topologyService.selectedTopology$.subscribe(value => this.populateContent(value));
    }

    setTitle(value : string) {
        this.titleSuffix = value;
    }

    onChange(code: any) {
        this.changedTopology = code;
    }

    saveTopology() {
        this.topologyService.saveTopology(this.topology.href, this.changedTopology)
        .then(value => this.topologyService.changedTopology(this.topology.name));
    }

    createTopology() {
        if (this.changedTopology) {
            this.topologyService.createTopology(this.newTopologyName, this.changedTopology)
            .then(value => this.topologyService.changedTopology(this.newTopologyName));
        } else {
            this.topologyService.createTopology(this.newTopologyName, this.topologyContent)
            .then(value => this.topologyService.changedTopology(this.newTopologyName));
        }
    }

    deleteTopology() {
        this.topologyService.deleteTopology(this.topology.href).then(value => this.topologyService.changedTopology(this.topology.name));
    }

    populateContent(topology: Topology) {
        this.topology = topology;
        this.setTitle(topology.name);
        if (this.topology) {
            if (this.topology.href) {
                this.topologyService.getTopology(this.topology.href).then( content => this.topologyContent = content);
            }
        }
    }


}