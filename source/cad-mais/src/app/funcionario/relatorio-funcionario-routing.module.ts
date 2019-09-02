import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RelatorioFuncionarioComponent } from './relatorio-funcionario.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'relatorio_funcionario', component: RelatorioFuncionarioComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RelatorioFuncionarioRoutingModule { }
