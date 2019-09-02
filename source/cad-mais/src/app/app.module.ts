import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculoModule } from './veiculo/veiculo.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { NovoFuncionarioModule } from './funcionario/novo-funcionario.module';
import { PesquisaFuncionarioModule } from './funcionario/pesquisa-funcionario.module';
import { RelatorioFuncionarioModule } from './funcionario/relatorio-funcionario.module';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    VeiculoModule,
    FuncionarioModule,
    NovoFuncionarioModule,
    PesquisaFuncionarioModule,
    RelatorioFuncionarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
