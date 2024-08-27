import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class CajaService {
    
    constructor(
        private http: HttpClient,
    )  { }
    
    createPay(newPay: any){
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPay', newPay);
           
        return this.http.post(environment.api + environment.createPay, JSON.stringify(newPay), { headers });
        
      }
}