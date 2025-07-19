import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  forecastList: any[];
  darkMode: boolean;
};

const DailyForecast: React.FC<Props> = ({ forecastList = [], darkMode }) => {
  if (!forecastList || forecastList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, darkMode && { color: 'white' }]}>
          Cargando pronóstico...
        </Text>
      </View>
    );
  }

  // Agrupar ítems por día (usamos un diccionario)
  const groupedByDay: Record<string, any[]> = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  // Obtener los próximos 5 días (excluyendo hoy)
  const today = new Date().toISOString().split('T')[0];
  const futureDays = Object.keys(groupedByDay)
    .filter((date) => date !== today)
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, darkMode && { color: 'white' }]}>Próximos días</Text>
      {futureDays.map((date) => {
        const items = groupedByDay[date];
        const temps = items.map((i) => i.main.temp);
        const minTemp = Math.round(Math.min(...temps));
        const maxTemp = Math.round(Math.max(...temps));
        const humidity = Math.round(
          items.reduce((acc, i) => acc + i.main.humidity, 0) / items.length
        );
        const weather = items[0].weather[0]; // Primer ítem como muestra

        const day = new Date(date).toLocaleDateString(undefined, {
          weekday: 'long',
        });

        return (
          <View key={date} style={styles.card}>
            <View style={styles.left}>
              <Text style={styles.day}>{day}</Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                }}
                style={styles.icon}
              />
            </View>

            <View style={styles.right}>
              <Text style={styles.temp}>🌡️ Mín: {minTemp}°C / Máx: {maxTemp}°C</Text>
              <Text style={styles.humidity}>💧 {humidity}% humedad</Text>
              <Text style={styles.desc}>☁️ {weather.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 80,
  },
  day: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  icon: { width: 50, height: 50 },
  right: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  temp: { fontSize: 16, fontWeight: '600' },
  humidity: { fontSize: 14, color: '#666', marginTop: 4 },
  desc: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default DailyForecast;