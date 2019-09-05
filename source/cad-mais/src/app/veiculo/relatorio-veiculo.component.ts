import { Component, OnInit } from '@angular/core';
import { Veiculo } from './veiculo.type';
import { VeiculoService } from './veiculo.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-relatorio-veiculo',
  templateUrl: './relatorio-veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class RelatorioVeiculoComponent implements OnInit {
  veiculosOriginal: Veiculo[] = [];
  veiculos: Veiculo[] = [];
  constructor(private veiculoService: VeiculoService, private router: Router) { }

  ngOnInit() {
    this.listarVeiculos();
  }

  listarVeiculos() {
    this.veiculoService.listar()
      .subscribe((response: Response) => {
        this.veiculosOriginal = response.json();
        this.veiculos = this.veiculosOriginal;
      });
  }

  relatorio(veiculoForm: NgForm){
    let data_inicial = veiculoForm.value.data_inicial;
    let data_final = veiculoForm.value.data_final;
    this.veiculos = [];
    if(data_inicial == null){
      data_inicial = '';
    }else{
      data_inicial = new Date(parseInt(data_inicial.substring(6, 10)), 
        parseInt(data_inicial.substring(3, 5))-1,
        parseInt(data_inicial.substring(0, 2)));
    }
    if(data_final == null){
      data_final = '';
    }else{
      data_final = new Date(parseInt(data_final.substring(6, 10)), 
        parseInt(data_final.substring(3, 5))-1,
        parseInt(data_final.substring(0, 2)));
    }

    if(data_inicial == '' && data_final == ''){
      this.veiculos = this.veiculosOriginal;
    }else{
      for(let i = 0; i < this.veiculosOriginal.length; i++){
        if(this.veiculosOriginal[i].dataCadastro != null){
          let dtaAtivacao = new Date(parseInt(this.veiculosOriginal[i].dataCadastro.substring(6, 10)), 
            parseInt(this.veiculosOriginal[i].dataCadastro.substring(3, 5))-1,
            parseInt(this.veiculosOriginal[i].dataCadastro.substring(0, 2)));
          if(dtaAtivacao >= data_inicial && dtaAtivacao <= data_final)
            this.veiculos.push(this.veiculosOriginal[i]);
        }
      }
    }
  }
}
