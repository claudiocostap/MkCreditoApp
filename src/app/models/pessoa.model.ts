import { Endereco } from './endereco.model';

export interface Pessoa {
  id?: number; // Opcional, pois o ID será gerado pelo backend
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  dataNascimento: string; // Formato YYYY-MM-DD
  endereco: Endereco;
  ativo: boolean;
}