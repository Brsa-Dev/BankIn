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

export interface CreateTransactionDto {
  label: string;
  amount: number;
  type: string;
  date: string;
  accountId: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Transaction[]>(`${API_URL}/transactions`);
  }

  create(dto: CreateTransactionDto) {
    return this.http.post<Transaction>(`${API_URL}/transactions`, dto);
  }
}
