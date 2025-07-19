import { ForecastDay } from "../types"; 

export function formatChartData(forecastList: any[]): ForecastDay[] {
  const dailyTemps: { [key: string]: number[] } = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; 
    const temp = item.main.temp;

    if (!dailyTemps[date]) {
      dailyTemps[date] = [];
    }

    dailyTemps[date].push(temp);
  });

  return Object.entries(dailyTemps).map(([date, temps]) => {
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    return {
      day: date,
      min,
      max
    };
  });
}