import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { NovoVeiculoModule } from './veiculo/novo-veiculo.module';
import { PesquisaVeiculoModule } from './veiculo/pesquisa-veiculo.module';
import { RelatorioVeiculoModule } from './veiculo/relatorio-veiculo.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { NovoFuncionarioModule } from './funcionario/novo-funcionario.module';
import { PesquisaFuncionarioModule } from './funcionario/pesquisa-funcionario.module';
import { RelatorioFuncionarioModule } from './funcionario/relatorio-funcionario.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HomeModule,
    VeiculoModule,
    NovoVeiculoModule,
    PesquisaVeiculoModule,
    RelatorioVeiculoModule,
    FuncionarioModule,
    NovoFuncionarioModule,
    PesquisaFuncionarioModule,
    RelatorioFuncionarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
