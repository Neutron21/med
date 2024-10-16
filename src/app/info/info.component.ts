import { Content } from '@angular/compiler/src/render3/r3_ast';
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
          <li>1: Llena todos los campos requeridos.</li>
          <li>2: Los campos de Nombre y Apellido solo aceptan texto.</li>
          <li>3: El campo de teléfono solo acepta números y contenido de 10 dígitos.</li>
          <li>4: El campo de email solo acepta el sigueinte formato:  algo@dominio.com.</li>
        </ul>
        `,
        imgPath: '../../assets/gifts/registro.gif' 
    },
    { 
      title: 'Registro de Pago', 
      content: `
        <ol>
          <li>Introduce la cantidad de pago; solo se aceptan números.</li>
          <li>Selecciona el concepto correspondiente.</li>
          <li>Siempre te dara la fecha actual o tambien tienes la opcion de cambiar la fecha del registro.</li>
          <li>Selecciona el tipo de pago.</li>
          <li>Agrega algún comentario, este puede ser opcional.</li>
        </ol>
        `,
        imgPath: '../../assets/gifts/pagos.gif' 
    },
    { 
      title: 'Búsqueda', 
      content: `
        <ol>
          <li>Te ayudará a realizar una búsqueda de pacientes ya sea por nombre, apellido, diagnóstico o también buscar pagos.</li>
          <li>Para utilizar el buscador de pagos, selecciona el botón "Pagos" e indica de qué fecha a qué fecha deseas buscar, y selecciona el tipo de pago.</li>
        </ol>
        `,
        imgPath: '../../assets/gifts/busqueda.gif' 
    },
    { 
      title: 'Ficha Médica', 
      content: `
        <ol>
          <li>Muestra una ventana emergente que indica que el paciente ha sido creado con éxito.</li>
          <li>Muestra la Ficha Medica para comenzar el llenado.</li>
          <li>Al darle click en el boton de tache , cerrar y al cambiar de pestaña se guardara la informacion capturada.</li>
        </ol>
        `,
        imgPath: '../../assets/gifts/modalFichaMedica.gif' 
    },

];

  
  activeIndex: number | null = null;

  toggleInfo(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
