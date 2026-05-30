import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${API_URL}/auth/login`, { email, password })
      .pipe(tap(res => localStorage.setItem('token', res.access_token)));
  }

  register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.http.post<{ access_token: string }>(`${API_URL}/auth/register`, data)
      .pipe(tap(res => localStorage.setItem('token', res.access_token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
