import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegistroComponent } from './registro-px/registro.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CajaComponent } from './caja/caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableCajaComponent } from './table-caja/table-caja.component';
import { TablePxComponent } from './table-px/table-px.component';
import { HttpClientModule } from '@angular/common/http';
import { S1datosGeneralesComponent } from './fmContenido/s1datos-generales/s1datos-generales.component';
import { S2pxDeportivoComponent } from './fmContenido/s2px-deportivo/s2px-deportivo.component';
import { S3medidasFisicasComponent } from './fmContenido/s3medidas-fisicas/s3medidas-fisicas.component';
import { S4antHfamiliaresComponent } from './fmContenido/s4ant-hfamiliares/s4ant-hfamiliares.component';
import { S5antPatologicosComponent } from './fmContenido/s5ant-patologicos/s5ant-patologicos.component';
import { S6antNopatologicosComponent } from './fmContenido/s6ant-nopatologicos/s6ant-nopatologicos.component';
import { S7mujerAntGineObtComponent } from './fmContenido/s7mujer-ant-gine-obt/s7mujer-ant-gine-obt.component';
import { S8pediatricoAntperinatalesComponent } from './fmContenido/s8pediatrico-antperinatales/s8pediatrico-antperinatales.component';
import { S9observacionesComponent } from './fmContenido/s9observaciones/s9observaciones.component';
import { FichaMedicaComponent } from './ficha-medica/ficha-medica.component';
import { HistorialComponent } from './historial/historial.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistroComponent,
    BusquedaComponent,
    CajaComponent,
    TableCajaComponent,
    TablePxComponent,
    S1datosGeneralesComponent,
    S2pxDeportivoComponent,
    S3medidasFisicasComponent,
    S4antHfamiliaresComponent,
    S5antPatologicosComponent,
    S6antNopatologicosComponent,
    S7mujerAntGineObtComponent,
    S8pediatricoAntperinatalesComponent,
    S9observacionesComponent,
    FichaMedicaComponent,
    HistorialComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
