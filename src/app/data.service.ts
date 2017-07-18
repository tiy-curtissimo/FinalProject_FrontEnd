import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private baseUrl = 'http://localhost:8080'

    constructor (private http: Http) {}

    // baseurl                  endpoint  destination
    // ----------------------   --------  ---------------------
    // http://localhost:8080/   student   /techlogenge@gmail.com

    // executed from the login screen
    getStudentRecordByEmail(endpoint: string, email:string): Observable<object> {
        console.log(email);
        let apiUrl = `${this.baseUrl}${endpoint}/${email}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    // executed for edit
    getStudentRecordById(endpoint: string, id:number): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    return this.http.get(apiUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    editStudentRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log(record)
        console.log(apiUrl)
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }
        
    addStudentRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }


   getRecruiterRecord(endpoint: string, n_number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${n_number}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addRecruiterRecord(endpoint: string, record:object): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}`;
    console.log(apiUrl)
    return this.http.post(apiUrl, record)
        .map(this.extractData)
        .catch(this.handleError);
    }




    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    deleteRecord(endpoint: string, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.delete(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }



    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        
        return Observable.throw(error.message);
    }


}
