import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { initializeApp } from 'firebase/app';
import { environment } from "src/environments/environment";
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private app = initializeApp(environment.firebaseConfig);
    private auth = getAuth();
    private uid = '';
    private user = '';
    private isLoggedIn = false;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.checkAuthState();
    }

    async signIn(email: string, password: string): Promise<any> {
        try {
            const credentials = await signInWithEmailAndPassword(this.auth, email, password);
            // console.log(credentials,"HOLA")
            this.uid = credentials.user.uid;
            this.user = credentials.user.email || '';
            this.setLogin();
            this.router.navigateByUrl('/registro');
            return credentials.user;
        } catch (error: any) {
            console.log('Error al iniciar sesión', error);
            return error;
        }
    }

    private setLogin() {
        sessionStorage.setItem('uid', this.uid);
        sessionStorage.setItem('user', this.user);
        this.isLoggedIn = true;
    }

    logOut() {
        signOut(this.auth).then(() => {
            this.setLogOut();
            this.router.navigateByUrl('/');
        }).catch((error) => {
            console.log('Error al cerrar sesión', error);
        });
    }

    private setLogOut() {
        sessionStorage.clear();
        this.isLoggedIn = false;
    }

    getIsLogged() {
        return !!sessionStorage.getItem('uid');
    }

    // Verificar el estado de autenticación al cargar la aplicación
    private checkAuthState() {
        onAuthStateChanged(this.auth, (user) => {
            if (user && sessionStorage.getItem('uid')) {
                // El usuario está autenticado y los datos están en sessionStorage
                this.isLoggedIn = true;
            } else {
                // No hay usuario autenticado o la sesión ha caducado
                this.setLogOut();
            }
        });
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
