import type { AirQualityData, LocationData, SearchResult, WeatherData } from './types';

export function weatherDescription(code:number){
  const m:Record<number,string>={0:'Clear Sky',1:'Mainly Clear',2:'Partly Cloudy',3:'Overcast',45:'Foggy',48:'Icy Fog',51:'Light Drizzle',53:'Drizzle',55:'Heavy Drizzle',61:'Light Rain',63:'Rain',65:'Heavy Rain',71:'Light Snow',73:'Snow',75:'Heavy Snow',77:'Snow Grains',80:'Showers',81:'Rain Showers',82:'Heavy Showers',85:'Snow Showers',86:'Heavy Snow Showers',95:'Thunderstorm',96:'Severe Thunderstorm',99:'Severe Thunderstorm'};
  return m[code] ?? 'Unknown';
}
export function gradientFor(code:number,isDay:boolean){
  if(!isDay)return ['#050d1a','#0a1624']; if(code===0)return ['#0c2d6b','#1565c0']; if(code<=2)return ['#1a3a6c','#2e5f9e']; if(code===3)return ['#1c2a3a','#2a3d52']; if(code<=48)return ['#1a2535','#2a3545']; if(code<=65)return ['#0d1b2a','#122333']; if(code<=86)return ['#192535','#243346']; return ['#050a14','#0a1020'];
}
export function currentHourIndex(times:string[]){
  const now=new Date(); let best=0; let bestDiff=Infinity; times.forEach((t,i)=>{const d=Math.abs(new Date(t).getTime()-now.getTime()); if(d<bestDiff){bestDiff=d;best=i;}}); return best;
}
export function formatHour(s:string){return new Date(s).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}
export function dayName(s:string){const d=new Date(s+'T12:00:00'); const today=new Date(); if(d.toDateString()===today.toDateString())return 'Today'; return d.toLocaleDateString([], {weekday:'long'});}
export function sunTime(s:string){if(!s)return '--'; return new Date(s).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}
export function aqiInfo(aqi:number){if(aqi<=50)return ['Good','#22c55e']; if(aqi<=100)return ['Moderate','#eab308']; if(aqi<=150)return ['Sensitive','#f97316']; if(aqi<=200)return ['Unhealthy','#ef4444']; if(aqi<=300)return ['Very Unhealthy','#a855f7']; return ['Hazardous','#dc2626'];}
export function uvInfo(uv:number){if(uv<=2)return ['Low','#22c55e']; if(uv<=5)return ['Moderate','#eab308']; if(uv<=7)return ['High','#f97316']; if(uv<=10)return ['Very High','#ef4444']; return ['Extreme','#a855f7'];}

export async function fetchWeather(loc:LocationData):Promise<WeatherData>{
 const p=new URLSearchParams({latitude:String(loc.latitude),longitude:String(loc.longitude),current_weather:'true',hourly:'temperature_2m,weathercode,relativehumidity_2m,apparent_temperature,uv_index,surface_pressure',daily:'temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,sunrise,sunset',timezone:'auto',forecast_days:'7'});
 const r=await fetch(`https://api.open-meteo.com/v1/forecast?${p}`); if(!r.ok)throw new Error('Failed to fetch weather data'); return r.json();
}
export async function fetchAirQuality(loc:LocationData):Promise<AirQualityData>{const p=new URLSearchParams({latitude:String(loc.latitude),longitude:String(loc.longitude),hourly:'us_aqi',timezone:'auto'}); const r=await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${p}`); if(!r.ok)throw new Error('Failed to fetch air quality data'); return r.json();}
export async function reverseGeocode(lat:number,lon:number):Promise<{city:string;country:string}>{try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?${new URLSearchParams({lat:String(lat),lon:String(lon),format:'json'})}`); if(!r.ok)throw 0; const d=await r.json(); return {city:d.address?.city||d.address?.town||d.address?.village||d.address?.county||'Unknown',country:d.address?.country_code?.toUpperCase()||''};}catch{return {city:'Unknown',country:''};}}
export async function searchLocations(q:string):Promise<SearchResult[]>{const r=await fetch(`https://nominatim.openstreetmap.org/search?${new URLSearchParams({q,format:'json',addressdetails:'1',limit:'6'})}`); if(!r.ok)throw new Error('Search failed'); return r.json();}
