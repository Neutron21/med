import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s3medidas-fisicas',
  templateUrl: './s3medidas-fisicas.component.html',
  styleUrls: ['./s3medidas-fisicas.component.scss']
})
export class S3medidasFisicasComponent implements OnInit, OnDestroy {
  formData: any = {};
 body= {
  peso: '',
  glucosa: '',
  estatura: '',
  imc: '',
  temperatura: '',
  f_cardiaca: '',
  f_respiratoria: '',
  tension_arterial: ''
 }
 initBody = JSON.parse(JSON.stringify(this.body)); 
 idPx: number|null = null;
 isLoading: boolean = false;
 private destroy$ = new Subject<void>();

  constructor(
    private utilService: UtilService,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {  }

  ngOnInit(): void {
    this.isLoading = true; 
    this.checkCurrentPxId();
    
    this.sharedDataService.idPacienteObservable.pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.idPx = id;
      this.checkCurrentPxId();
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // console.log('Suscripción destruida ✅ S3');
  }
  checkCurrentPxId(): void {
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
      
      const apiCall = this.authService.getById('medidasFm','id_paciente', currentPxId);
      this.sharedDataService.loadSectionData('s3', apiCall, this.initBody).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  onlyNumbers(event: KeyboardEvent): void {
    this.utilService.onlyNumbers(event);

  }
  guardar() {
    sessionStorage.setItem('s3', JSON.stringify(this.body));
  }

}
