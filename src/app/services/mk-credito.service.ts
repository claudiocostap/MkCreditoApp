import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MkCredito } from '../models/mk-credito.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class MkCreditoService {
  private apiUrl = 'http://localhost:8080/api/mk-credito';

  constructor(private http: HttpClient) { }

  getAnalises(): Observable<PaginatedResponse<MkCredito>> {
    return this.http.get<PaginatedResponse<MkCredito>>(this.apiUrl);
  }

  getAnalise(id: number): Observable<MkCredito> {
    return this.http.get<MkCredito>(`${this.apiUrl}/${id}`);
  }

  createAnalise(analise: MkCredito): Observable<MkCredito> {
    return this.http.post<MkCredito>(this.apiUrl, analise);
  }

  updateAnalise(id: number, analise: MkCredito): Observable<MkCredito> {
    return this.http.put<MkCredito>(`${this.apiUrl}/${id}`, analise);
  }

  deleteAnalise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
