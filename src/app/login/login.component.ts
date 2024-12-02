import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  analytics: any;
  mostrarPassword: boolean = false;
  badCredentials: boolean = false;
  showSpiner: boolean = false;
  campoVacio: boolean = false;
  nombre : string = ''

  constructor(
   private authService: AuthService,
   private sharedservice: SharedDataService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}
  showPass() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  async sendCredentials() {
    this.campoVacio = false;
    this.badCredentials = false;
  
    if (this.loginForm.valid) {
      this.showSpiner = true;
      try {
       // login.component.ts
      const credentials = await this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
      this.badCredentials = !this.authService.getIsLogged();
        this.getUserByEmail();
        this.showSpiner = false;
      } catch (error) {
        console.log(error);
        this.badCredentials = true;
        this.showSpiner = false;
      }
    } else {
      this.campoVacio = true;
    }
  }
  
  getUserByEmail() {
    const email = sessionStorage.getItem('user');
    if (email) {
      this.authService.getById('medicos', 'email', email).subscribe(
        (response) => {
          console.log('Datos del usuario:', response[0]);
          this.nombre = response.nombre;
  
          // Al obtener los datos, emites el idDoctor
          const user = response[0]; // Asegúrate de que `response[0]` contiene el idDoctor
          this.sharedservice.cambiarIdDoctor(user);  // Emite el idDoctor
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('UID no encontrado en sessionStorage');
    }
  }
  
 
  
  }


