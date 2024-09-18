import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  showSpiner: boolean = false;
  today: string;
  visitaForm: FormGroup;
  visitas: any = [];

  constructor() {
    this.today = this.formatDate();

    this.visitaForm = new FormGroup({
      fecha: new FormControl(this.today,Validators.required),
      tipo: new FormControl(null, Validators.required),
      comentario: new FormControl(null, Validators.required),
      filePx: new FormControl(null)
    });
    console.log(this.visitaForm);
    
   }

  ngOnInit(): void {
  }
  formatDate(): string {
    const date =  new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  addVisita() {
    console.log(this.visitaForm);
    
  }

}