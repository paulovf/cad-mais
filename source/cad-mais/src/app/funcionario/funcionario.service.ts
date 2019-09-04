import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FuncionarioService  {
  constructor(private http: Http) {}
  listar(): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/listar_funcionarios';
    return this.http.get(url);
  }
  salvar(funcionarioForm: any): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/cadastrar_funcionario';
    const campoCpf = funcionarioForm.cpf;
    const campoNome = funcionarioForm.nome;
    const campoDataNascomento = funcionarioForm.data_nascimento;
    const campoLogin = funcionarioForm.login;
    const campoSenha = funcionarioForm.senha;

    return this.http.post(url, {cpf: campoCpf, nome: campoNome, data_nascomento: campoDataNascomento,
      login: campoLogin, senha: campoSenha});
  }
}
