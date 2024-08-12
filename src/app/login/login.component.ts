import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
   private router: Router,
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
    const { email, password } = this.loginForm.value;
    console.log(email,password)
    if(!!email && !!password) {
      this.showSpiner = true;
      try {
        this.showSpiner = false;
        this.router.navigate(['/home']);
        this.getUserById();
      } catch (error) {
        console.log(error);
        this.badCredentials = true;
        this.showSpiner = false;
      }
    } else {
      this.campoVacio = true;

    } 
  }
  getUserById() {
   
  }
 
  
  }


