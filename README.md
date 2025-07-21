# WeatherOn

![React](https://img.shields.io/badge/react-18.2.0-blue?logo=react&style=flat)
![TypeScript](https://img.shields.io/badge/typescript-5.0.0-blue?logo=typescript&style=flat)
![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![License](https://img.shields.io/github/license/DdEze/WeatherOn)
![Release](https://img.shields.io/github/v/tag/DdEze/WeatherOn)
![OpenWeather API](https://img.shields.io/badge/api-OpenWeatherMap-FF6B00?style=flat)

---

## Descripción

Una aplicación movil simple para consultar el pronóstico del clima diario, incluyendo temperaturas máximas, mínimas, humedad y próximamente índice UV.

---

##  Características

- Búsqueda por ciudad

- Temperatura diaria (máx / mín)

- Nivel de humedad

- Modo claro / oscuro

- Gráfico interactivo del clima

- Preparado para mostrar índice UV

---

## Tecnologías utilizadas

- React Native + TypeScript

- OpenWeatherMap API (One Call)

- Chart.js (para gráficos)

---

## Instalación

1- Cloná el repositorio:

```bash
git clone https://github.com/DdEze/WeatherOn.git
cd WeatherOn
```

2- Instalá las dependencias:
```bash
npm install
```

3- Creá un archivo .env en la raíz y agregá tu API key:

```bash
VITE_OPENWEATHER_API_KEY=tu_api_key
```

4- Iniciá el proyecto:

```bash
npm run dev
```

---

## Estructura del proyecto

```
├── .expo
├── app
│   └── index.tsx
├── components
│   ├── CurrentWeather.tsx
│   ├── DailyForecast.tsx
│   ├── ForecastChart.tsx
│   └── HourlyForecast.tsx
├── node_modules
├── utils
│   ├── feachForecast.ts
│   ├── feachWeathher.ts
│   ├── formatChartData.ts
│   ├── getUvIndex.ts
│   └── getWeatherFromLocation.ts
├── .env
├── .gitignore
├── app.json
├── env.d.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── types.ts
```

---

### Licencia

MIT © De Dominicis Ezequiel