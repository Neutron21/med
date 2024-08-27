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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistroComponent,
    BusquedaComponent,
    CajaComponent,
    TableCajaComponent,
    TablePxComponent
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
