import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  user = {
    nombre : '',
    owner : false,
    rol : '',
    idDoctor: ''
  };
  
  constructor(
    private authService: AuthService,
    private sharedservice: SharedDataService) {
      this.sharedservice.idDoctorObservable.subscribe((usuarioLogueado) => {
        this.user = usuarioLogueado;
      });
    }

  ngOnInit(): void {
    this.validarSesion();
  }
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  collapseNavbar() {
    this.isCollapsed = true;
  }
  cerrarSesion(){
    this.authService.logOut();
   }
   validacionUsuario(): boolean {
    return this.authService.getIsLogged();
  }
 
  validarSesion() {
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      try {
        const uid = sessionStorage.getItem('uid');
        const usuario = JSON.parse(sessionStorage.getItem('currentUser') + '');
  
        this.user.nombre = usuario ? usuario.nombre : "";
        this.user.owner = usuario ? usuario.owner : "";
        this.user.rol = usuario ? usuario.paquete : "";  
        
  
        return !!uid;
      } catch (error) {
        this.authService.logOut();
        return false;
      }
    } else {
      return false;
    }
  }
  

}
