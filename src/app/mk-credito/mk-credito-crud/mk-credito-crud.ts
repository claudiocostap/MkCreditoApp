import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MkCreditoService } from '../../services/mk-credito.service';
import { MkCredito } from '../../models/mk-credito.model';
import { PaginatedResponse } from '../../models/paginated-response.model';

@Component({
  selector: 'app-mk-credito-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './mk-credito-crud.html',
  styleUrls: ['./mk-credito-crud.css']
})
export class MkCreditoCrudComponent implements OnInit {
  analises: MkCredito[] = [];
  analiseForm: FormGroup;
  isEditing: boolean = false;
  selectedAnaliseId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mkCreditoService: MkCreditoService
  ) {
    this.analiseForm = this.fb.group({
      id: [null],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      valorEntrada: ['', [Validators.required, Validators.min(0)]],
      valorFinanciado: ['', [Validators.required, Validators.min(1)]],
      numeroParcelas: ['', [Validators.required, Validators.min(1)]],
      valorParcela: [{value: '', disabled: true}],
      juros: [{value: '', disabled: true}],
      dataAnalise: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.loadAnalises();
  }

  loadAnalises(): void {
    this.mkCreditoService.getAnalises().subscribe({
      next: (response: PaginatedResponse<MkCredito>) => {
        this.analises = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar análises:', error);
        this.showErrorMessage('Erro ao carregar a lista de análises.');
      }
    });
  }

  newAnalise(): void {
    this.isEditing = false;
    this.selectedAnaliseId = null;
    this.analiseForm.reset();
    this.clearMessages();
  }

  editAnalise(analise: MkCredito): void {
    this.isEditing = true;
    this.selectedAnaliseId = analise.id!;
    this.analiseForm.patchValue(analise);
    this.clearMessages();
  }

  saveAnalise(): void {
    this.clearMessages();
    if (this.analiseForm.invalid) {
      this.markFormGroupTouched(this.analiseForm);
      this.showErrorMessage('Formulário inválido. Verifique os campos destacados.');
      return;
    }

    const analiseToSave: MkCredito = this.analiseForm.getRawValue();
    const isEditing = this.isEditing;

    const operation = isEditing
      ? this.mkCreditoService.updateAnalise(this.selectedAnaliseId!, analiseToSave)
      : this.mkCreditoService.createAnalise(analiseToSave);

    operation.subscribe({
      next: () => {
        const action = isEditing ? 'atualizada' : 'cadastrada';
        this.showSuccessMessage(`Análise de crédito ${action} com sucesso!`);
        this.loadAnalises();
        this.newAnalise();
      },
      error: (error) => {
        console.error('Erro na operação:', error);
        this.showErrorMessage('Erro ao processar a análise. Tente novamente.');
      }
    });
  }

  deleteAnalise(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta análise?')) {
      this.mkCreditoService.deleteAnalise(id).subscribe({
        next: () => {
          this.showSuccessMessage('Análise excluída com sucesso.');
          this.loadAnalises();
          if (this.selectedAnaliseId === id) {
            this.newAnalise();
          }
        },
        error: (error) => {
          console.error('Erro ao excluir análise:', error);
          this.showErrorMessage('Erro ao excluir a análise.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.newAnalise();
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  isInvalid(controlName: string): boolean {
    const control = this.analiseForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.clearMessages();
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 4000);
  }

  private showErrorMessage(message: string): void {
    this.clearMessages();
    this.errorMessage = message;
  }
}
