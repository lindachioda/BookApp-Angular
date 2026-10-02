import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';

export const loginGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const router = inject(Router)
  // controlla se l'utente è autenticato
  const loginOk = authService.checkLogin()

  if (!loginOk) {
    // se non è loggato torna al login
    router.navigate(['/login'])
    return false
  }
  return true
}