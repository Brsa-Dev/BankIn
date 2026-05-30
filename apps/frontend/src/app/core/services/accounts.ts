import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

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

  createWithInstitution(data: { name: string; type: string; balance: number; currency: string; institutionName: string }) {
    return this.http.post<{ id: number }>(`${API_URL}/institutions`, { name: data.institutionName })
      .pipe(
        switchMap(institution => this.http.post<Account>(`${API_URL}/accounts`, {
          name: data.name,
          type: data.type,
          balance: data.balance,
          currency: data.currency,
          institutionId: institution.id
        }))
      );
  }
}
