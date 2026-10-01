export interface LocationData { latitude:number; longitude:number; city:string; country:string; }
export interface CurrentWeather { temperature:number; weathercode:number; windspeed:number; is_day:number; time:string; }
export interface HourlyWeather { time:string[]; temperature_2m:number[]; weathercode:number[]; relativehumidity_2m:number[]; apparent_temperature:number[]; uv_index:number[]; surface_pressure:number[]; }
export interface DailyWeather { time:string[]; temperature_2m_max:number[]; temperature_2m_min:number[]; weathercode:number[]; precipitation_probability_max:number[]; sunrise:string[]; sunset:string[]; }
export interface WeatherData { current_weather:CurrentWeather; hourly:HourlyWeather; daily:DailyWeather; latitude:number; longitude:number; }
export interface AirQualityData { hourly:{time:string[]; us_aqi:number[]}; }
export interface SearchResult { display_name:string; lat:string; lon:string; address:{city?:string; town?:string; village?:string; county?:string; country?:string; country_code?:string}; }
