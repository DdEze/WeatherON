import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import { fetchWeatherByCity } from '../utils/fetchWeather';

const Home: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Por favor, ingresa una ciudad');
      return;
    }

    setError(null);
    Keyboard.dismiss();
    setLoading(true);
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤 WeatherOn</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí una ciudad..."
        value={city}
        onChangeText={setCity}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Buscar clima" onPress={handleSearch} />

      {loading && <Text style={styles.loading}>Cargando...</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>
            {Math.round(weather.main.temp)}°C
          </Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  result: {
    marginTop: 24,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: '300',
  },
  desc: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
  },
});