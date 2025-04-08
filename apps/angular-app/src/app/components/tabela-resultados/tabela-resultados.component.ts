import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoService } from '../../services/resultado.service';
import { FormatRealPipe } from '../../pipes/format-real.pipe';

@Component({
  selector: 'app-tabela-resultados',
  imports: [CommonModule, FormatRealPipe],
  templateUrl: './tabela-resultados.component.html',
  styleUrl: './tabela-resultados.component.scss'
})
export class TabelaResultadosComponent {
  resultados: { lote: string, minimo: number; maximo: number }[] = [];

  constructor(private resultadoService: ResultadoService) { }

  ngOnInit() {
    this.resultadoService.resultadoAtual.subscribe(dados => {
      if (dados) this.resultados.push(dados);
    });
  }

  removerResultado(index: number) {
    this.resultados.splice(index, 1);
  }
}
