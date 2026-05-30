import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

export interface Transaction {
  id: number;
  label: string;
  amount: number;
  date: string;
  type: string;
  accountId: number;
  account?: { name: string; };
  category?: { name: string; color: string; };
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Transaction[]>(`${API_URL}/transactions`);
  }
}
