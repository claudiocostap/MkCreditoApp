export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string; // Opcional
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}