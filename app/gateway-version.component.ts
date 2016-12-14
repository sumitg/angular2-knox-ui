import {Component, OnInit} from '@angular/core';
import {GatewayVersion} from './gateway-version';
import {GatewayVersionService} from "./gateway-version.service";


@Component({
    selector: 'gateway-version',
    template: `
        <div *ngIf="gatewayVersion">
            <span class="small">Knox Gateway Version {{this.gatewayVersion.version}}</span>
            <span class="small">Hash {{this.gatewayVersion.hash}}</span>
</div>`,
    providers: [GatewayVersionService]
})

export class GatewayVersionComponent implements OnInit {

    gatewayVersion : GatewayVersion;

    constructor(private gatewayVersionService : GatewayVersionService) {
    }

    getVersion(): void {
        this.gatewayVersionService.getVersion().then( gatewayVersion => this.gatewayVersion = gatewayVersion);
    }

    ngOnInit(): void {
        this.getVersion();
    }


}

