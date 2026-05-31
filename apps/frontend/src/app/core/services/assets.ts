import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export interface Asset {
  id: number;
  name: string;
  type: string;
  estimatedValue: number;
  currency: string;
  userId: number;
}

export interface CreateAssetDto {
  name: string;
  type: string;
  estimatedValue: number;
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class AssetsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Asset[]>(`${API_URL}/assets`);
  }

  create(dto: CreateAssetDto) {
    return this.http.post<Asset>(`${API_URL}/assets`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/assets/${id}`);
  }
}
