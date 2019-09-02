import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaFuncionarioComponent } from './pesquisa-funcionario.component';
import { PesquisaFuncionarioRoutingModule } from './pesquisa-funcionario-routing.module';


@NgModule({
  declarations: [
    PesquisaFuncionarioComponent
  ],
  imports: [
    CommonModule,
    PesquisaFuncionarioRoutingModule
  ],
  exports: [
    PesquisaFuncionarioComponent
  ]
})
export class PesquisaFuncionarioModule { }
