import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VeiculoService } from './veiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Veiculo } from './veiculo.type';

@Component({
  selector: 'app-novo-veiculo',
  templateUrl: './novo-veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})

export class NovoVeiculoComponent implements OnInit {
  idVeiculo: string;
  veiculo: Veiculo;
  
  constructor(private veiculoService: VeiculoService, private router: Router, 
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['id_veiculo']){
          this.idVeiculo = params['id_veiculo'];
          this.veiculoService.getVeiculo(this.idVeiculo)
            .subscribe((response) => {        
            this.idVeiculo = response.json();
          });
        }
      }
    );
  }

  ngOnInit() {
  }

  salvarVeiculo(veiculoForm: NgForm) {
    if(this.idVeiculo){
      this.veiculoService.editar(veiculoForm.value).subscribe((response) => {
        if(response.status == 200){
          this.router.navigateByUrl('veiculo');
        }else{
          alert("Erro ao salvar os dados.");
        }
      });
    }else{
      this.veiculoService.salvar(veiculoForm.value).subscribe((response) => {
        if(response.status == 200){
          this.router.navigateByUrl('veiculo');
        }else{
          alert("Erro ao salvar os dados.");
        }
      });
    }
  }
}
