import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s8pediatrico-antperinatales',
  templateUrl: './s8pediatrico-antperinatales.component.html',
  styleUrls: ['./s8pediatrico-antperinatales.component.scss']
})
export class S8pediatricoAntperinatalesComponent implements OnInit {
  formData: any = {};
  showPerinatalesTable = false;


  constructor() { }

  ngOnInit(): void {
  }

}
