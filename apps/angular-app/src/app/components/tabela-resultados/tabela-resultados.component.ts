import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoService } from '../../services/resultado.service';
import { FormatRealPipe } from '../../pipes/format-real.pipe';
import { Resultado } from '../../interfaces/resultado';

@Component({
  selector: 'app-tabela-resultados',
  imports: [CommonModule, FormatRealPipe],
  templateUrl: './tabela-resultados.component.html',
  styleUrl: './tabela-resultados.component.scss'
})
export class TabelaResultadosComponent {
  resultados: Resultado[] = [];

  constructor(private resultadoService: ResultadoService) { }

  ngOnInit() {
    this.resultados = this.resultadoService.obterTodosResultados();

    this.resultadoService.resultadoAtual.subscribe(dados => {
      if (dados && !this.resultados.some(r => r.lote === dados.lote && r.minimo === dados.minimo && r.maximo === dados.maximo)) {
        this.resultados.push(dados);
      }
    });
  }

  removerResultado(index: number) {
    this.resultadoService.removerResultado(index);
    this.resultados.splice(index, 1);
  }

  limparTodos() {
    this.resultadoService.limparTodos();
    this.resultados = [];
  }
}
