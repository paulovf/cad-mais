import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Funcionario } from './Funcionario.type';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})

export class NovoFuncionarioComponent implements OnInit {
  idFuncionario: string;
  funcionario: Funcionario;
  
  constructor(private funcionarioService: FuncionarioService, private router: Router, 
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['id_funcionario']){
          this.idFuncionario = params['id_funcionario'];
          this.funcionarioService.getFuncionario(this.idFuncionario)
            .subscribe((response) => {        
            this.funcionario = response.json();
          });
        }
      }
    );
  }

  ngOnInit() {
  }

  salvarFuncionario(funcionarioForm: NgForm) {
    if(this.idFuncionario){
      this.funcionarioService.editar(funcionarioForm.value).subscribe((response) => {
        if(response.status == 200){
          this.router.navigateByUrl('funcionario');
        }else{
          alert("Erro ao salvar os dados.");
        }
      });
    }else{
      this.funcionarioService.salvar(funcionarioForm.value).subscribe((response) => {
        if(response.status == 200){
          this.router.navigateByUrl('funcionario');
        }else{
          alert("Erro ao salvar os dados.");
        }
      });
    }
  }
}
