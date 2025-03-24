import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCustosComponent } from './tabela-custos.component';

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
});
