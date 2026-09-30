import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared.service';
import { Secciones } from '../models/secciones';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.component.html',
  styleUrls: ['./ficha-medica.component.scss']
})

export class FichaMedicaComponent implements OnInit, OnDestroy {
  
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
  selectedSection = 's1';
  private destroy$ = new Subject<void>();

  constructor(
    private sharedDataService: SharedDataService

  ) {
    sessionStorage.setItem('currentSection', 's1');
  }

  ngOnInit(): void { 
      this.sharedDataService.seccionObservable.pipe(takeUntil(this.destroy$))
      .subscribe((activeSection: Secciones) => {
        console.log('El destino ha cambiado:', activeSection);
        this.showSection = activeSection;
    });
   }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('Suscripción destruida ✅');
  }

  mostrarSeccion(seccion: keyof Secciones) {

    if (this.allSectionsVisible) {
      this.allSectionsVisible = false;
    }

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
    this.selectedSection = seccion;
    sessionStorage.setItem('currentSection', seccion);
    this.sharedDataService.updateSeccion(nuevaSeccion);
  }

  seleccionarVista(vista: string): void {
    if (vista === 'all') {
      this.allSectionsVisible = true;
      this.selectedSection = 'all';
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
      this.sharedDataService.updateSeccion(this.showSection);
    } else if (vista in this.showSection) {
      this.mostrarSeccion(vista as keyof Secciones);
    }
  }
  
}
