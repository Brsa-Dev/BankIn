import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './core/layout/sidebar/sidebar';
import { Topbar } from './core/layout/topbar/topbar';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Topbar, CommonModule],
  templateUrl: './app.html'
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}

// Trigger commit
