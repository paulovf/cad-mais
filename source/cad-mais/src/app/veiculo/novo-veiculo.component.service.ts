import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

const host  = 'http://dbapi.io/db/coll';

@Injectable()
export class NovoVeiculoComponentService {

  constructor(private http: Http) {
  }

  enviarVeiculo(veiculoForm: any): Observable<Response> {
    const placa = veiculoForm.placa;
    const ativo = veiculoForm.ativo;
    const anoFabricacao = veiculoForm.anoFabricacao;
    const anoModelo = veiculoForm.anoModelo;
    const chassi = veiculoForm.chassi;
    const dataCadastro = veiculoForm.dataCadastro;
    const dataDesativacao = veiculoForm.dataDesativacao;
    const modelo = veiculoForm.modelo;
    const cor = veiculoForm.cor;
    const consumoMedio = veiculoForm.consumoMedio;
    const quantidadePassageiros = veiculoForm.quantidadePassageiros;

    return this.http.post(host, {placa: placa, ativo: ativo, anoFabricacao: anoFabricacao,
      anoModelo: anoModelo, chassi: chassi, dataCadastro: dataCadastro, 
      dataDesativacao: dataDesativacao, modelo: modelo, cor: cor, consumoMedio: consumoMedio,
      quantidadePassageiros: quantidadePassageiros
    });
  }
}
