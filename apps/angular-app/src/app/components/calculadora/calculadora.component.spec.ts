import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraComponent } from './calculadora.component';
import { ResultadoService } from '../../services/resultado.service';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;
  let service: ResultadoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ResultadoService);
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add duplicate results', () => {
    const resultado = { lote: 'B2', minimo: 150, maximo: 250 };
    service.atualizarResultado(resultado);

    service.atualizarResultado(resultado);

    const resultados = service.obterTodosResultados();
    expect(resultados.filter(r => r.lote === 'B2').length).toBe(1);
  });
});
