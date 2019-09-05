import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioFuncionarioComponent } from './relatorio-funcionario.component';
import { RelatorioFuncionarioRoutingModule } from './relatorio-funcionario-routing.module';
import { FuncionarioModule } from './funcionario.module';

@NgModule({
  declarations: [
    RelatorioFuncionarioComponent
  ],
  imports: [
    CommonModule,
    RelatorioFuncionarioRoutingModule,
    FuncionarioModule
  ],
  exports: [
    RelatorioFuncionarioComponent
  ]
})
export class RelatorioFuncionarioModule { }
