import { Component, OnInit } from '@angular/core';
import {Funcionario} from './funcionario.';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  constructor() {
    let func = new Funcionario();
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
    this.funcionarios.push(func);
  }

  ngOnInit() {
  }

}
