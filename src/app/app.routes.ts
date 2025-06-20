import { Routes } from '@angular/router';
import { PessoaCrudComponent } from './pessoas/pessoa-crud/pessoa-crud';

export const routes: Routes = [
  { path: 'pessoas', component: PessoaCrudComponent },
  // Redireciona a rota raiz para a página de pessoas
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' }
];
