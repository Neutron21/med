import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s3medidas-fisicas',
  templateUrl: './s3medidas-fisicas.component.html',
  styleUrls: ['./s3medidas-fisicas.component.scss']
})
export class S3medidasFisicasComponent implements OnInit {
  formData: any = {};
 body= {
  peso: '',
  talla: '',
  estatura: '',
  imc: '',
  temperatura: '',
  fCardiaca: '',
  fRespiratoria: '',
  tensionArterial: ''
 }

  constructor(
    private utilService: UtilService,
    private authService: AuthService


  ) { }

  ngOnInit(): void {
    this.checkCurrentPxId();
  }
  checkCurrentPxId(): void {
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
            this.authService.getById('medidasFm','id_paciente', currentPxId).subscribe(
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
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  onlyNumbers(event: KeyboardEvent): void {
    this.utilService.onlyNumbers(event);

  }
  guardar() {
    sessionStorage.setItem('s3', JSON.stringify(this.body));
  }

}
