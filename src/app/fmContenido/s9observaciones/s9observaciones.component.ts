import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s9observaciones',
  templateUrl: './s9observaciones.component.html',
  styleUrls: ['./s9observaciones.component.scss']
})
export class S9observacionesComponent implements OnInit {
  observaciones: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
