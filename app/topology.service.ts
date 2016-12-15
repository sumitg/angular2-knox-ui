import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';
import { Topology } from './topology';

@Injectable()
export class TopologyService {

    apiUrl = 'http://localhost:8443/gateway/admin/api/v1/';
    topologiesUrl = this.apiUrl + 'topologies';
    selectedTopologySource = new Subject<Topology>();
    selectedTopology$ = this.selectedTopologySource.asObservable();
    changedTopologySource = new Subject<string>();
    changedTopology$ = this.changedTopologySource.asObservable();

    constructor(private http: Http) { }

    getTopologies(): Promise<Topology[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.topologiesUrl, {
            headers: headers
        } )
            .toPromise()
            .then(response => response.json().topologies.topology as Topology[])
            .catch(this.handleError);
    }

    getTopology(href : string): Promise<string> {
        let headers = new Headers();
        this.createXmlAuthorizationHeader(headers);
        return this.http.get(href, {
            headers: headers
        } )
            .toPromise()
            .then(response => response.text())
            .catch(this.handleError);

    }

   saveTopology(url: string, xml : string): Promise<string> {
        let xheaders = new Headers();
        this.createXmlAuthorizationHeader(xheaders);
        return this.http
    .put(url, xml, {headers: xheaders})
    .toPromise()
    .then(() => xml)
    .catch(this.handleError);

    }

   createTopology(name: string, xml : string): Promise<string> {
        let xheaders = new Headers();
        this.createXmlAuthorizationHeader(xheaders);
        let url = this.topologiesUrl + "/" + name;
        return this.http
    .put(url, xml, {headers: xheaders})
    .toPromise()
    .then(() => xml)
    .catch(this.handleError);
    }

    deleteTopology(href: string): Promise<string> {
       let headers = new Headers();
        this.createAuthorizationHeader(headers);        
        return this.http.delete(href, {
            headers: headers
        } )
            .toPromise()
            .then(response => response.text())
            .catch(this.handleError);
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('admin:admin-password'));
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
    }

    createXmlAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('admin:admin-password'));
        headers.append('Accept', 'application/xml');
        headers.append('Content-Type', 'application/xml');
    }


    selectedTopology(value: Topology) {
        this.selectedTopologySource.next(value);
    }

    changedTopology(value: string) {
        this.changedTopologySource.next(value);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}