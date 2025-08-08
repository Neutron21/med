import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {


  tipoBusqueda = 'p';
  busquedaCheck: boolean = false;
  labelBuqueda = 'Pacientes';
  constructor(private sharedService: SharedDataService) { 
    const busqueda = sessionStorage.getItem('busquedaCheck');
    this.busquedaCheck = busqueda === 'true'; 
    this.tipoBusqueda = this.busquedaCheck ? 'c' : 'p';
    this.labelBuqueda = this.busquedaCheck ? 'Pagos' : 'Pacientes';
  }

  ngOnInit(): void {
    this.sharedService.cleanSessionStorage();
  }
  selectBusqueda(event: any){
    console.log('Click', event.target.checked);
    sessionStorage.setItem('busquedaCheck', event.target.checked);
    this.tipoBusqueda = event.target.checked ? 'c' : 'p';
    this.labelBuqueda = event.target.checked ? 'Pagos' : 'Pacientes';
  }
}
