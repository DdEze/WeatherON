import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';
import { fetchWeatherByCity } from '../utils/fetchWeather';
import { fetchWeatherByCoords } from '../utils/getWeatherFromLocation';
import { fetchForecastByCoords } from '../utils/fetchForecast';

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
            <View style={styles.card}>
              <Text style={styles.city}>{weather.name}</Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                }}
                style={styles.icon}
              />
              <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
              <Text style={styles.description}>
                {weather.weather[0].description}
              </Text>
            </View>
          )}

          {forecast && (
            <View style={{ marginTop: 30, width: '100%' }}>
              <Text style={styles.forecastTitle}>Pronóstico próximo</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {forecast.list.slice(0, 8).map((item: any) => (
                  <View key={item.dt} style={styles.forecastCard}>
                    <Text style={styles.forecastTime}>
                      {new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                      }}
                      style={styles.forecastIcon}
                    />
                    <Text style={styles.forecastTemp}>
                      {Math.round(item.main.temp)}°C
                    </Text>
                    <Text style={styles.forecastDesc}>
                      {item.weather[0].description}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
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
    backgroundColor: '#f0f0f0',
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
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
    width: '100%',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 48,
    fontWeight: '300',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
  forecastTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  forecastCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  forecastTime: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 20,
    fontWeight: '600',
  },
  forecastDesc: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
});