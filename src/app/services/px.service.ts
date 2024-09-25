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

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Auth-Token': environment.auth
  });
  
  headers2 = new HttpHeaders({
    'X-Auth-Token': environment.auth
  });
    
    constructor(
        private http: HttpClient,
    )  { }
    
    createPaciente(newPx: any){
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')+'');
        newPx.id_medico = currentUser.id_medico;
         console.log('createPaciente', newPx);    
        return this.http.post(environment.api + environment.cretePaciente, JSON.stringify(newPx), {headers: this.headers});
        
      }
    getPacientes(textFind: any): Observable<any> {
        
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')+'');    
        let params = new HttpParams()
          .set('texto', textFind)
          .set('id_medico', currentUser.id_medico);
        
        return this.http.get(environment.api + environment.queryPaciente, { headers: this.headers, params })
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
           console.log('Datos Generales', request);
           
        return this.http.post(environment.api + environment.postDatosGeneralesFm, JSON.stringify(request), { headers: this.headers });
        
    }
    deportivoFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Deportivo', request);
           
        return this.http.post(environment.api + environment.postDeportivoFm, JSON.stringify(request), { headers: this.headers });
        
    }
    medidasFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Medidas', request);
           
        return this.http.post(environment.api + environment.postMedidasFm, JSON.stringify(request), { headers: this.headers });
        
    }
    antecedentesFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Antecedentes', request);
           
        return this.http.post(environment.api + environment.postAntecedentesFm, JSON.stringify(request), { headers: this.headers });
        
    }
    antecedentesPatFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Antecedentes Patologicos', request);
           
        return this.http.post(environment.api + environment.postAntecedentesPatFm, JSON.stringify(request), { headers: this.headers  });
        
    }
    antecedentesNoPatFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Antecedentes No Patologicos', request);
           
        return this.http.post(environment.api + environment.postAntecedentesNoPatFm, JSON.stringify(request), {headers: this.headers });
        
    }
    mujerFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('En caso de ser mujer', request);
           
        return this.http.post(environment.api + environment.postMujerFm, JSON.stringify(request), { headers: this.headers});
        
    }
    pediatricoFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
           console.log('Pediatrico', request);
           
        return this.http.post(environment.api + environment.postPediatricoFm, JSON.stringify(request), { headers: this.headers});
        
    }
    fichamedicaAuxFm(request:any){
        const currentPx = sessionStorage.getItem('currentPxId'+'');
        request.id_paciente = currentPx;
      
           console.log('Ficha medica Aux', request);
           
        return this.http.post(environment.api + environment.postFichaMedicaAux, JSON.stringify(request), { headers: this.headers });
        
    }
    subirArchivo(archivoSeleccionado: File, nameFile: string) {

        const formData = new FormData();
        formData.append('archivo', archivoSeleccionado, nameFile);
        this.http.post(environment.api + environment.postFile, formData)
          .subscribe(
            (response) => {
              console.log('El archivo se ha subido correctamente:', response);
            },
            (error) => {
              console.error('Error al subir el archivo:', error);
            }
          );
    }
    subirVisita(formData: FormData): Observable<any> {
        return this.http.post(environment.api + environment.postFile, formData, { headers: this.headers2 });
    }
    
    getArchivo(nombreArchivo: string) {
      const headers2 = new HttpHeaders({
        'X-Auth-Token': environment.auth,
      });
      this.http.get(environment.api + environment.getFile, {
        headers: headers2,
        params: { path: nombreArchivo },
        responseType: 'blob' // Asegúrate de recibir el archivo como un blob
      }).subscribe((response: Blob) => {
        const fileURL = URL.createObjectURL(response);
        console.log(response);
        
        // Verificar el tipo de archivo
        if (response.type === 'application/pdf') {
          // Para PDFs
          window.open(fileURL);
        } else if (response.type.startsWith('image/')) {
          // Para imágenes
          // this.imagePreviewSrc = fileURL;
          // window.open(fileURL);
          console.log(fileURL);
          
        }
      }, error => {
        console.error('Error al obtener el archivo', error);
      });
    }

}