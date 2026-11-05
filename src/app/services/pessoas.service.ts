import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoasMock: Pessoa[] = [
    {
      id: 1,
      nome: 'Ana Clara Souza',
      cpf: '123.456.789-01',
      rg: '12.345.678-9',
      email: 'ana.souza@email.com',
      celular: '11987654321',
      dataNascimento: '1992-05-14',
      ativo: true,
      endereco: {
        logradouro: 'Av. Paulista',
        numero: '1000',
        complemento: 'Apto 42',
        bairro: 'Bela Vista',
        cep: '01310-100',
        cidade: 'São Paulo',
        estado: 'SP'
      }
    },
    {
      id: 2,
      nome: 'Carlos Eduardo Lima',
      cpf: '987.654.321-09',
      rg: '98.765.432-1',
      email: 'carlos.lima@email.com',
      celular: '21976543210',
      dataNascimento: '1985-11-23',
      ativo: true,
      endereco: {
        logradouro: 'Rua das Flores',
        numero: '250',
        complemento: '',
        bairro: 'Centro',
        cep: '20040-002',
        cidade: 'Rio de Janeiro',
        estado: 'RJ'
      }
    },
    {
      id: 3,
      nome: 'Mariana Duarte Silva',
      cpf: '456.789.123-45',
      rg: '45.678.912-3',
      email: 'mariana.silva@email.com',
      celular: '31998765432',
      dataNascimento: '1998-02-18',
      ativo: false,
      endereco: {
        logradouro: 'Rua Bahia',
        numero: '812',
        complemento: 'Bloco B',
        bairro: 'Savassi',
        cep: '30160-011',
        cidade: 'Belo Horizonte',
        estado: 'MG'
      }
    }
  ];

  private nextId = 4;

  getClientes(): Observable<any[]> {
    return of(this.pessoasMock).pipe(delay(200));
  }

  getPessoas(): Observable<PaginatedResponse<Pessoa>> {
    const response: PaginatedResponse<Pessoa> = {
      content: [...this.pessoasMock],
      totalElements: this.pessoasMock.length,
      totalPages: 1,
      size: 10,
      number: 0,
      numberOfElements: this.pessoasMock.length,
      first: true,
      last: true,
      empty: this.pessoasMock.length === 0,
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageNumber: 0,
        pageSize: 10,
        paged: true,
        unpaged: false
      },
      sort: { empty: true, sorted: false, unsorted: true }
    };
    return of(response).pipe(delay(200));
  }

  getPessoa(id: number): Observable<Pessoa | undefined> {
    const item = this.pessoasMock.find(p => p.id === id);
    return of(item ? JSON.parse(JSON.stringify(item)) : undefined).pipe(delay(150));
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const nova: Pessoa = {
      ...pessoa,
      id: this.nextId++,
      ativo: pessoa.ativo ?? true
    };
    this.pessoasMock.unshift(nova);
    return of({ ...nova }).pipe(delay(250));
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    const index = this.pessoasMock.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pessoasMock[index] = {
        ...this.pessoasMock[index],
        ...pessoa,
        id
      };
      return of({ ...this.pessoasMock[index] }).pipe(delay(250));
    }
    return of(pessoa).pipe(delay(250));
  }

  deletePessoa(id: number): Observable<boolean> {
    this.pessoasMock = this.pessoasMock.filter(p => p.id !== id);
    return of(true).pipe(delay(200));
  }
}
