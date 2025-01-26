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
  };
  
  allSectionsVisible = false;

  constructor(
    private sharedDataService: SharedDataService

  ) {
    sessionStorage.setItem('currentSection', 's1');
    this.sharedDataService.seccionObservable.subscribe((activeSection: Secciones) => {
      console.log('El destino ha cambiado:', activeSection);
      this.showSection = activeSection;
    });
  }

  ngOnInit(): void {}

  mostrarSeccion(seccion: keyof Secciones) {

    if (this.allSectionsVisible) {
      this.toggleAllSections(); 
    }
    const currSec = sessionStorage.getItem('currentSection');
    console.log('Estabas en ' + currSec);
    this.sharedDataService.seccionesCompletadas(currSec);
    console.log('Ahora estas en')

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
    console.log(seccion);
    
    sessionStorage.setItem('currentSection', seccion);
    this.sharedDataService.updateSeccion(nuevaSeccion);
  }

  async toggleAllSections() {

    this.allSectionsVisible = !this.allSectionsVisible;

    if (this.allSectionsVisible) {
      this.showSection = {
        s1: true,
        s2: true,
        s3: true,
        s4: true,
        s5: true,
        s6: true,
        s7: true,
        s8: true,
        s9: true
      };
    } else {
      await Object.keys(this.showSection).forEach(key => {
        console.log(key);
         this.sharedDataService.seccionesCompletadas(key);
      });
      this.sharedDataService.cleanSessionStorage();
      this.mostrarSeccion('s1');
    }

    this.sharedDataService.updateSeccion(this.showSection);
  }
  
}
