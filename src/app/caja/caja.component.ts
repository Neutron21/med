import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  cajaForm!: FormGroup;
  currentDateTime: any;
  constructor(
    private utilService: UtilService
  ) { 
    this.currentDateTime = this.getCurrentDateTime();

    this.cajaForm = new FormGroup({
      cantidad: new FormControl('', Validators.required),
      px: new FormControl('', Validators.required),
      dateTime: new FormControl({ value: this.currentDateTime, disabled: true }, Validators.required),
      tipo: new FormControl('', Validators.required),
      comentarios: new FormControl('', Validators.required),
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
  sendPay(){
    console.log(this.cajaForm.value);
  }
}
