import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';
declare var bootstrap: any; // Importa bootstrap para manejar el modal


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  cajaForm!: FormGroup;
  currentDateTime: any;
  saveError: boolean = false;  // Para saber si hubo error o no
  loader: boolean = false;  // Para el estado de carga


  constructor(
    private utilService: UtilService,
    private cajaService: CajaService,
  ) { 
    this.currentDateTime = this.getCurrentDateTime();

    this.cajaForm = new FormGroup({
      cantidad: new FormControl(null, Validators.required),
      concepto: new FormControl(null, Validators.required),
      dateTime: new FormControl({ value: this.currentDateTime, disabled: true }, Validators.required),
      tipo: new FormControl(null, Validators.required),
      comentarios: new FormControl(null,),
      oldDate: new FormControl(false, Validators.required)
    });
    this.toggleDateField();
  }

  ngOnInit(): void {
  }
  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  toggleDateField() {
    const oldDateControl = this.cajaForm.get('oldDate');
    const dateTimeControl = this.cajaForm.get('dateTime');

    if (oldDateControl?.value) {
      dateTimeControl?.enable();
    } else {
      dateTimeControl?.disable();
      dateTimeControl?.setValue(this.getCurrentDateTime());
    }
  }
  validateNumberInput(event: KeyboardEvent) {
    const isNumber = (event.key >= '0' && event.key <= '9') || event.key === 'Backspace' || event.key === 'Tab' || event.key === 'ArrowLeft' || event.key === 'ArrowRight';
    
    if (!isNumber) {
      event.preventDefault(); // Previene la entrada de caracteres no numéricos
    }
  }
  validateTextInput(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  sendPay() {
    const pago = { ...this.cajaForm.value };
    console.log(this.cajaForm.value);
  
    if (!pago.dateTime) {
      pago.dateTime = this.getCurrentDateTime();
    }
  
    if (this.validarFormulario()) {
      const modalElement = document.getElementById('responsePagosModal');
      const modal = new bootstrap.Modal(modalElement);
      this.loader = true;
  
      this.cajaService.createPay(pago).subscribe(
        (response: any) => {
          console.log("Pago registrado con éxito, " + response.message);
          this.saveError = false;
          this.loader = false;
          modal.show();
          this.cleanForm();

          },
        (error: any) => {
          console.log("Error al registrar el pago: " + error.error.error);
          this.saveError = true;
          this.loader = false;
          modal.show();
        }
      );
    } else {
      console.log("Formulario no válido!");
      this.cajaForm.markAllAsTouched();
    }
  }
  
  onTipoChange() {
    const tipoControl = this.cajaForm.get('tipo');
    
    if (tipoControl?.value === "null") {
      tipoControl.setErrors({ required: true });
    } 
  }
  onConceptoChange() {
    const conceptoControl = this.cajaForm.get('concepto');
    
    if (conceptoControl?.value === "null") {
      conceptoControl.setErrors({ required: true });
    } 
  }
  cleanForm() {
    this.cajaForm.reset();
    this.cajaForm.get('dateTime')?.setValue(this.getCurrentDateTime());
   
  }
  validarFormulario(){
     return (!!this.cajaForm.get('cantidad')?.value &&
        !!this.cajaForm.get('concepto')?.value && !!this.cajaForm.get('tipo')?.value);

  }
  onlyNumbers(event: KeyboardEvent): boolean {
    return this.utilService.onlyNumbers(event);
  }

}
