import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private resultadoSource = new BehaviorSubject<{ lote: string, minimo: number, maximo: number } | null>(null);
  resultadoAtual = this.resultadoSource.asObservable();

  atualizarResultado(novoResultado: { lote: string, minimo: number, maximo: number }) {
    this.resultadoSource.next(novoResultado);
  }
}
