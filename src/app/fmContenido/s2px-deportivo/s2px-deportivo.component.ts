import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s2px-deportivo',
  templateUrl: './s2px-deportivo.component.html',
  styleUrls: ['./s2px-deportivo.component.scss']
})
export class S2pxDeportivoComponent implements OnInit {
  formData: any = {};


  constructor( 
    private utilService: UtilService,

  ) { }

  ngOnInit(): void {
  }
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
}
