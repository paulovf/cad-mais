import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// @ts-ignore
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FuncionarioService  {
  constructor(private http: Http) {}
  listar(): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/listar_funcionarios';
    return this.http.get(url);
  }
}
