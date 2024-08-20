import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  };
  
  constructor(
    private router: Router,
    private authServie: AuthService){}

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
    this.authServie.logOut();
   }
   consulta(){
   }
  cargarData(){
  }
  validarSesion(){
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      const uid = sessionStorage.getItem('uid');
      const usuario = JSON.parse(sessionStorage.getItem('currentUser') + '');
      this.user.nombre = usuario ? usuario.nombre : "";
      this.user.owner = usuario ? usuario.owner : "";
      this.user.rol = usuario ? usuario.paquete : "";
      return !!uid;
    } else {
      return false;
    }
  }

}
