import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class funcionarioService {
  private apiUrl = 'http://localhost:8080/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Exemplo: Buscar lista de clientes
  getClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/funcionarios`);
  }

  // Exemplo: Criar um cliente
  createCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/funcionarios`, cliente);
  }

  // Exemplo: Buscar lista de funcionarios
  getFuncionarios(): Observable<any> {
    const url = `${this.apiUrl}/funcionarios`;  // Concatena o endpoint /funcionarios
    return this.http.get<any>(url);  // Faz a requisição GET para /funcionarios
  }
}
