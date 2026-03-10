import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CalendarOptions } from '@fullcalendar/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MED Proyect';
  calendarOptions: CalendarOptions | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.setLogoutTimer();

    // 🔹 cerrar modales cuando cambias de ruta o usas la flecha atrás
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        // cerrar modales abiertos
        document.querySelectorAll('.modal.show').forEach(modal => {
          (bootstrap.Modal.getInstance(modal as HTMLElement))?.hide();
        });

        // eliminar fondo oscuro
        const backdrops = document.getElementsByClassName('modal-backdrop');
        while (backdrops.length > 0) {
          backdrops[0].parentNode?.removeChild(backdrops[0]);
        }

        document.body.classList.remove('modal-open');
      }
    });

  }

  setLogoutTimer() {
    setTimeout(() => {
      this.authService.logOut();
    }, 14400000); 
  }
}