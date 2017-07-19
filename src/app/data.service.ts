import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private baseUrl = 'http://localhost:8080/'

    constructor (private http: Http) {}

    // baseurl                  endpoint  destination
    // ----------------------   --------  ---------------------
    // http://localhost:8080/   student   /dford@gmail.com/
    // http://localhost:8080/student/dford@gmail.com/
    // IMPORTANT: WHEN SENDING EMAIL ADDRESS IT MUST END WITH A '/'

    // executed from the login screen
    getStudentRecordByEmail(endpoint: string, email:string): Observable<object> {
        //console.log(email);
        let apiUrl = `${this.baseUrl}${endpoint}/${email}/`;
        console.log(apiUrl);
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

    // performed from saveStudent in student-form.component.ts
    editStudentRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;

        console.log("Updating in editStudentRecord: " + apiUrl)
        console.log(record)
        
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // performed from saveStudent in student-form.component.ts
    addStudentRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/add`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // RECRUITER GET, PUT, & POST
    getRecruiterRecord(endpoint: string, enterprise_id:string): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${enterprise_id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecruiterRecordByEnterprise(endpoint: string, enterprise_id:string): Observable<object> {
        console.log(enterprise_id);
        let apiUrl = `${this.baseUrl}${endpoint}/${enterprise_id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);

    }


    addRecruiterRecord(endpoint: string, record:object): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}/add`;
    console.log(apiUrl)
    return this.http.post(apiUrl, record)
        .map(this.extractData)
        .catch(this.handleError);
    }
        
    editRecruiterRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log(record)
        console.log(apiUrl)
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }




    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint + "/all";
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
        // console.log("Error: " + error);
        // return Observable.throw(error.message);
        let errMsg: string;
        if(typeof error._body === "string"){
            errMsg = error._body
        }else{
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                } 
            }
        }
        return Observable.throw(errMsg);
    }
        
} // end data service