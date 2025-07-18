import * as Location from 'expo-location';
import axios from 'axios';
import { API_KEY } from '@env';

export const fetchWeatherByCoords = async () => {
  // Pedir permiso de ubicación
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación denegado');
  }

  // Obtener ubicación actual
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  // Llamar a la API del clima con coordenadas
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
  );

  return response.data;
};