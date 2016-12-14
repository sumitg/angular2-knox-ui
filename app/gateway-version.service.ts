import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GatewayVersion } from './gateway-version';

@Injectable()
export class GatewayVersionService {

    private apiUrl = 'http://localhost:8443/gateway/admin/api/v1/version';

    constructor(private http: Http) { }

    getVersion(): Promise<GatewayVersion> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.apiUrl, {
            headers: headers
        } )
            .toPromise()
            .then(response => response.json().ServerVersion as GatewayVersion)
            .catch(this.handleError);
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('admin:admin-password'));
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}