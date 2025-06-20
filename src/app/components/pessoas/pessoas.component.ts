import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../models/pessoa.model'; // Importar os modelos
import { PessoaService } from '../../services/pessoas.service';
import { PaginatedResponse } from '../../models/paginated-response.model';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.css'],
    standalone: false
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  pessoaSelecionada: Pessoa | null = null;
  mostrarFormulario = false;
  modoEdicao = false;

  // Modelo para o formulário, inicializado com uma pessoa vazia
  pessoaForm: Pessoa = this.criarPessoaVazia();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.getPessoas().subscribe((data: PaginatedResponse<Pessoa>) => {
      this.pessoas = data.content;
    });
  }

  criarPessoaVazia(): Pessoa {
    return {
      nome: '',
      cpf: '',
      rg: '',
      email: '',
      celular: '',
      dataNascimento: '',
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      ativo: true
    };
  }

  selecionarPessoa(pessoa: Pessoa): void {
    this.pessoaSelecionada = pessoa;
    this.pessoaForm = { ...pessoa }; // Copia para o formulário para edição
    this.modoEdicao = true;
    this.mostrarFormulario = true;
  }

  novaPessoa(): void {
    this.pessoaSelecionada = null;
    this.pessoaForm = this.criarPessoaVazia();
    this.modoEdicao = false;
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.pessoaSelecionada = null;
  }

  salvarPessoa(): void {
    if (this.modoEdicao && this.pessoaForm.id) {
      this.pessoaService.updatePessoa(this.pessoaForm.id, this.pessoaForm).subscribe(() => {
        this.carregarPessoas();
        this.cancelarFormulario();
      });
    } else {
      this.pessoaService.createPessoa(this.pessoaForm).subscribe(() => {
        this.carregarPessoas();
        this.cancelarFormulario();
      });
    }
  }

  excluirPessoa(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID da pessoa é indefinido, não é possível excluir.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe(() => {
        this.carregarPessoas();
        this.cancelarFormulario();
      });
    }
  }
}
