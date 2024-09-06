import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';
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
    private pxService: PxService


  ) { }

  ngOnInit(): void {
    this.pxService.medidasFm(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
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
