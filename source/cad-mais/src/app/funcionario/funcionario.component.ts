import { Component, OnInit } from '@angular/core';

import {FuncionarioService} from './funcionario.service';
import {Funcionario} from './Funcionario.type';
import { Response } from '@angular/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  constructor(private funcionarioService: FuncionarioService) {
    /*let func = new Funcionario();
    func.id = 1;
    func.nome = 'Ulisses Costa';
    func.cpf = '123.456.789-01';
    func.dataNascomento = '15/08/1976';
    func.login = 'ulisses';
    func.senha = '123';
    this.funcionarios.push(func);

    func = new Funcionario();
    func.id = 2;
    func.nome = 'José Trajano';
    func.cpf = '987.654.321-98';
    func.dataNascomento = '02/10/1963';
    func.login = 'trajano';
    func.senha = '321';
    this.funcionarios.push(func);*/
    /*const url = 'http://localhost:7771/cadmais/rest/api/listar_funcionarios';

    this.http.get(url).subscribe((data) => {
      const response = data.json();
      console.log(response);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < response.length; i++) {
        func = new Funcionario();
        func.id = response[i].id_funcionario;
        func.nome = response[i].nome;
        func.cpf = response[i].cpf;
        func.dataNascomento = response[i].data_nascimento;
        func.login = response[i].login;
        func.senha = response[i].senha;
        this.funcionarios.push(func);
      }
    });*/
  }

  ngOnInit() {
    // this.listarFuncionarios();
  }

  listarFuncionarios() {
    this.funcionarioService.listar()
      .subscribe((response: Response) => {
        console.log(response);
        // this.funcionarios = response.json().data;
      });
    /*console.log('222');
    const url = 'http://localhost:7771/cadmais/rest/api/listar_funcionarios';
    this.httpClient.get(url).subscribe((data) => {
      console.log(data);
      const response = data.json();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < response.length; i++) {
        const func = new Funcionario();
        func.id = response[i].id_funcionario;
        func.nome = response[i].nome;
        func.cpf = response[i].cpf;
        func.dataNascomento = response[i].data_nascimento;
        func.login = response[i].login;
        func.senha = response[i].senha;
        this.funcionarios.push(func);
      }
    });*/
  }
}
