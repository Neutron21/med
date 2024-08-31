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
}