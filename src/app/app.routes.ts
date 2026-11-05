import { Routes } from '@angular/router';
import { AnaliseCreditoComponent } from './analise-credito/analise-credito.component';
import { ClienteComponent } from './clientes/cliente.component';

export const routes: Routes = [
  { path: 'analise-credito', component: AnaliseCreditoComponent },
  { path: 'clientes', component: ClienteComponent },
  // Redirecionamentos para compatibilidade
  { path: 'mk-credito', redirectTo: 'analise-credito', pathMatch: 'full' },
  { path: 'pessoas', redirectTo: 'clientes', pathMatch: 'full' },
  // Rota raiz
  { path: '', redirectTo: 'analise-credito', pathMatch: 'full' }
];
