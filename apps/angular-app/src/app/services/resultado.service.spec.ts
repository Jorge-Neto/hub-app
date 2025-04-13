import { TestBed } from '@angular/core/testing';

import { ResultadoService } from './resultado.service';
import { Resultado } from '../interfaces/resultado';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ResultadoService', () => {
  let service: ResultadoService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    localStorage.clear();

    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    service = new ResultadoService(snackBarSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new result and store it in localStorage', () => {
    const resultado: Resultado = { lote: 'Lote 1', minimo: 1000, maximo: 2000 };
    service.atualizarResultado(resultado);

    const todos = service.obterTodosResultados();
    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual(resultado);
  });

  it('must remove a result', () => {
    const resultado = { lote: 'Lote 1', minimo: 1000, maximo: 2000 };
    localStorage.setItem('resultadosCalculadora', JSON.stringify([resultado]));

    service = new ResultadoService(snackBarSpy);

    expect(service.obterTodosResultados().length).toBe(1);

    service.removerResultado(0);

    expect(service.obterTodosResultados().length).toBe(0);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Resultado removido!', 'Fechar', jasmine.any(Object));
  });

  it('should clear all results', () => {
    service.atualizarResultado({ lote: 'Lote 1', minimo: 1000, maximo: 2000 });
    service.atualizarResultado({ lote: 'Lote 2', minimo: 2000, maximo: 3000 });

    service.limparTodos();

    expect(service.obterTodosResultados().length).toBe(0);
  });

  it('should not add duplicate result', () => {
    const resultado = { lote: 'A1', minimo: 100, maximo: 200 };
    service.atualizarResultado(resultado);
    service.atualizarResultado(resultado);

    const resultados = service.obterTodosResultados();
    expect(resultados.length).toBe(1);
  });
});
