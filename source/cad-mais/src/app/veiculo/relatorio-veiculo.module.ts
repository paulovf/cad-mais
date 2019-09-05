import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioVeiculoComponent } from './relatorio-veiculo.component';
import { RelatorioVeiculoRoutingModule } from './relatorio-veiculo-routing.module';
import { VeiculoModule } from './veiculo.module';

@NgModule({
  declarations: [
    RelatorioVeiculoComponent
  ],
  imports: [
    CommonModule,
    RelatorioVeiculoRoutingModule,
    VeiculoModule
  ],
  exports: [
    RelatorioVeiculoComponent
  ]
})
export class RelatorioVeiculoModule { }
