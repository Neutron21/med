import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {


  tipoBusqueda = 'p';
  labelBuqueda = 'Pacientes';
  constructor() { }

  ngOnInit(): void {
  }
  selectBusqueda(event: any){
    console.log('Click', event.target.checked);
    this.tipoBusqueda = event.target.checked ? 'c' : 'p';
    this.labelBuqueda = event.target.checked ? 'Pagos' : 'Pacientes';
  }
}
