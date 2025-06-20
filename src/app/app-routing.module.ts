import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './components/pessoas/pessoas.component'; // 1. Importe o PessoasComponent
import { ClientesComponent } from './components/clientes/clientes.component'; // Exemplo de outra rota

const routes: Routes = [
  { path: 'pessoas', component: PessoasComponent }, // 2. Defina a rota para pessoas
  { path: 'clientes', component: ClientesComponent }, // Rota de exemplo que você já pode ter
  { path: '', redirectTo: '/pessoas', pathMatch: 'full' } // 3. (Opcional) Defina como página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
