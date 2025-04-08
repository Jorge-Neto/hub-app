import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resultado } from '../interfaces/resultado';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private resultadosKey = 'resultadosCalculadora';
  private resultados: Resultado[] = this.carregarResultados();

  private resultadoSource = new BehaviorSubject<Resultado | null>(null);
  resultadoAtual = this.resultadoSource.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  atualizarResultado(novoResultado: Resultado) {
    this.resultados.push(novoResultado);
    this.salvarResultados();
    this.resultadoSource.next(novoResultado);
    this.snackbar('Resultado adicionado com sucesso!');
  }

  obterTodosResultados(): Resultado[] {
    return [...this.resultados];
  }

  removerResultado(index: number) {
    this.resultados.splice(index, 1);
    this.salvarResultados();
    this.snackbar('Resultado removido!');
  }

  limparTodos() {
    this.resultados = [];
    localStorage.removeItem(this.resultadosKey);
    this.snackbar('Todos os resultados foram limpos!');
  }

  private salvarResultados() {
    localStorage.setItem(this.resultadosKey, JSON.stringify(this.resultados));
  }

  private carregarResultados(): Resultado[] {
    const dados = localStorage.getItem(this.resultadosKey);
    return dados ? JSON.parse(dados) : [];
  }

  private snackbar(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
