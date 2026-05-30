import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  showPassword = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = '';
    this.authService.register({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.error = 'Une erreur est survenue'
    });
  }
}
