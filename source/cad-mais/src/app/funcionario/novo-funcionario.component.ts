import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NovoFuncionarioComponentService} from './novo-funcionario.component.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit {

  constructor(private contatoComponentService: NovoFuncionarioComponentService) { }

  ngOnInit() {
  }

  salvarFuncionario(contatoForm: NgForm) {
    console.log(contatoForm.value);

    this.contatoComponentService.enviarContato(contatoForm.value).subscribe((response) => {
      console.log('Response: ' + response);
      console.log('Fim');
    });
  }
}
