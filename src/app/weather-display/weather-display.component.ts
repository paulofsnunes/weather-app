// Importa os decoradores e funcionalidades básicas do Angular
import { Component, Input } from '@angular/core';

// Decorador que define o componente
@Component({
  selector: 'app-weather-display', // Seletor usado no HTML
  templateUrl: './weather-display.component.html', // Arquivo de template associado
  styleUrls: ['./weather-display.component.scss'] // Arquivo de estilos associado
})
export class WeatherDisplayComponent {
  // Input property que recebe os dados meteorológicos do componente pai
  @Input() weatherData: any;
  
  // Flag para controlar se houve erro no carregamento da imagem
  imageError = false;

  // Método para obter o ícone do clima
  getWeatherIcon(): string {
    // Verificação segura para evitar erros se os dados estiverem incompletos
    if (!this.weatherData || !this.weatherData.current || !this.weatherData.current.condition) {
      return ''; // Retorna string vazia se dados não estiverem disponíveis
    }
    // Constrói a URL completa do ícone (adiciona 'https:' se necessário)
    return 'https:' + this.weatherData.current.condition.icon;
  }

  // Método para converter graus em direção do vento (rosa dos ventos)
  getWindDirection(degree: number): string {
    // Array com as direções cardeais
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    // Cálculo para converter graus em índice do array
    return directions[Math.round((degree % 360) / 45) % 8];
  }

  // Handler para quando a imagem carrega com sucesso
  onImageLoad() {
    this.imageError = false; // Reseta o flag de erro
  }
  
  // Handler para erro no carregamento da imagem
  onImageError(event: any) {
    this.imageError = true; // Ativa o flag de erro
    event.target.style.display = 'none'; // Oculta a imagem quebrada
  }
}