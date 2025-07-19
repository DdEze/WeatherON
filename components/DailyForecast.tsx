import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  forecastList: any[];
};

const DailyForecast: React.FC<Props> = ({ forecastList }) => {
  // Agrupar por día (1 item por día)
  const days = forecastList.filter((item, index, arr) => {
    const date = new Date(item.dt * 1000).getDate();
    const prevDate = index > 0 ? new Date(arr[index - 1].dt * 1000).getDate() : null;
    return date !== prevDate;
  }).slice(1, 6); // Mostrar los próximos 5 días (ignorando hoy)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximos días</Text>
      {days.map((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString(undefined, { weekday: 'long' });

        return (
          <View key={item.dt} style={styles.card}>
            <Text style={styles.day}>{day}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
            <Text style={styles.desc}>{item.weather[0].description}</Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    justifyContent: 'space-between',
  },
  day: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  icon: { width: 50, height: 50 },
  temp: { fontSize: 18, fontWeight: '600', width: 50, textAlign: 'right' },
  desc: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    flex: 2,
    textAlign: 'right',
    marginLeft: 10,
  },
});

export default DailyForecast;