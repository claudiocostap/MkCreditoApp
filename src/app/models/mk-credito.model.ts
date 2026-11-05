export interface MkCredito {
  id?: number;
  cpf: string;
  valorEntrada: number;
  valorFinanciado: number;
  numeroParcelas: number;
  valorParcela: number;
  juros: number;
  dataAnalise: Date;
  status: string;
}
