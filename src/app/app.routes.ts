import { Routes } from '@angular/router';
import { PessoaCrudComponent } from './pessoas/pessoa-crud/pessoa-crud';
import { MkCreditoCrudComponent } from './mk-credito/mk-credito-crud/mk-credito-crud';

export const routes: Routes = [
  { path: 'pessoas', component: PessoaCrudComponent },
  { path: 'mk-credito', component: MkCreditoCrudComponent },
  // Redireciona a rota raiz para a página de mk-credito
  { path: '', redirectTo: 'mk-credito', pathMatch: 'full' }
];
