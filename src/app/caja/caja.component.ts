import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  cajaForm!: FormGroup;
  currentDateTime: any;
  constructor(
    private utilService: UtilService,
    private cajaService: CajaService,
  ) { 
    this.currentDateTime = this.getCurrentDateTime();

    this.cajaForm = new FormGroup({
      cantidad: new FormControl(null, Validators.required),
      px: new FormControl(null, Validators.required),
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
    this.utilService.onlyNumbers(event);
  }
  validateTextInput(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  sendPay(){
    const pago = {...this.cajaForm.value};
    console.log(this.cajaForm.value);
    if (!pago.dateTime) { // Fecha actual, el form no la asigna automaticamente
      pago.dateTime = this.getCurrentDateTime();
    }
    if(this.cajaForm.valid){
      this.cleanForm();
      this.cajaService.createPay(pago).subscribe((response: any) => {
        console.log("Pago registrado con éxito, " + response.message);
      }, (error: any) =>{
        console.log("Error al registrar el pago: " + error.error.error);
      });
    } else {
      console.log("Form no valido!");
      this.cajaForm.markAllAsTouched();
    }
  }
  onTipoChange() {
    const tipoControl = this.cajaForm.get('tipo');
    
    if (tipoControl?.value === "null") {
      tipoControl.setErrors({ required: true });
    } 
  }
  cleanForm() {
    this.cajaForm.reset();
    this.cajaForm.get('dateTime')?.setValue(this.getCurrentDateTime());
  }
  
}
