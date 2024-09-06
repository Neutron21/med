import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
    providedIn:'root'
})
export class PxService {
    
    constructor(
        private http: HttpClient,
    )  { }
    
    createPaciente(newPx: any){
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')+'');
        newPx.id_medico = currentUser.id_medico;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', newPx);
           
        return this.http.post(environment.api + environment.cretePaciente, JSON.stringify(newPx), { headers });
        
      }
      getPacientes(textFind: any): Observable<any> {
        
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')+'');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Auth-Token': environment.auth
        });
      
        let params = new HttpParams()
          .set('texto', textFind)
          .set('id_medico', currentUser.id_medico);
        
        return this.http.get(environment.api + environment.queryPaciente, { headers, params })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error al hacer la solicitud', error);
            return throwError(() => new Error('Error al hacer la solicitud: ' + error.message));
          })
        );
      }
}