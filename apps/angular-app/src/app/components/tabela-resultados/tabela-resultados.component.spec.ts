import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TabelaResultadosComponent } from './tabela-resultados.component';
import { FormatRealPipe } from '../../pipes/format-real.pipe';
import { ResultadoService } from '../../services/resultado.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TabelaResultadosComponent', () => {
  let component: TabelaResultadosComponent;
  let fixture: ComponentFixture<TabelaResultadosComponent>;
  let service: ResultadoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaResultadosComponent, FormatRealPipe, MatSnackBarModule],
      providers: [ResultadoService]
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaResultadosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultadoService);
    localStorage.clear();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loaded results', () => {
    service.atualizarResultado({ lote: 'Lote Teste', minimo: 123, maximo: 456 });
    component.ngOnInit();
    expect(component.resultados.length).toBeGreaterThan(0);
  });

  it('must remove a result when calling removeResult', fakeAsync(() => {
    service.atualizarResultado({ lote: 'Teste', minimo: 10, maximo: 20 });

    component.ngOnInit();
    tick();

    expect(component.resultados.length).toBe(1);

    component.removerResultado(0);
    tick();

    expect(component.resultados.length).toBe(0);
  }));

  it('must clear all results when calling clearAll', () => {
    service.atualizarResultado({ lote: 'Lote A', minimo: 100, maximo: 200 });
    service.atualizarResultado({ lote: 'Lote B', minimo: 200, maximo: 300 });
    component.ngOnInit();

    component.limparTodos();
    expect(component.resultados.length).toBe(0);
  });
});
