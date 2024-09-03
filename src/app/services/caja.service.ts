import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
    providedIn:'root'
})
export class CajaService {
    currentUser: any = {}
    
    constructor(
        private http: HttpClient,
    )  { 
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')+'');
    }
    
    createPay(newPay: any){
        newPay.id_medico = this.currentUser.id_medico;
        
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPay', newPay);
           
        return this.http.post(environment.api + environment.createPay, JSON.stringify(newPay), { headers });
        
      }
      getPays(formPay: any): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Auth-Token': environment.auth
        });
      
        let params = new HttpParams()
          .set('tipo', formPay.tipo)
          .set('id_medico', this.currentUser.id_medico)
          .set('desde', formPay.desde)
          .set('hasta', formPay.hasta);
        
        return this.http.get(environment.api + environment.queryPay, { headers, params })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error al hacer la solicitud', error);
            return throwError(() => new Error('Error al hacer la solicitud: ' + error.message));
          })
        );
      }
}