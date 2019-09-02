import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

const host  = 'http://dbapi.io/db/coll';

@Injectable()
export class NovoFuncionarioComponentService {

  constructor(private http: Http) {
  }

  enviarContato(funcionarioForm: any): Observable<Response> {
    const nome = funcionarioForm.nome;
    const cpf = funcionarioForm.cpf;
    const data_nascimento = funcionarioForm.data_nascimento;
    const login = funcionarioForm.login;
    const senha = funcionarioForm.senha;

    return this.http.post(host, {email: nome, from: nome, message: nome});
  }
}
