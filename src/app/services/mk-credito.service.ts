import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MkCredito } from '../models/mk-credito.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class MkCreditoService {
  private analisesMock: MkCredito[] = [
    {
      id: 1,
      cpf: '123.456.789-01',
      valorEntrada: 15000,
      valorFinanciado: 45000,
      numeroParcelas: 36,
      valorParcela: 1625.50,
      juros: 1.89,
      dataAnalise: new Date('2026-03-10T14:30:00'),
      status: 'Aprovado'
    },
    {
      id: 2,
      cpf: '987.654.321-09',
      valorEntrada: 5000,
      valorFinanciado: 25000,
      numeroParcelas: 24,
      valorParcela: 1280.10,
      juros: 2.15,
      dataAnalise: new Date('2026-03-12T09:15:00'),
      status: 'Em Análise'
    },
    {
      id: 3,
      cpf: '456.789.123-45',
      valorEntrada: 0,
      valorFinanciado: 80000,
      numeroParcelas: 60,
      valorParcela: 2350.00,
      juros: 2.45,
      dataAnalise: new Date('2026-03-14T11:45:00'),
      status: 'Reprovado'
    },
    {
      id: 4,
      cpf: '321.654.987-12',
      valorEntrada: 20000,
      valorFinanciado: 60000,
      numeroParcelas: 48,
      valorParcela: 1750.80,
      juros: 1.75,
      dataAnalise: new Date('2026-03-15T16:20:00'),
      status: 'Aprovado'
    }
  ];

  private nextId = 5;

  getAnalises(): Observable<PaginatedResponse<MkCredito>> {
    const response: PaginatedResponse<MkCredito> = {
      content: [...this.analisesMock],
      totalElements: this.analisesMock.length,
      totalPages: 1,
      size: 10,
      number: 0,
      numberOfElements: this.analisesMock.length,
      first: true,
      last: true,
      empty: this.analisesMock.length === 0,
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

  getAnalise(id: number): Observable<MkCredito | undefined> {
    const item = this.analisesMock.find(a => a.id === id);
    return of(item ? { ...item } : undefined).pipe(delay(150));
  }

  createAnalise(analise: MkCredito): Observable<MkCredito> {
    const taxaJuros = 1.99;
    const taxaMes = taxaJuros / 100;
    const n = analise.numeroParcelas || 1;
    const vp = (analise.valorFinanciado * (taxaMes * Math.pow(1 + taxaMes, n))) / (Math.pow(1 + taxaMes, n) - 1);

    const novo: MkCredito = {
      ...analise,
      id: this.nextId++,
      dataAnalise: new Date(),
      status: analise.status || (analise.valorEntrada >= analise.valorFinanciado * 0.2 ? 'Aprovado' : 'Em Análise'),
      juros: taxaJuros,
      valorParcela: Number(vp.toFixed(2))
    };
    this.analisesMock.unshift(novo);
    return of({ ...novo }).pipe(delay(250));
  }

  updateAnalise(id: number, analise: MkCredito): Observable<MkCredito> {
    const index = this.analisesMock.findIndex(a => a.id === id);
    if (index !== -1) {
      const taxaJuros = this.analisesMock[index].juros || 1.99;
      const taxaMes = taxaJuros / 100;
      const n = analise.numeroParcelas || 1;
      const vp = (analise.valorFinanciado * (taxaMes * Math.pow(1 + taxaMes, n))) / (Math.pow(1 + taxaMes, n) - 1);

      this.analisesMock[index] = {
        ...this.analisesMock[index],
        ...analise,
        id,
        valorParcela: Number(vp.toFixed(2))
      };
      return of({ ...this.analisesMock[index] }).pipe(delay(250));
    }
    return of(analise).pipe(delay(250));
  }

  deleteAnalise(id: number): Observable<boolean> {
    this.analisesMock = this.analisesMock.filter(a => a.id !== id);
    return of(true).pipe(delay(200));
  }
}
