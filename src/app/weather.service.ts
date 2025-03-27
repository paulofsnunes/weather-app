// Importações básicas do Angular
import { Injectable } from '@angular/core';          // Decorador para criar serviços injetáveis
import { HttpClient } from '@angular/common/http';  // Cliente HTTP para requisições API
import { Observable } from 'rxjs';                  // Para trabalhar com streams reativos

// Importa as variáveis de ambiente (contém a chave da API)
import { environment } from '../environments/environment';

// Decorador que define este serviço como injetável e escopo global
@Injectable({
  providedIn: 'root'  // Registra o serviço no injetor raiz (disponível em toda a aplicação)
})
export class WeatherService {
  // URL base da API de previsão do tempo
  private apiUrl = 'https://api.weatherapi.com/v1/current.json';
  
  // Injeção de dependência do HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Método para obter dados meteorológicos de uma cidade
   * @param city Nome da cidade a ser pesquisada
   * @returns Observable com a resposta da API
   */
  getWeather(city: string) {
    // Constrói e executa a requisição GET com parâmetros:
    return this.http.get(
      `${this.apiUrl}?key=${environment.weatherApiKey}&q=${city}&aqi=no&lang=pt`
      // Parâmetros:
      // - key: Chave da API (vem das variáveis de ambiente)
      // - q: Cidade pesquisada (passada como parâmetro)
      // - aqi=no: Exclui dados de qualidade do ar para reduzir o payload
      // - lang=pt: Retorna respostas em português
    );
  }
}