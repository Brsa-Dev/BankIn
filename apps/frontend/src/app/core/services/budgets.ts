import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export interface Budget {
  id: number;
  month: number;
  year: number;
  limit: number;
  userId: number;
  categoryId: number;
  category?: { id: number; name: string; color: string; icon: string; };
}

export interface CreateBudgetDto {
  month: number;
  year: number;
  limit: number;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Budget[]>(`${API_URL}/budgets`);
  }

  create(dto: CreateBudgetDto) {
    return this.http.post<Budget>(`${API_URL}/budgets`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/budgets/${id}`);
  }
}
