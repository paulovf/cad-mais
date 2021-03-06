import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { NovoVeiculoComponentService} from './novo-veiculo.component.service';
import { FormsModule} from '@angular/forms';
import { VeiculoService} from './veiculo.service';


@NgModule({
  declarations: [
    VeiculoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VeiculoRoutingModule
  ],
  exports: [
    FormsModule,
    VeiculoComponent
  ],
  providers: [ NovoVeiculoComponentService, VeiculoService ]
})
export class VeiculoModule { }
