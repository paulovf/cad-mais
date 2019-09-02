import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoFuncionarioComponent } from './novo-funcionario.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'novo_funcionario', component: NovoFuncionarioComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class NovoFuncionarioRoutingModule { }
