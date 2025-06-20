import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model'; // Importar o modelo Pessoa
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/api'; // Ou a URL da sua API

  constructor(private http: HttpClient) { }

  // Métodos para Clientes (exemplo existente)
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }

  // --- Métodos para Pessoas ---
  getPessoas(): Observable<PaginatedResponse<Pessoa>> {
    return this.http.get<PaginatedResponse<Pessoa>>(`${this.apiUrl}/pessoas`);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/pessoas/${id}`);
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.apiUrl}/pessoas`, pessoa);
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/pessoas/${id}`, pessoa);
  }

  deletePessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pessoas/${id}`);
  }
}
