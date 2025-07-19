import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

type Props = {
  forecastList: any[];
};

const HourlyForecast: React.FC<Props> = ({ forecastList }) => (
  <View style={{ marginTop: 30, width: '100%' }}>
    <Text style={styles.title}>Pronóstico próximo</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {forecastList.slice(0, 8).map((item) => (
        <View key={item.dt} style={styles.card}>
          <Text style={styles.time}>
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
          <Text style={styles.info}>Humedad: {item.main.humidity}%</Text>
          <Text style={styles.desc}>{item.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  card: {
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
  time: { fontWeight: 'bold', marginBottom: 6 },
  icon: { width: 50, height: 50 },
  temp: { fontSize: 20, fontWeight: '600' },
  desc: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  info: { fontSize: 12, color: '#555', marginTop: 2 },
});

export default HourlyForecast;