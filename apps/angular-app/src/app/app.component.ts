import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { TabelaCustosComponent } from './components/tabela-custos/tabela-custos.component';
import { TabelaResultadosComponent } from './components/tabela-resultados/tabela-resultados.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculadoraComponent, TabelaCustosComponent, TabelaResultadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Calculadora de arremate';
}
