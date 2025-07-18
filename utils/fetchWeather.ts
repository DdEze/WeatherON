import axios from 'axios';
import { API_KEY } from '@env';

export const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric&lang=es`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Ciudad no encontrada');
    }
    throw new Error('Error al obtener el clima');
  }
};