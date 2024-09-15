import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { initializeApp } from 'firebase/app';
import { environment } from "src/environments/environment";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class AuthService {
    
    constructor(
      private router: Router,
      private http: HttpClient,
    ){}

    private app = initializeApp(environment.firebaseConfig);
    private auth = getAuth();
    private uid = '';
    private user = '';
    private isLoggedIn = false;

    async singIn(email: string, password: string): Promise<any> {
        try {
          const credentials = await signInWithEmailAndPassword(this.auth, email, password);
          this.uid = credentials.user.uid;
          this.user = credentials.user.email + '';
          this.setLogin();
          console.log(credentials);
          this.router.navigateByUrl('/registro');
          return credentials.user;
        } catch (error: any) {
          console.log('error', error);
          return error;
        }
      }
      setLogin() {
        sessionStorage.setItem('uid', this.uid);
        sessionStorage.setItem('user', this.user);
        this.isLoggedIn = true;
      }
      logOut() {
        signOut(this.auth).then(() => {
        this.setLogOut();
        this.router.navigateByUrl('/');
          }).catch((error) => {
            console.log('Error de Logout', error);
          });
        }
      setLogOut(){
        sessionStorage.clear()
        this.isLoggedIn = false;
      }
      getIsLoged (){
        const sessionTrue = sessionStorage.getItem('uid');
        this.isLoggedIn = sessionTrue !== null ? true : false;
        return this.isLoggedIn;
      }
      getById(tabla: string, campo: string, valor: string): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Auth-Token': environment.auth
        });
      
        let params = new HttpParams()
          .set('tabla', tabla)
          .set('campo', campo)
          .set('valor', valor);
      
        return this.http.get(environment.api + environment.query, { headers, params })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error al hacer la solicitud', error);
            return throwError(() => new Error('Error al hacer la solicitud: ' + error.message));
          })
        );
      }
}

