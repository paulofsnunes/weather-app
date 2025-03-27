// Importações básicas do Angular
import { Component } from '@angular/core';
// Serviço customizado para dados meteorológicos
import { WeatherService } from './weather.service';
// Interface para tipagem das sugestões de localização
import { LocationSuggestion } from './interfaces/location-suggestion';

// Decorador que define o componente raiz
@Component({
  selector: 'app-root', // Seletor usado no index.html
  template: `
    <div class="app-container">
      <h1>Previsão do Tempo</h1>
      <!-- Componente de busca com binding de evento -->
      <app-search (searchEvent)="searchCity($event)"></app-search>
      
      <!-- Estado de loading (exibido durante requisições) -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Carregando dados...</p>
      </div>
      
      <!-- Mensagem de erro (exibida quando ocorrem falhas) -->
      <div *ngIf="error" class="error">
        {{error}}
      </div>
      
      <!-- Componente de exibição com property binding -->
      <app-weather-display [weatherData]="weatherData"></app-weather-display>
    </div>
  `,
  styleUrls: ['./app.component.scss'] // Estilos específicos do componente
})
export class AppComponent {
  // Propriedades do componente:
  weatherData: any;          // Armazena os dados meteorológicos recebidos da API
  loading = false;           // Flag para controlar estado de carregamento
  error: string | null = null; // Armazena mensagens de erro

  // Injeção de dependência do serviço meteorológico
  constructor(private weatherService: WeatherService) {}

  // Método acionado quando o usuário busca uma cidade
  searchCity(cityName: string) {
    // Reseta estados e inicia loading
    this.loading = true;
    this.error = null;
    this.weatherData = null;

    // Chamada ao serviço meteorológico
    this.weatherService.getWeather(cityName).subscribe({
      next: (data) => {
        // Caso de sucesso:
        this.weatherData = data;  // Armazena os dados recebidos
        this.loading = false;     // Finaliza estado de loading
      },
      error: (err) => {
        // Tratamento de erros:
        this.error = 'Não foi possível obter os dados da cidade. Verifique o nome e tente novamente.';
        this.loading = false;     // Finaliza loading
        console.error('Erro na busca:', err); // Log para debug
      }
    });
  }
}