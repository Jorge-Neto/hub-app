import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResultadoService } from '../../services/resultado.service';
import { FormatRealPipe } from '../../pipes/format-real.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule, CommonModule, FormatRealPipe],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  constructor(private resultadoService: ResultadoService, private snackBar: MatSnackBar) { }

  marca: string = 'comum';
  anoFabricacao: number | null = null;
  anoModelo: number | null = null;
  seguradora: string = 'nenhuma';
  lote: string | null = null;
  sinistro: string = 'pequena';
  custosPercentual: number = 0.1;
  fipe: number | null = null;
  seguro: number | null = null;
  multas: number | null = null;

  valorArremateMin: number = 0;
  valorArremateMax: number = 0;
  resultado: boolean = false;

  calcularValorArremate() {
    if (!this.fipe || !this.anoFabricacao || !this.anoModelo || !this.lote) {
      this.snackbar('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.fipe = Number(String(this.fipe).replace(/\./g, "").replace(",", "."));
    this.anoFabricacao = Number(this.anoFabricacao);
    this.anoModelo = Number(this.anoModelo);
    this.seguro = Number(this.seguro) || 0;
    this.multas = Number(this.multas) || 0;
    this.custosPercentual = Number(this.custosPercentual);

    let taxaSeguradora = 0;

    if (this.seguradora === "porto") {
      taxaSeguradora = 500;
    } else if (this.seguradora === "hdi_ylm") {
      taxaSeguradora = 50;
    } else if (this.seguradora === "allianz") {
      taxaSeguradora = 80;
    }

    let custoMarca = this.marca === "premium" ? 0.1 * Number(this.fipe) : 0;
    let custoAno = (2025 - this.anoFabricacao) * 50;
    let custos = Number(this.fipe) * Number(this.custosPercentual) + custoMarca + custoAno;

    let descontoMin = this.sinistro === "pequena" ? 0.2 : 0.4;
    let descontoMax = this.sinistro === "pequena" ? 0.4 : 0.6;

    let precoRevendaMin = Number(this.fipe) * (1 - descontoMax);
    let precoRevendaMax = Number(this.fipe) * (1 - descontoMin);

    // DSAL - Paraná (R$ 300,00)
    // Taxa de entrega (R$ 100,00)
    // Transferência de propriedade (R$ 130,61)
    // Vistoria veicular (R$ 129,33)
    // Título de despesas (R$ 386,00)
    let despesasFixas = 300 + 100 + 130.61 + 129.33 + 386 + this.seguro + this.multas + taxaSeguradora;
    let taxaLeilao = 0.05;

    this.valorArremateMin = (precoRevendaMin - custos - despesasFixas) / (1 + taxaLeilao);
    this.valorArremateMax = (precoRevendaMax - custos - despesasFixas) / (1 + taxaLeilao);

    this.resultado = true;
    this.resultadoService.atualizarResultado({ lote: this.lote, minimo: this.valorArremateMin, maximo: this.valorArremateMax });
  }

  private snackbar(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
