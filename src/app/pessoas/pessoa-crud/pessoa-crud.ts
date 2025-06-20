// d:\REPO\MkCreditoApp\src\app\pessoas\pessoa-crud\pessoa-crud.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../../services/pessoas.service';
import { Pessoa } from '../../models/pessoa.model';
import { PaginatedResponse } from '../../models/paginated-response.model';

@Component({
  selector: 'app-pessoa-crud',
  standalone: true, // <-- Componente Standalone
  imports: [
    CommonModule, // Necessário para *ngIf, *ngFor, etc.
    ReactiveFormsModule // Necessário para [formGroup], formControlName, etc.
  ],
  templateUrl: './pessoa-crud.html',
  styleUrls: ['./pessoa-crud.css']
})
export class PessoaCrudComponent implements OnInit {
  pessoas: Pessoa[] = [];
  pessoaForm: FormGroup;
  isEditing: boolean = false;
  selectedPessoaId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    // Inicializa o FormGroup com os campos e suas validações
    this.pessoaForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
      }),
      ativo: [true]
    });
  }

  ngOnInit(): void {
    this.loadPessoas();
  }

  loadPessoas(): void {
    this.pessoaService.getPessoas().subscribe({
      next: (response: PaginatedResponse<Pessoa>) => {
        this.pessoas = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        this.showErrorMessage('Erro ao carregar a lista de pessoas. Tente novamente mais tarde.');
        
        // TODO: Implementar feedback visual para o usuário (ex: toast, alert)
      }
    });
  }

  newPessoa(): void {
    this.isEditing = false;
    this.selectedPessoaId = null;
    this.pessoaForm.reset({ ativo: true });
    this.clearMessages();

  }

  editPessoa(pessoa: Pessoa): void {
    this.isEditing = true;
    this.selectedPessoaId = pessoa.id!;
    this.pessoaForm.patchValue(pessoa);
    this.clearMessages();

  }

  savePessoa(): void {
    this.clearMessages();
    if (this.pessoaForm.invalid) {
      this.markFormGroupTouched(this.pessoaForm);
      console.error('Formulário inválido. Verifique os campos.');
      this.showErrorMessage('Formulário inválido. Verifique os campos destacados.');

      return;
    }

    const pessoaToSave: Pessoa = this.pessoaForm.value;
    const isEditing = this.isEditing;


    const operation = isEditing
      ? this.pessoaService.updatePessoa(this.selectedPessoaId!, pessoaToSave)
      : this.pessoaService.createPessoa(pessoaToSave);

    operation.subscribe({
      next: (savedPessoa) => {
        const action = isEditing ? 'atualizada' : 'criada';
        this.showSuccessMessage(`Pessoa ${action} com sucesso!`);
        this.loadPessoas();
        this.isEditing = false;
        this.selectedPessoaId = null;
        this.pessoaForm.reset({ ativo: true });
      },
      error: (error) => {
        const action = isEditing ? 'atualizar' : 'criar';
        console.error(`Erro ao ${action} pessoa:`, error);
        this.showErrorMessage(`Erro ao ${action} a pessoa. Verifique os dados e tente novamente.`);
      }
    });
  }

  deletePessoa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe({
        next: () => {
          this.showSuccessMessage('Pessoa excluída com sucesso.');
          this.loadPessoas();
          if (this.selectedPessoaId === id) {
             this.newPessoa();
          }
        },
        error: (error) => {
          console.error('Erro ao excluir pessoa:', error);
            this.showErrorMessage('Erro ao excluir a pessoa. Tente novamente.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.newPessoa();
  }

  get enderecoFormGroup(): FormGroup {
    return this.pessoaForm.get('endereco') as FormGroup;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isInvalid(controlName: string, formGroup: FormGroup = this.pessoaForm): boolean {
    const control = formGroup.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

    private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  private showSuccessMessage(message: string): void {
    this.clearMessages();
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000);
  }

  private showErrorMessage(message: string): void {
    this.clearMessages();
    this.errorMessage = message;
  }
}
