import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CajaComponent } from './caja/caja.component';

const routes: Routes = [

  // { path:'login', component: LoginComponent },
  // { path:'', component: LoginComponent },
  // { path:'**', component: LoginComponent },
  { path:'registro', component: RegistroComponent},
  { path:'busqueda', component: BusquedaComponent},
  { path:'caja', component: CajaComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
