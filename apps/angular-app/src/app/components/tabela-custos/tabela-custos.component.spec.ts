import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCustosComponent } from './tabela-custos.component';
import { By } from '@angular/platform-browser';

describe('TabelaCustosComponent', () => {
  let component: TabelaCustosComponent;
  let fixture: ComponentFixture<TabelaCustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaCustosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabelaCustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must render all items in the cost list', () => {
    const itens = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(itens.length).toBe(8);
    expect(itens[0].nativeElement.textContent).toContain('Taxa do leiloeiro');
    expect(itens[1].nativeElement.textContent).toContain('DSAL - Paraná');
    expect(itens[2].nativeElement.textContent).toContain('Taxa de entrega');
  });

  it('should render the attention text correctly', () => {
    const atencao = fixture.debugElement.query(By.css('.text-danger'));
    expect(atencao).toBeTruthy();
    expect(atencao.nativeElement.textContent).toContain('Atenção');
    expect(atencao.nativeElement.textContent).toContain('Multas acima de R$ 500,00');
  });
});
