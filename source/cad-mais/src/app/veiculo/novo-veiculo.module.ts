import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoVeiculoComponent } from './novo-veiculo.component';
import { NovoVeiculoRoutingModule } from './novo-veiculo-routing.module';
import { VeiculoModule } from './veiculo.module';


@NgModule({
  declarations: [
    NovoVeiculoComponent
  ],
  imports: [
    CommonModule,
    NovoVeiculoRoutingModule,
    VeiculoModule
  ],
  exports: [
    NovoVeiculoComponent
  ]
})
export class NovoVeiculoModule { }
