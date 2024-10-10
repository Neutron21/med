import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { concepto, tipo } from 'src/app/catalogos/pagos';
import { CajaService } from '../services/caja.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


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
descargarPDF() {
  const doc = new jsPDF();
  doc.setFont('Fredoka', 'normal');
  doc.setTextColor(0, 123, 255);
  doc.setFontSize(20);
  doc.text('MEDI', 100, 8);

  doc.setTextColor(0, 0, 0);  
  doc.setFontSize(14);
  doc.text('Reporte de Pagos', 12, 18);

  const currentUserString = sessionStorage.getItem('currentUser');
  let userEmail = 'Correo no disponible'; 
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    userEmail = currentUser.email || 'Correo no disponible'; 
  }
  doc.text(` ${userEmail}`, 129, 18);

  const pagosData = this.pagos.map(pago => [
    this.formatDate(pago.dateTime),
    `$${pago.cantidad.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    this.formatTipo(pago.tipo),
    this.formatConcepto(pago.concepto)
  ]);

  autoTable(doc, {
    head: [['Fecha', 'Cantidad', 'Tipo', 'Concepto']],
    body: pagosData,
    startY: 22,
  });

  const finalY = (doc as any).lastAutoTable.finalY; 
  const totalPagosFormatted = `$ ${this.totalPagos.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  doc.text(`Total Pagos: ${totalPagosFormatted}`, 14, finalY + 10);



  doc.save('reporte-pagos.pdf');
}

}
