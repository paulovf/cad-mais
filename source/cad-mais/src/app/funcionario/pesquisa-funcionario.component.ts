import { Component, OnInit } from '@angular/core';
import { Funcionario } from './Funcionario.type';
import { FuncionarioService } from './funcionario.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pesquisa-funcionario',
  templateUrl: './pesquisa-funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class PesquisaFuncionarioComponent implements OnInit {
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

  pesquisar(funcionarioForm: NgForm){
    let nome = funcionarioForm.value.nome;
    let cpf = funcionarioForm.value.cpf.replace('.', '').replace('-', '');
    let func = [];
    this.funcionarios = [];
    if(nome == null)
      nome = '';
    
    if(cpf == null)
      cpf = '';

    if(cpf == '' && nome == '')
      this.funcionarios = this.funcionariosOriginal;

    for(let i = 0; i < this.funcionariosOriginal.length; i++){
      if(nome == ''){
        func = this.funcionariosOriginal;
      }
      if(nome != "" && this.funcionariosOriginal[i].nome.toLowerCase().search(nome.toLowerCase()) > -1){
        func.push(this.funcionariosOriginal[i]);
      } 
    }
    if(cpf == '')
      this.funcionarios = func;
    for(let i = 0; i < func.length; i++){
      if(cpf != "" && func[i].cpf.toLowerCase().replace('.', '').replace('-', '').search(cpf.toLowerCase()) > -1){
        this.funcionarios.push(func[i]);
      }
    }
  }
}
