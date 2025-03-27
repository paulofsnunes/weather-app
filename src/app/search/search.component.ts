// Importações necessárias
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para requisições HTTP
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; // Operadores RxJS
import { Subject } from 'rxjs'; // Para criar observables
import { LocationSuggestion } from '../interfaces/location-suggestion'; // Interface de tipagem

@Component({
  selector: 'app-search', // Seletor do componente
  templateUrl: './search.component.html', // Template associado
  styleUrls: ['./search.component.scss'] // Estilos associados
})
export class SearchComponent {
  // Emissor de eventos para o componente pai
  @Output() searchEvent = new EventEmitter<string>();
  
  // Variáveis de estado
  city: string = ''; // Armazena o valor do input
  suggestions: LocationSuggestion[] = []; // Lista de sugestões de cidades
  
  // Subject para controlar o fluxo de input
  private inputSubject = new Subject<string>();

  // Injeção de dependência do HttpClient
  constructor(private http: HttpClient) {
    this.setupAutocomplete(); // Configura o autocomplete ao inicializar
  }

  // Configura o pipeline de autocomplete
  private setupAutocomplete() {
    this.inputSubject.pipe(
      debounceTime(300), // Aguarda 300ms após a última digitação
      distinctUntilChanged(), // Só continua se o valor mudou
      switchMap(query => this.getCitySuggestions(query)) // Troca para nova requisição
    ).subscribe({
      next: (data) => this.suggestions = data, // Atualiza sugestões
      error: (err) => console.error('Erro ao buscar sugestões:', err) // Tratamento de erro
    });
  }

  // Handler de mudanças no input
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.inputSubject.next(inputElement.value); // Envia valor para o Subject
  }

  // Busca sugestões da API
  private getCitySuggestions(query: string) {
    // Não busca se query menor que 3 caracteres
    if (query.length < 3) {
      this.suggestions = []; // Limpa sugestões
      return []; // Retorna array vazio
    }
    
    // Requisição HTTP para a API de geocoding
    return this.http.get<LocationSuggestion[]>(
      `https://api.locationiq.com/v1/autocomplete?key=pk.f13c771c5a218ff93e9cb8b4abfc609e&q=${query}&limit=5&dedupe=1`
    );
  }

  // Seleciona uma sugestão da lista
  selectSuggestion(suggestion: LocationSuggestion) {
    // Pega apenas o nome principal (antes da primeira vírgula)
    this.city = suggestion.display_name.split(',')[0]; 
    this.suggestions = []; // Limpa sugestões
    this.onSearch(); // Dispara a busca
  }

  // Método para disparar a busca
  onSearch() {
    if (this.city.trim()) { // Verifica se não está vazio
      this.searchEvent.emit(this.city); // Emite o evento para o componente pai
      this.suggestions = []; // Limpa sugestões
    }
  }
}