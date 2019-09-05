import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaVeiculoComponent } from './pesquisa-veiculo.component';
import { PesquisaVeiculoRoutingModule } from './pesquisa-veiculo-routing.module';
import { VeiculoModule } from './veiculo.module';


@NgModule({
  declarations: [
    PesquisaVeiculoComponent
  ],
  imports: [
    CommonModule,
    PesquisaVeiculoRoutingModule,
    VeiculoModule
  ],
  exports: [
    PesquisaVeiculoComponent
  ]
})
export class PesquisaVeiculoModule { }
