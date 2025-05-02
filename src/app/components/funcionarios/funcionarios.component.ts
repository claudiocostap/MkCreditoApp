import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: any[] = [];  // Lista de funcionários
  totalFuncionarios: number = 0;  // Total de funcionários
  currentPage: number = 1;  // Página atual
  totalPages: number = 1;  // Total de páginas

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  // Método para carregar funcionários
  loadFuncionarios(): void {
    this.apiService.getFuncionarios().subscribe(data => {
      this.funcionarios = data.content;  // Acessa a lista de funcionários
      this.totalFuncionarios = data.totalElements;  // Total de funcionários
      this.totalPages = data.totalPages;  // Total de páginas
    });
  }

  // Método para navegação entre as páginas
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadFuncionarios();  // Recarrega os funcionários para a nova página
  }
}
