import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import {NovoFuncionarioComponentService} from './novo-funcionario.component.service';
import {FormsModule} from '@angular/forms';
import {FuncionarioService} from './funcionario.service';


@NgModule({
  declarations: [
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuncionarioRoutingModule
  ],
  exports: [
    FormsModule,
    FuncionarioComponent
  ],
  providers: [ NovoFuncionarioComponentService, FuncionarioService ]
})
export class FuncionarioModule { }
