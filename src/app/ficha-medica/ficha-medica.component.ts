import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared.service';
import { Secciones } from '../models/secciones';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.component.html',
  styleUrls: ['./ficha-medica.component.scss']
})
export class FichaMedicaComponent implements OnInit {
  showSection: Secciones = {
    s1: true,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
    s8: false, 
    s9: false
  }
  constructor(
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.seccionObservable.subscribe((activeSection: Secciones) => {
      console.log('El destino ha cambiado:', activeSection);
      this.showSection = activeSection;
    });
    
   }

  ngOnInit(): void {
  }
  mostrarSeccion(seccion: keyof Secciones) {
    const nuevaSeccion: Secciones = {
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false,
      s8: false,
      s9: false
    };
  
    nuevaSeccion[seccion] = true;
  
    this.sharedDataService.updateSeccion(nuevaSeccion);
  }
  

}
