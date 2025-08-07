import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  authService = inject(AuthService);
  protected readonly title = signal('employee-management-mini-proj');
}
