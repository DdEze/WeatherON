import axios from 'axios';
import { API_KEY } from '@env';

export const fetchForecastByCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el pronóstico');
  }
};