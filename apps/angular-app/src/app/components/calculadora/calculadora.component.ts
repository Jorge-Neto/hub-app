import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResultadoService } from '../../services/resultado.service';
import { FormatRealPipe } from '../../pipes/format-real.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule, CommonModule, FormatRealPipe, ReactiveFormsModule],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private resultadoService: ResultadoService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      marca: ['comum'],
      anoFabricacao: [null, [Validators.required, Validators.min(1900)]],
      anoModelo: [null, [Validators.required, Validators.max(2050)]],
      seguradora: ['nenhuma'],
      lote: ['', [Validators.required]],
      sinistro: ['pequena'],
      custosPercentual: [0.1],
      fipe: ['', Validators.required],
      seguro: [''],
      multas: ['']
    });
  }

  valorArremateMin: number = 0;
  valorArremateMax: number = 0;
  resultado: boolean = false;

  calcularValorArremate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      marca, anoFabricacao, anoModelo, seguradora, lote,
      sinistro, custosPercentual, fipe, seguro, multas
    } = this.form.value;

    if (!fipe || !anoFabricacao || !anoModelo || !lote) {
      this.snackbar('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let taxaSeguradora = 0;

    if (seguradora === "porto") {
      taxaSeguradora = 500;
    } else if (seguradora === "hdi_ylm") {
      taxaSeguradora = 50;
    } else if (seguradora === "allianz") {
      taxaSeguradora = 80;
    }

    let custoMarca = marca === "premium" ? 0.1 * Number(fipe) : 0;
    let custoAno = (2025 - anoFabricacao) * 50;
    let custos = Number(fipe) * Number(custosPercentual) + custoMarca + custoAno;

    let descontoMin = sinistro === "pequena" ? 0.2 : 0.4;
    let descontoMax = sinistro === "pequena" ? 0.4 : 0.6;

    let precoRevendaMin = Number(fipe) * (1 - descontoMax);
    let precoRevendaMax = Number(fipe) * (1 - descontoMin);

    // DSAL - Paraná (R$ 300,00)
    // Taxa de entrega (R$ 100,00)
    // Transferência de propriedade (R$ 130,61)
    // Vistoria veicular (R$ 129,33)
    // Título de despesas (R$ 386,00)
    let despesasFixas = 300 + 100 + 130.61 + 129.33 + 386 + seguro + multas + taxaSeguradora;
    let taxaLeilao = 0.05;

    this.valorArremateMin = (precoRevendaMin - custos - despesasFixas) / (1 + taxaLeilao);
    this.valorArremateMax = (precoRevendaMax - custos - despesasFixas) / (1 + taxaLeilao);

    this.resultado = true;
    this.resultadoService.atualizarResultado({ lote: lote, minimo: this.valorArremateMin, maximo: this.valorArremateMax });
  }

  private snackbar(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
