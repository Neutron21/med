import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class PxService {
    
    constructor(
        private http: HttpClient,
    )  { }
    
    createPay(newPx: any){
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPay', newPx);
           
        return this.http.post(environment.api + environment.cretePaciente, JSON.stringify(newPx), { headers });
        
      }
}