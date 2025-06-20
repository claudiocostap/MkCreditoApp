export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export interface Pessoa {
  id?: number; // O ID é opcional, especialmente ao criar uma nova pessoa
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  dataNascimento: string; // Pode ser alterado para o tipo Date se preferir
  endereco: Endereco;
  ativo: boolean;
}