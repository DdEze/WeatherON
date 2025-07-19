import axios from 'axios';
import { API_KEY } from '@env';

export const getUvIndex = async (lat: number, lon: number): Promise<number | null> => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error HTTP:', response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    return data.current?.uvi ?? null;
  } catch (error) {
    console.error('Error al obtener el índice UV:', error);
    return null;
  }
};