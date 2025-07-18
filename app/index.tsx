import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchWeatherByCity } from '../utils/fetchWeather';
import { fetchWeatherByCoords } from '../utils/getWeatherFromLocation';

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherByCoords();
        setWeather(data);
        setCity(data.name);
      } catch (e: any) {
        setError('No se pudo obtener el clima automáticamente');
      }
      setLoading(false);
    })();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      setError('');
    } catch (e: any) {
      setError('No se pudo encontrar la ciudad');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤 WeatherOn</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar ciudad..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {     flex: 1, backgroundColor: '#f0f0f0', paddingTop: 100, paddingHorizontal: 16, },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: 'red', marginTop: 10 },
  weatherContainer: { marginTop: 20, alignItems: 'center' },
  city: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 48 },
  description: { fontSize: 18, fontStyle: 'italic' },
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center', fontWeight: 'bold',},
});