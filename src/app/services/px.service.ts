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
    datosGeneralesPost(request: any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postDatosGeneralesFm, JSON.stringify(request), { headers });
        
    }
    deportivoFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postDeportivoFm, JSON.stringify(request), { headers });
        
    }
    medidasFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postMedidasFm, JSON.stringify(request), { headers });
        
    }
    antecedentesFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postAntecedentesFm, JSON.stringify(request), { headers });
        
    }
    antecedentesPatFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postAntecedentesPatFm, JSON.stringify(request), { headers });
        
    }
    antecedentesNoPatFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postAntecedentesNoPatFm, JSON.stringify(request), { headers });
        
    }
    mujerFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postMujerFm, JSON.stringify(request), { headers });
        
    }
    pediatricoFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postPediatricoFm, JSON.stringify(request), { headers });
        
    }
    fichamedicaAuxFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
        const headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Auth-Token': environment.auth
           });
           console.log('createPaciente', request);
           
        return this.http.post(environment.api + environment.postFichaMedicaAux, JSON.stringify(request), { headers });
        
    }
   

}