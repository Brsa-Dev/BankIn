import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  userId: number;
}

export interface CreateGoalDto {
  name: string;
  targetAmount: number;
  currentAmount?: number;
  deadline?: string;
}

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Goal[]>(`${API_URL}/goals`);
  }

  create(dto: CreateGoalDto) {
    return this.http.post<Goal>(`${API_URL}/goals`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/goals/${id}`);
  }
}
