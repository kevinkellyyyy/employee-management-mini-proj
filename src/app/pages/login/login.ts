import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EyeOpenIcon } from '../../assets/svg/eye-open-icon';
import { EyeCloseIcon } from '../../assets/svg/eye-close-icon';
import { SpinnerIcon } from '../../assets/svg/spinner-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    EyeOpenIcon,
    EyeCloseIcon,
    SpinnerIcon,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  showPassword = signal(false);
  loginError = signal('');
  isLoading = signal(false);

  // Hardcoded credentials
  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = 'password123';

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // If already logged in, redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginError.set('');
      this.isLoading.set(true);
      const { username, password } = this.loginForm.value;

      setTimeout(() => {
        if (
          username === this.VALID_USERNAME &&
          password === this.VALID_PASSWORD
        ) {
          // Use auth service to login
          this.authService.login();
          // Redirect to home page
          this.router.navigate(['/']);
        } else {
          this.loginError.set('Username atau Password salah');
        }
        this.isLoading.set(false);
      }, 1000); // Simulate network delay 1 detik
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } tidak boleh kosong`;
      }
    }
    return '';
  }
}
