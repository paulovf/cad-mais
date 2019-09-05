import { Component, OnInit } from '@angular/core';

import {VeiculoService} from './veiculo.service';
import {Veiculo} from './veiculo.type';
import { Response } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  veiculos: Veiculo[] = [];
  constructor(private veiculoService: VeiculoService, private router: Router) {
  }

  ngOnInit() {
    this.listarVeiculos();
  }

  listarVeiculos() {
    this.veiculoService.listar()
      .subscribe((response: Response) => {
        this.veiculos = response.json();
      });
  }

  editarVeiculo(idVeiculo: String){
    this.router.navigateByUrl('novo_veiculo?id_veiculo=' + idVeiculo);
  }
}
