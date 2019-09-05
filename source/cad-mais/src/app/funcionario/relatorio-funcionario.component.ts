import { Component, OnInit } from '@angular/core';
import { Funcionario } from './Funcionario.type';
import { FuncionarioService } from './funcionario.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-relatorio-funcionario',
  templateUrl: './relatorio-funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class RelatorioFuncionarioComponent implements OnInit {
  funcionariosOriginal: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  constructor(private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit() {
    this.listarFuncionarios();
  }

  listarFuncionarios() {
    this.funcionarioService.listar()
      .subscribe((response: Response) => {
        this.funcionariosOriginal = response.json();
        this.funcionarios = this.funcionariosOriginal;
      });
  }

  relatorio(funcionarioForm: NgForm){
    let data_inicial = funcionarioForm.value.data_inicial;
    let data_final = funcionarioForm.value.data_final;
    this.funcionarios = [];
    if(data_inicial == null){
      data_inicial = '';
    }else{
      data_inicial = new Date(parseInt(data_inicial.substring(6, 10)), 
        parseInt(data_inicial.substring(3, 5))-1,
        parseInt(data_inicial.substring(0, 2)));
    }
    if(data_final == null){
      data_final = '';
    }else{
      data_final = new Date(parseInt(data_final.substring(6, 10)), 
        parseInt(data_final.substring(3, 5))-1,
        parseInt(data_final.substring(0, 2)));
    }

    if(data_inicial == '' && data_final == ''){
      this.funcionarios = this.funcionariosOriginal;
    }else{
      for(let i = 0; i < this.funcionariosOriginal.length; i++){
        if(this.funcionariosOriginal[i].dataNascimento != null){
          let dtaNasc = new Date(parseInt(this.funcionariosOriginal[i].dataNascimento.substring(6, 10)), 
            parseInt(this.funcionariosOriginal[i].dataNascimento.substring(3, 5))-1,
            parseInt(this.funcionariosOriginal[i].dataNascimento.substring(0, 2)));
          if(dtaNasc >= data_inicial && dtaNasc <= data_final)
            this.funcionarios.push(this.funcionariosOriginal[i]);
        }
      }
    }
  }
}
