import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoComponent } from './veiculo.component';


@NgModule({
  declarations: [
    VeiculoComponent
  ],
  imports: [
    CommonModule,
    VeiculoRoutingModule
  ],
  exports: [
    VeiculoComponent
  ]
})
export class VeiculoModule { }
