import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro-px/registro.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CajaComponent } from './caja/caja.component';
import { AuthGuard } from './services/guard.service';




const routes: Routes = [

  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] },
  { path: 'busqueda', component: BusquedaComponent, canActivate: [AuthGuard] },
  { path: 'caja', component: CajaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
