import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { PxService } from '../services/px.service';
import { Modal } from 'bootstrap';
import { SharedDataService } from '../services/shared.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-table-px',
  templateUrl: './table-px.component.html',
  styleUrls: ['./table-px.component.scss']
})
export class TablePxComponent implements OnInit, AfterViewInit {

  buscarPxForm!: FormGroup;
  showSpiner: boolean = false;
  pxList: any = [];
  nameToShow: string = '';
  secciones = {
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
    private utilService: UtilService,
    private pxService: PxService,
    private sharedDataService: SharedDataService
  ) { 
    this.buscarPxForm = new FormGroup({
      textoFind: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  validateTextInput(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 13) {
      this.buscarPx();
    }
    return this.utilService.onlyText(event);
  }

  buscarPx() {
    const pxControl = this.buscarPxForm.get('textoFind');
    if (!!pxControl?.value) {
      this.showSpiner = true;
      this.pxService.getPacientes(pxControl.value).subscribe(
        (response) => {
          this.pxList = response;
          this.showSpiner = false;
        },
        (error) => {
          this.showSpiner = false;
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }

  openFichaMedica(idPx: number) {
    sessionStorage.setItem('currentPxId', idPx.toString());
    sessionStorage.setItem('currentSection', 's1');
    this.sharedDataService.updateSeccion(this.secciones);
    this.upDateIdPaciente(idPx);
    const modalElement = document.getElementById('fichaModalTable');
    const modal = new Modal(modalElement!);
    const pxToShow = this.pxList.find((el: { id: number; }) => idPx == el.id);
    this.nameToShow = `${pxToShow.nombre} ${pxToShow.apellido_p} ${pxToShow.apellido_m}`;
    modal.show();
  }

  openHistorial(idPx: number) {
    sessionStorage.setItem('currentPxId', idPx.toString());
    this.upDateIdPaciente(idPx);
    const modalElement = document.getElementById('historialModalTable');
    const modal = new Modal(modalElement!);
    const pxToShow = this.pxList.find((el: { id: number; }) => idPx == el.id);
    this.nameToShow = `${pxToShow.nombre} ${pxToShow.apellido_p} ${pxToShow.apellido_m}`;
    modal.show();
  }

  upDateIdPaciente(id: number) {
    this.sharedDataService.cambiarIdPaciente(id);
  }

  async resetModal() { // GUARDAMOS Y BORRAMOS DATOS DE FICHA MEDICA en SessionStorage
    console.log('verTodo',this.sharedDataService.verTodo);
    
    const currSec = sessionStorage.getItem('currentSection');
    await this.sharedDataService.seccionesCompletadas(currSec);

    // await Object.keys(this.secciones).forEach(key => {
    //   console.log(key);
    //    this.sharedDataService.seccionesCompletadas(key);
    // });
    // sessionStorage.removeItem('currentSection');
    // sessionStorage.removeItem('currentPxId');
    this.sharedDataService.cleanSessionStorage();
  }
}
