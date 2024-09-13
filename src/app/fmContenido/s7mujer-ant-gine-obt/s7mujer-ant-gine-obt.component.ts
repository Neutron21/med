import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s7mujer-ant-gine-obt',
  templateUrl: './s7mujer-ant-gine-obt.component.html',
  styleUrls: ['./s7mujer-ant-gine-obt.component.scss']
})
export class S7mujerAntGineObtComponent implements OnInit {
  formData: any = {};
  showTable = false;
  body = {
      mecarca_p:'', 
      mecarca_e:'',
      dismenorreas_p:'', 
      dismenorreas_e:'',
      gestaActual_p:'',
      gestaActual_e:'',
      numeroGestas_p:'', 
      numeroGestas_e:'',
      numeroPartos_p:'', 
      numeroPartos_e:'',
      cesareas_p:'', 
      cesareas_e:'',
      aborto_p:'', 
      aborto_e:'',
      nacidosVivos_p:'', 
      nacidosVivos_e:'',
      menopausia_p:'', 
      menopausia_e:''
  }


  constructor( 
    private pxService: PxService,
    private authService: AuthService,    


  ) { }
  ngOnInit(): void {
    this.checkCurrentPxId();
  }
  checkCurrentPxId(): void {
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
            this.authService.getById('mujerFm','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response [0];
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }

  guardar() {
    sessionStorage.setItem('s7', JSON.stringify(this.body));
  }
  limpiar(id: any) {
    switch (id) {
      case 'mecarca':
        this.body.mecarca_p = '';
        this.body.mecarca_e = '';
        break;
      case 'dismenorreas':
        this.body.dismenorreas_p = '';
        this.body.dismenorreas_e = '';
        break;
      case 'gestaActual':
        this.body.gestaActual_p = '';
        this.body.gestaActual_e = '';
        break;
      case 'numeroGestas':
        this.body.numeroGestas_p = '';
        this.body.numeroGestas_e = '';
        break;
      case 'numeroPartos':
        this.body.numeroPartos_p = '';
        this.body.numeroPartos_e = '';
        break;
      case 'cesareas':
        this.body.cesareas_p = '';
        this.body.cesareas_e = '';
        break;
      case 'aborto':
        this.body.aborto_p = '';
        this.body.aborto_e = '';
        break;
      case 'nacidosVivos':
        this.body.nacidosVivos_p = '';
        this.body.nacidosVivos_e = '';
        break;
      case 'menopausia':
        this.body.menopausia_p = '';
        this.body.menopausia_e = '';
        break;
     
    }
  }
  
}
