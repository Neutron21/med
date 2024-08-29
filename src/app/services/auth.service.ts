import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { initializeApp } from 'firebase/app';
import { environment } from "src/environments/environment";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";


@Injectable({
    providedIn:'root'
})

export class AuthService {
    
    constructor(private router: Router){}

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
          console.log('eee', error);
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
        sessionStorage.removeItem('uid');
        sessionStorage.removeItem('user');
        this.isLoggedIn = false;
      }
      getIsLoged (){
        const sessionTrue = sessionStorage.getItem('uid');
        this.isLoggedIn = sessionTrue !== null ? true : false;
        return this.isLoggedIn;
      }
}

