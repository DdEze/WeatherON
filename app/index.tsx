import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import { fetchWeatherByCity } from '../utils/fetchWeather';
import { fetchWeatherByCoords } from '../utils/getWeatherFromLocation';
import { fetchForecastByCoords } from '../utils/fetchForecast';
import { formatChartData } from '../utils/formatChartData';

import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import ForecastChart from '../components/ForecastChart';

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherByCoords();
        setWeather(data);
        setCity(data.name);

        const forecastData = await fetchForecastByCoords(
          data.coord.lat,
          data.coord.lon
        );
        setForecast(forecastData);
        setError('');
      } catch (e: any) {
        setError('No se pudo obtener el clima automáticamente');
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad válida');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);
    Keyboard.dismiss();

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);

      const forecastData = await fetchForecastByCoords(
        data.coord.lat,
        data.coord.lon
      );
      setForecast(forecastData);
      setError('');
    } catch (e: any) {
      setError('No se pudo encontrar la ciudad');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌤 WeatherOn</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar ciudad..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          {weather && (
            <CurrentWeather
              city={weather.name}
              temp={weather.main.temp}
              description={weather.weather[0].description}
              icon={weather.weather[0].icon}
            />
          )}
          {forecast && <HourlyForecast forecastList={forecast.list} />}
          {forecast && <DailyForecast forecastList={forecast.list} />}
          {forecast && (
            <ForecastChart data={formatChartData(forecast.list)} />
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 16,
    backgroundColor: '#9eeff1ff',
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: 'white',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
});