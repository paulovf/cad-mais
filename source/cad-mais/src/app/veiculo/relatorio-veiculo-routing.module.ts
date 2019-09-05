import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RelatorioVeiculoComponent } from './relatorio-veiculo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'relatorio_veiculo', component: RelatorioVeiculoComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RelatorioVeiculoRoutingModule { }
