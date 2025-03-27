# 🌤️ Weather App - Angular

Aplicação de previsão do tempo desenvolvida com Angular 14 e Node.js 16.10.0, consumindo as API's WeatherAPI.com e LocationIQ.

## 🚀 Pré-requisitos

- Node.js 16.10.0
- Angular CLI 14.x
- Conta na [WeatherAPI](https://www.weatherapi.com/) (para chave de API)

## 🛠️ Configuração do Ambiente

1. **Instale o Node.js 16.10.0**:

  nvm install 16.10.0
  nvm use 16.10.0

2. **Instale o Angular CLI**:

  npm install -g @angular/cli@14

3. **Clone o repositório**:

  git clone https://github.com/seu-usuario/weather-app.git
  cd weather-app

4. **Instale as dependências**:

  npm install

5. **Configure as variáveis de ambiente**:
**Crie src/environments/environment.ts com:**

export const environment = {
  production: false,
  weatherApiKey: 'sua_chave_dev_aqui'
};

6. **🔥 Executando Localmente**:

ng serve --open

7. **📦 Build para Produção**:

ng build --configuration production
