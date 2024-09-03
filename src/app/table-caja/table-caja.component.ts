import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';

@Component({
  selector: 'app-table-caja',
  templateUrl: './table-caja.component.html',
  styleUrls: ['./table-caja.component.scss']
})
export class TableCajaComponent implements OnInit {

  buscarPagoForm: FormGroup;
  pagos: any[] = [];
  constructor(
    private cajaService: CajaService,
  ) { 
    this.buscarPagoForm = new FormGroup({
      desde: new FormControl(null,Validators.required),
      hasta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, ),
    });
  }

  ngOnInit(): void {
  }
  buscarPago() {
    const desdeControl = this.buscarPagoForm.get('desde');
    const hastaControl = this.buscarPagoForm.get('hasta');
    const tipoControl = this.buscarPagoForm.get('tipo');
    if (!!desdeControl?.value || !!hastaControl?.value) {
      this.cajaService.getPays(this.buscarPagoForm.value).subscribe(
        (response) => {
          console.log('Pagos:', response);
          this.pagos = response;
        },(error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
    
  }
}
