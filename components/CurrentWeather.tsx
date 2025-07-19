import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  city: string;
  icon: string;
  temp: number;
  description: string;
};

const CurrentWeather: React.FC<Props> = ({ city, icon, temp, description }) => (
  <View style={styles.card}>
    <Text style={styles.city}>{city}</Text>
    <Image
      source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
      style={styles.icon}
    />
    <Text style={styles.temp}>{Math.round(temp)}°C</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

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
});

export default CurrentWeather;