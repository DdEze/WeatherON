import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ForecastDay {
  day: string;
  min: number;
  max: number;
}

interface ForecastChartProps {
  data: ForecastDay[];
}

const screenWidth = Dimensions.get('window').width;

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  // Generar etiquetas cortas: día/mes, mostrando sólo cada 2 días (índices pares)
  const labels = data.map((d, i) => {
    const date = new Date(d.day);
    if (i % 2 === 0) {
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
    return '';
  });

  const maxTemps = data.map(d => d.max);
  const minTemps = data.map(d => d.min);

  const chartData = {
    labels,
    datasets: [
      {
        data: maxTemps,
        color: (opacity = 1) => `rgba(243, 156, 18, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: minTemps,
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Temp Max', 'Temp Min'],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: '#f0f0f0',
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#f0f0f0',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#fff',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ForecastChart;