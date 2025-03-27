// Importações básicas do Angular
import { NgModule } from '@angular/core'; // Decorador NgModule
import { BrowserModule } from '@angular/platform-browser'; // Funcionalidades para aplicações browser
import { HttpClientModule } from '@angular/common/http'; // Para requisições HTTP
import { FormsModule } from '@angular/forms'; // Para formulários e two-way data binding

// Componentes da aplicação
import { AppComponent } from './app.component'; // Componente raiz
import { SearchComponent } from './search/search.component'; // Componente de busca
import { WeatherDisplayComponent } from './weather-display/weather-display.component'; // Componente de exibição

// Decorador que define o módulo principal
@NgModule({
  // Componentes/diretivas/pipes que pertencem a este módulo
  declarations: [
    AppComponent,       // Componente principal (container)
    SearchComponent,    // Componente de busca de cidades
    WeatherDisplayComponent // Componente de exibição do clima
  ],
  
  // Outros módulos que este módulo utiliza
  imports: [
    BrowserModule,      // Módulo essencial para apps web (contém CommonModule)
    HttpClientModule,   // Habilita o sistema de requisições HTTP
    FormsModule         // Habilita template-driven forms e ngModel
  ],
  
  // Serviços disponíveis para injeção em toda a aplicação
  providers: [],        // Neste caso, não há serviços globais
  
  // Componente raiz que será inicializado
  bootstrap: [AppComponent] // Indica que AppComponent é o ponto de entrada
})
export class AppModule { } // Classe do módulo principal