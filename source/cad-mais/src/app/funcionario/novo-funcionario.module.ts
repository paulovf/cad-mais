import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoFuncionarioComponent } from './novo-funcionario.component';
import { NovoFuncionarioRoutingModule } from './novo-funcionario-routing.module';
import {FuncionarioModule} from './funcionario.module';


@NgModule({
  declarations: [
    NovoFuncionarioComponent
  ],
  imports: [
    CommonModule,
    NovoFuncionarioRoutingModule,
    FuncionarioModule
  ],
  exports: [
    NovoFuncionarioComponent
  ]
})
export class NovoFuncionarioModule { }
