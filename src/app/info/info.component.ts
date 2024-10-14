import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  infoList = [
    { 
      title: 'Registro de Paciente', 
      content: `
        <ul>
          <li>Paso 1: Llena todos los campos requeridos</li>
          <li>Paso 2: Los campos de Nombre y Apellido solo aceptan texto</li>
          <li>Paso 3: Eel campo de telefono solo acepta 10 digitos</li>
          <li>Paso 4:El campo de mail solo acepta formto de Email algo@.com</li
        </ul>
        `,
        imgPath: '../../assets/gifts/registro.gif'
    },
    { 
      title: 'Registro de Pago', 
      content: `
        <ol>
          <li>Introdusca el método de pago solo acepta numeros</li>
          <li>Selecione el concepto correspondiente</li>
          <li>Seleccione la fecha</li>
          <li>Seleccione el tipo de pago</li>
          <li>Agrege algun comentario , este puede ser opcional</li>
        </ol>`
    },
    { 
      title: 'Busqueda', 
      content: `
        <ol>
          <li>Le ayudara a hacer una busqueda de pacientes  ya sea por nombre, apellido o diagnostico o 
          tambien buscar pagos</li>
          <li>Para poder utilizar el buscador de pagos debe selecionar el boton pagos e indicar de que fecha a que fecha 
          desea buscar y selecione el tipo de pago </li>
        </ol>`
    },
    { 
      title: 'Ficha Medica', 
      content: `
        <ol>
          <li></li>
          <li></li>
          <li></li>
        </ol>`
    },
    { 
      title: '', 
      content: `
        <ol>
          <li>Selecciona el método de pago</li>
          <li>Introduce los datos correctos</li>
          <li>Confirma la información antes de proceder</li>
        </ol>`
    },
  ];
  
  activeIndex: number | null = null;

  toggleInfo(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
