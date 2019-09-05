import { Component, OnInit } from '@angular/core';
import { Veiculo } from './veiculo.type';
import { VeiculoService } from './veiculo.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pesquisa-veiculo',
  templateUrl: './pesquisa-veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class PesquisaVeiculoComponent implements OnInit {
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

  pesquisar(veiculoForm: NgForm){
    let placa = veiculoForm.value.placa;
    let modelo = veiculoForm.value.modelo;
    let func = [];
    this.veiculos = [];
    if(placa == null)
    placa = '';
    
    if(modelo == null)
      modelo = '';

    if(modelo == '' && placa == '')
      this.veiculos = this.veiculosOriginal;

    for(let i = 0; i < this.veiculosOriginal.length; i++){
      if(placa == ''){
        func = this.veiculosOriginal;
      }
      if(placa != "" && this.veiculosOriginal[i].placa.toLowerCase().search(placa.toLowerCase()) > -1){
        func.push(this.veiculosOriginal[i]);
      } 
    }
    if(modelo == '')
      this.veiculos = func;
    for(let i = 0; i < func.length; i++){
      if(modelo != "" && func[i].modelo.toLowerCase().search(modelo.toLowerCase()) > -1){
        this.veiculos.push(func[i]);
      }
    }
  }
}
