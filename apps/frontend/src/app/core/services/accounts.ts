import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

export interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
  institutionId: number;
  institution?: { id: number; name: string; };
}

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Account[]>(`${API_URL}/accounts`);
  }
}
