import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService // Inyectamos el AuthService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authService.getIsLoged(); // Usamos el método para comprobar autenticación

        if (!isAuthenticated) {
            this.router.navigate(['login']); // Redirige a login si no está autenticado
            return false; // Deniega el acceso
        }
        return true; // Permite el acceso
    }
}
