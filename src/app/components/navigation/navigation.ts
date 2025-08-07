import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogoutIcon } from '../../assets/svg/logout-icon';
import { BurgerIcon } from '../../assets/svg/burger-icon';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, LogoutIcon, BurgerIcon],
  templateUrl: './navigation.html',
})
export class Navigation {
  authService = inject(AuthService);
  private router = inject(Router);

  showMenu = signal(false);

  toggleShowMore(): void {
    this.showMenu.update((value) => !value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
