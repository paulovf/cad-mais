import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VeiculoComponent } from './veiculo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'veiculo', component: VeiculoComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class VeiculoRoutingModule { }
