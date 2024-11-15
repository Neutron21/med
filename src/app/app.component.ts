import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MED Proyect';
  calendarOptions: CalendarOptions|undefined;
  constructor(
    private authService: AuthService
  ) {
    this.setLogoutTimer();
  }
  setLogoutTimer() {
    setTimeout(() => {
      this.authService.logOut();
    }, 14400000); 
  }
}
