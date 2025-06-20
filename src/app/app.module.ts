import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox'; // Importar CheckboxModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoasComponent } from './components/pessoas/pessoas.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FuncionariosComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CheckboxModule // Adicionar CheckboxModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
