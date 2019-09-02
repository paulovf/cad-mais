import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PesquisaFuncionarioComponent } from './pesquisa-funcionario.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'pesquisa_funcionario', component: PesquisaFuncionarioComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PesquisaFuncionarioRoutingModule { }
