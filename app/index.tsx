import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  ScrollView,
  View
} from 'react-native';
import { fetchWeatherByCity } from '../utils/fetchWeather';
import { fetchWeatherByCoords } from '../utils/getWeatherFromLocation';
import { fetchForecastByCoords } from '../utils/fetchForecast';
import { formatChartData } from '../utils/formatChartData';
import { getUvIndex } from '../utils/getUvIndex';

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
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherByCoords();
        setWeather(data);
        setCity(data.name);
        const uv = await getUvIndex(data.coord.lat, data.coord.lon);
        setUvIndex(uv);


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
        setUvIndex(null);
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
    setUvIndex(null);
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
      setUvIndex(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        darkMode && { backgroundColor: '#121212' }
      ]}
    >
      <View style={{ marginBottom: 20 }}>
        <Button
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          onPress={toggleDarkMode}
        />
      </View>

      <Text style={[styles.title, darkMode && { color: 'white' }]}>
        {darkMode ? '🌒 WeatherOn' : '🌤 WeatherOn'}
      </Text>

       <TextInput
        style={[
          styles.input,
          darkMode && {
            backgroundColor: '#333',
            color: 'white',
            borderColor: '#555',
          }
        ]}
        placeholder="Buscar ciudad..."
        placeholderTextColor={darkMode ? '#aaa' : '#888'}
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
              humidity={weather.main.humidity}
              uvIndex={uvIndex}
            />
          )}
          {forecast && <HourlyForecast forecastList={forecast.list} darkMode={darkMode} />}
          {forecast && <DailyForecast forecastList={forecast.list} darkMode={darkMode} />}
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