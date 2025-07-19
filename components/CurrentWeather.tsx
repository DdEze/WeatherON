import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  city: string;
  icon: string;
  temp: number;
  description: string;
  humidity: number;
  uvIndex: number | null;
};

const getUvRiskLevel = (uvi: number) => {
  if (uvi < 3) return 'Bajo';
  if (uvi < 6) return 'Moderado';
  if (uvi < 8) return 'Alto';
  if (uvi < 11) return 'Muy alto';
  return 'Extremo';
};

const CurrentWeather: React.FC<Props> = ({ city, icon, temp, description, humidity, uvIndex }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      <Text style={styles.humidity}>Humedad: {humidity}%</Text>
      <Text>
        Índice UV:{' '}
        {uvIndex !== null ? `${uvIndex} (${getUvRiskLevel(uvIndex)})` : 'No disponible'}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  city: { fontSize: 24, fontWeight: 'bold' },
  icon: { width: 120, height: 120 },
  temp: { fontSize: 48, fontWeight: '300' },
  description: { fontSize: 18, fontStyle: 'italic', color: '#555' },
  humidity: { fontSize: 16, color: '#666', marginTop: 4 },
  info: { fontSize: 16, color: '#666', marginTop: 4 },
});

export default CurrentWeather;