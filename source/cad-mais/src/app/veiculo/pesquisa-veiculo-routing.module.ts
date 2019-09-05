import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PesquisaVeiculoComponent } from './pesquisa-veiculo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'pesquisa_veiculo', component: PesquisaVeiculoComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PesquisaVeiculoRoutingModule { }
