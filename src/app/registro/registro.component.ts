import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  resultQuery: any;
  formData: any = {
    email: '',
    nombre: '',
    fechaNacimiento: '',
    doctorId: null,
    diagnostico: '',
    observaciones: ''
  };


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('Formulario enviado', this.formData);

}
onKeyPress(event: KeyboardEvent) {
  const inputChar = String.fromCharCode(event.keyCode);
  const pattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/;
  
  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}
