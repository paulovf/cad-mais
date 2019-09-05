import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VeiculoService  {
  constructor(private http: Http) {}
  listar(): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/listar_veiculos';
    return this.http.get(url);
  }
  getVeiculo(idVeiculo: string): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/get_veiculo/' + idVeiculo;
    return this.http.get(url);
  }
  salvar(veiculoForm: any): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/cadastrar_veiculo';
    const placa = veiculoForm.placa;
    const ativo = veiculoForm.ativo;
    const anoFabricacao = veiculoForm.anoFabricacao;
    const anoModelo = veiculoForm.anoModelo;
    const chassi = veiculoForm.chassi;
    const dataCadastro = veiculoForm.dataCadastro;
    const dataDesativacao = veiculoForm.dataDesativacao;
    const modelo = veiculoForm.modelo;
    const cor = veiculoForm.cor;
    const consumoMedioKm = veiculoForm.consumoMedioKm;
    const quantidadePassageiros = veiculoForm.quantidadePassageiros;

    return this.http.post(url, {placa: placa, ativo: ativo, anoFabricacao: anoFabricacao,
      anoModelo: anoModelo, chassi: chassi, dataCadastro: dataCadastro, 
      dataDesativacao: dataDesativacao, modelo: modelo, cor: cor, consumoMedioKm: consumoMedioKm,
      quantidadePassageiros: quantidadePassageiros
    });
  }
  editar(veiculoForm: any): Observable<Response> {
    const url = 'http://localhost:7771/cadmais/rest/api/alterar_veiculo';
    const idVeiculo = veiculoForm.idVeiculo;
    const placa = veiculoForm.placa;
    const ativo = veiculoForm.ativo;
    const anoFabricacao = veiculoForm.anoFabricacao;
    const anoModelo = veiculoForm.anoModelo;
    const chassi = veiculoForm.chassi;
    const dataCadastro = veiculoForm.dataCadastro;
    const dataDesativacao = veiculoForm.dataDesativacao;
    const modelo = veiculoForm.modelo;
    const cor = veiculoForm.cor;
    const consumoMedioKm = veiculoForm.consumoMedioKm;
    const quantidadePassageiros = veiculoForm.quantidadePassageiros;

    return this.http.put(url, {idVeiculo: idVeiculo, placa: placa, ativo: ativo, 
      anoFabricacao: anoFabricacao, anoModelo: anoModelo, chassi: chassi, dataCadastro: dataCadastro, 
      dataDesativacao: dataDesativacao, modelo: modelo, cor: cor, consumoMedioKm: consumoMedioKm,
      quantidadePassageiros: quantidadePassageiros
    });
  }
}
