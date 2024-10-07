import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { concepto, tipo } from 'src/app/catalogos/pagos';
import { CajaService } from '../services/caja.service';

@Component({
  selector: 'app-table-caja',
  templateUrl: './table-caja.component.html',
  styleUrls: ['./table-caja.component.scss']
})
export class TableCajaComponent implements OnInit {
  totalPagos: number = 0;
  buscarPagoForm: FormGroup;
  pagos: any[] = [];
  showSpiner: boolean = false;
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
    this.showSpiner = true;
    const desdeControl = this.buscarPagoForm.get('desde');
    const hastaControl = this.buscarPagoForm.get('hasta');
    const tipoControl = this.buscarPagoForm.get('tipo');
    if (!!desdeControl?.value || !!hastaControl?.value) {
      this.cajaService.getPays(this.buscarPagoForm.value).subscribe(
        (response) => {
          console.log('Pagos:', response);
          this.pagos = response;
          this.calcularTotalPagos(); // Llamar a la función que calcula el total
          this.showSpiner = false;
        },(error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.showSpiner = false;
        });
    }
  }
  
  formatDate(pagoFecha: string) {
    const [fechaParte, horaParte] = pagoFecha.split(' ');
    const [anio, mes, dia] = fechaParte.split('-');
    const fechaFormateada = `${dia}-${mes}-${anio} ${horaParte}`;

    return fechaFormateada;
  }
  formatTipo(valor: keyof typeof tipo) {
    return tipo[valor];
  }
  formatConcepto(valor: keyof typeof concepto) {
    return concepto[valor];
}
calcularTotalPagos() {
  this.totalPagos = this.pagos.reduce((total, pago) => total + pago.cantidad, 0);
}

}
