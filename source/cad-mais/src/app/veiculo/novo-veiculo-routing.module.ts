import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoVeiculoComponent } from './novo-veiculo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'novo_veiculo', component: NovoVeiculoComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class NovoVeiculoRoutingModule { }
