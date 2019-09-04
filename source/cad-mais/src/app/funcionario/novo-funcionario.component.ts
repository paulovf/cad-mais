import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FuncionarioService} from './funcionario.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit {
  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
  }

  salvarFuncionario(funcionarioForm: NgForm) {
    this.funcionarioService.salvar(funcionarioForm.value).subscribe((response) => {
      console.log('Response: ' + response);
      console.log('Fim');
    });
  }
}
