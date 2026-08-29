import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import {
  AirVent,
  ChevronDown,
  CircleAlert,
  Crosshair,
  Flame,
  LocateFixed,
  MapPinned,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Thermometer,
  TreePine,
  Users,
  Wind,
  X,
  Droplets,
  Eye,
  Gauge,
  Recycle,
  Leaf,
  Navigation,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

/* =========================================================
   EcoDrop – Basra
   Map page: frontend-only + API-ready
   Theme follows the existing EcoDrop palette:
   denim / dustyRose / antiqueCream / sage / warmTaupe.
   ========================================================= */

const THEME = {
  denim: "#2F3E4E",
  dustyRose: "#B57A7F",
  antiqueCream: "#F1E8DB",
  sage: "#7B846D",
  warmTaupe: "#8E7967",
  forest: "#55624A",
  softGreen: "#AAB29E",
  deepGreen: "#4E5B45",
  softRose: "#D9A7AA",
  creamLight: "#FBF7F0",
  pinkCream: "#F4E2DF",
};

const BASRA_CENTER = [30.5085, 47.7804];

const ENVIRONMENTAL_DATA = {
  "Al-Ashar": {
    position: [30.5104, 47.8102],
    score: 72,
    aqi: 87,
    pm25: 32,
    pm10: 58,
    co: 0.62,
    no2: 28,
    so2: 11,
    o3: 64,
    greenCoverage: 18,
    treePriority: "HIGH",
    wasteRisk: "MEDIUM",
    reason: "Low green coverage and elevated pollution levels.",
    explanation:
      "This area has moderate air pollution and limited green coverage. Increasing vegetation could help improve local air quality and provide a healthier urban environment.",
    weatherFallback: {
      temperature: 32,
      feelsLike: 36,
      humidity: 48,
      wind: 18,
      condition: "Clear",
      visibility: 9.4,
    },
  },
  "Al-Jubaila": {
    position: [30.4748, 47.7758],
    score: 68,
    aqi: 94,
    pm25: 36,
    pm10: 62,
    co: 0.72,
    no2: 31,
    so2: 13,
    o3: 61,
    greenCoverage: 14,
    treePriority: "HIGH",
    wasteRisk: "HIGH",
    reason: "Dense urban activity with limited green coverage.",
    explanation:
      "The area would benefit from additional trees, better waste collection and community-led greening.",
    weatherFallback: {
      temperature: 32,
      feelsLike: 36,
      humidity: 49,
      wind: 17,
      condition: "Clear",
      visibility: 8.9,
    },
  },
  "Al-Tanuma": {
    position: [30.5602, 47.8212],
    score: 79,
    aqi: 74,
    pm25: 27,
    pm10: 51,
    co: 0.49,
    no2: 22,
    so2: 9,
    o3: 68,
    greenCoverage: 24,
    treePriority: "MEDIUM",
    wasteRisk: "MEDIUM",
    reason: "Green coverage is improving but additional shade is needed.",
    explanation:
      "Tanuma has a stronger environmental baseline, while additional trees could create cooler and more walkable streets.",
    weatherFallback: {
      temperature: 31,
      feelsLike: 35,
      humidity: 51,
      wind: 19,
      condition: "Clear",
      visibility: 10,
    },
  },
  "Abu Al-Khasib": {
    position: [30.4464, 48.0207],
    score: 84,
    aqi: 61,
    pm25: 21,
    pm10: 43,
    co: 0.38,
    no2: 18,
    so2: 7,
    o3: 71,
    greenCoverage: 31,
    treePriority: "MEDIUM",
    wasteRisk: "LOW",
    reason: "Good green potential with several areas suitable for planting.",
    explanation:
      "The area has comparatively better environmental conditions. Protecting existing vegetation while adding targeted street trees can improve resilience.",
    weatherFallback: {
      temperature: 31,
      feelsLike: 34,
      humidity: 55,
      wind: 20,
      condition: "Clear",
      visibility: 10,
    },
  },
  "Al-Zubair": {
    position: [30.3915, 47.7011],
    score: 58,
    aqi: 112,
    pm25: 44,
    pm10: 76,
    co: 0.91,
    no2: 39,
    so2: 18,
    o3: 57,
    greenCoverage: 10,
    treePriority: "HIGH",
    wasteRisk: "HIGH",
    reason: "Elevated pollution indicators and very limited green coverage.",
    explanation:
      "Environmental pressure is higher in this area. Tree planting should be paired with waste-management and pollution monitoring initiatives.",
    weatherFallback: {
      temperature: 33,
      feelsLike: 38,
      humidity: 42,
      wind: 21,
      condition: "Hot",
      visibility: 7.8,
    },
  },
  "Shatt Al-Arab": {
    position: [30.515, 47.862],
    score: 88,
    aqi: 56,
    pm25: 18,
    pm10: 39,
    co: 0.31,
    no2: 15,
    so2: 6,
    o3: 73,
    greenCoverage: 38,
    treePriority: "LOW",
    wasteRisk: "LOW",
    reason: "Strong natural green potential along the river corridor.",
    explanation:
      "The river corridor has valuable ecological potential. Protecting vegetation and reducing litter can strengthen the local environment.",
    weatherFallback: {
      temperature: 31,
      feelsLike: 34,
      humidity: 57,
      wind: 20,
      condition: "Clear",
      visibility: 10,
    },
  },
  "Basra City Center": {
    position: [30.5087, 47.7804],
    score: 70,
    aqi: 91,
    pm25: 35,
    pm10: 61,
    co: 0.67,
    no2: 30,
    so2: 12,
    o3: 63,
    greenCoverage: 16,
    treePriority: "HIGH",
    wasteRisk: "MEDIUM",
    reason: "High urban density and insufficient shade coverage.",
    explanation:
      "The city center would benefit from street trees, shaded pedestrian routes and stronger recycling access.",
    weatherFallback: {
      temperature: 32,
      feelsLike: 36,
      humidity: 48,
      wind: 18,
      condition: "Clear",
      visibility: 9.2,
    },
  },
};

const TREE_ZONES = [
  {
    area: "Al-Ashar",
    position: [30.5104, 47.8102],
    trees: 120,
    priority: "HIGH",
  },
  {
    area: "Al-Jubaila",
    position: [30.4748, 47.7758],
    trees: 180,
    priority: "HIGH",
  },
  {
    area: "Al-Zubair",
    position: [30.3915, 47.7011],
    trees: 240,
    priority: "HIGH",
  },
  {
    area: "Basra City Center",
    position: [30.5087, 47.7804],
    trees: 150,
    priority: "HIGH",
  },
  {
    area: "Al-Tanuma",
    position: [30.5602, 47.8212],
    trees: 90,
    priority: "MEDIUM",
  },
];

const MOCK_PLACES = [
  {
    id: "recycle-1",
    name: "EcoDrop Recycling Point",
    category: "recycling",
    position: [30.512, 47.802],
    area: "Al-Ashar",
    services: ["Plastic", "Paper", "Metal"],
    hours: "8:00 AM – 5:00 PM",
  },
  {
    id: "recycle-2",
    name: "Basra Scrap & Recycling",
    category: "scrap",
    position: [30.486, 47.771],
    area: "Al-Jubaila",
    services: ["Metal", "Scrap"],
    hours: "8:00 AM – 4:00 PM",
  },
  {
    id: "park-1",
    name: "Basra Green Space",
    category: "green",
    position: [30.516, 47.788],
    area: "Basra City Center",
    services: ["Green space", "Community planting"],
    hours: "Open daily",
  },
  {
    id: "waste-1",
    name: "Waste Collection Point",
    category: "waste",
    position: [30.496, 47.823],
    area: "Al-Ashar",
    services: ["Household waste"],
    hours: "7:00 AM – 7:00 PM",
  },
];

const INITIAL_FIRE_REPORTS = [
  {
    id: "fire-1",
    area: "Al-Zubair",
    position: [30.399, 47.713],
    type: "Scrap Burning",
    severity: "High",
    status: "Monitoring",
    date: "Demo report",
  },
  {
    id: "fire-2",
    area: "Al-Ashar",
    position: [30.517, 47.817],
    type: "Waste Burning",
    severity: "Medium",
    status: "Reported",
    date: "Demo report",
  },
];

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    title: "Green Basra – Al-Ashar",
    description: "Plant 100 trees in Al-Ashar.",
    points: 150,
    participants: ["Noor Ali", "Sara Mohammed", "Ahmed Hassan", "Zainab Kareem"],
  },
  {
    id: 2,
    title: "Tanuma Green Zone",
    description: "Help plant trees around Tanuma.",
    points: 200,
    participants: ["Omar Saad", "Huda Abbas", "Mustafa Raad"],
  },
  {
    id: 3,
    title: "Abu Al-Khasib Green Streets",
    description: "Create greener streets in Abu Al-Khasib.",
    points: 100,
    participants: ["Lina Ahmed", "Noor Ali"],
  },
];

const PARTICIPANT_NAMES = [
  "Noor Ali",
  "Sara Mohammed",
  "Ahmed Hassan",
  "Zainab Kareem",
  "Omar Saad",
  "Huda Abbas",
  "Mustafa Raad",
  "Lina Ahmed",
];

const WMO = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function markerIcon(emoji, background = THEME.sage) {
  return L.divIcon({
    className: "ecodrop-marker",
    html: `
      <div style="
        width:38px;height:38px;border-radius:50% 50% 50% 4px;
        transform:rotate(-45deg);
        background:${background};
        border:3px solid ${THEME.creamLight};
        box-shadow:0 6px 16px rgba(47,62,78,.25);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:18px">${emoji}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
}

function aqiMeta(aqi) {
  if (aqi <= 50)
    return {
      label: "Good",
      message: "Air quality is healthy.",
      bg: "#DDE7C7",
      text: THEME.deepGreen,
    };
  if (aqi <= 100)
    return {
      label: "Moderate",
      message: "Most people can continue normal outdoor activities.",
      bg: THEME.antiqueCream,
      text: THEME.warmTaupe,
    };
  if (aqi <= 150)
    return {
      label: "Unhealthy",
      message: "Sensitive groups should reduce prolonged outdoor activity.",
      bg: THEME.pinkCream,
      text: THEME.dustyRose,
    };
  if (aqi <= 200)
    return {
      label: "Very Unhealthy",
      message: "Avoid prolonged outdoor exposure.",
      bg: "#EFD6D4",
      text: "#8E4C52",
    };
  return {
    label: "Hazardous",
    message: "Avoid outdoor activity and remain indoors when possible.",
    bg: "#D8C7C8",
    text: "#6D3C43",
  };
}

function outdoorSafety(weather, aqi) {
  if (aqi >= 151 || weather.temperature >= 42)
    return {
      label: "High Risk",
      message: "Avoid prolonged outdoor exposure and take extra precautions.",
    };
  if (aqi >= 101 || weather.temperature >= 38)
    return {
      label: "Moderate",
      message:
        "Outdoor activities are possible, but prolonged exposure is not recommended during peak heat.",
    };
  return {
    label: "Good",
    message: "Outdoor activities are generally suitable with normal precautions.",
  };
}

function getDistanceKm(a, b) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

async function getLiveWeather(position, fallback) {
  try {
    const [lat, lon] = position;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,visibility` +
      `&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API unavailable");
    const data = await response.json();
    const c = data.current;
    return {
      temperature: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      humidity: Math.round(c.relative_humidity_2m),
      wind: Math.round(c.wind_speed_10m),
      condition: WMO[c.weather_code] || "Current conditions",
      visibility: Number(c.visibility / 1000).toFixed(1),
      live: true,
    };
  } catch {
    return { ...fallback, live: false };
  }
}

async function getLiveAir(position, fallback) {
  try {
    const [lat, lon] = position;
    const url =
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}` +
      `&current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone` +
      `&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Air API unavailable");
    const data = await response.json();
    const c = data.current;
    return {
      aqi: Math.round(c.us_aqi),
      pm25: Math.round(c.pm2_5),
      pm10: Math.round(c.pm10),
      co: Number(c.carbon_monoxide / 1000).toFixed(2),
      no2: Math.round(c.nitrogen_dioxide),
      so2: Math.round(c.sulphur_dioxide),
      o3: Math.round(c.ozone),
      live: true,
    };
  } catch {
    return { ...fallback, live: false };
  }
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick([event.latlng.lat, event.latlng.lng]);
    },
  });
  return null;
}

function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13, { duration: 0.8 });
  }, [map, position]);
  return null;
}

function MapControls({ onCurrentLocation, onSearch, search, setSearch }) {
  return (
    <div className="absolute left-3 top-3 z-[900] flex w-[min(420px,calc(100%-24px))] flex-col gap-2">
      <div className="flex overflow-hidden rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0]/95 shadow-lg backdrop-blur">
        <div className="flex flex-1 items-center px-3">
          <Search size={17} color={THEME.sage} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search Basra area..."
            className="w-full bg-transparent px-2 py-3 text-sm text-[#2F3E4E] outline-none placeholder:text-[#8E7967]"
          />
        </div>
        <button
          onClick={onSearch}
          className="bg-[#7B846D] px-4 text-sm font-semibold text-[#FBF7F0] transition hover:bg-[#55624A]"
        >
          Search
        </button>
        <button
          onClick={onCurrentLocation}
          title="My location"
          className="border-l border-[#D9D0C4] px-3 text-[#55624A] transition hover:bg-[#F1E8DB]"
        >
          <LocateFixed size={18} />
        </button>
      </div>
    </div>
  );
}

function LayerControls({ layers, setLayers }) {
  const items = [
    ["tree", "🌳 Tree planting", THEME.sage],
    ["air", "🌫️ Air quality", THEME.dustyRose],
    ["fire", "🔥 Fire reports", "#B05B4E"],
    ["recycling", "♻️ Recycling", THEME.forest],
    ["green", "🌿 Green areas", THEME.softGreen],
    ["places", "📍 Environmental places", THEME.warmTaupe],
  ];

  return (
    <div className="absolute right-3 top-3 z-[900] w-56 rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0]/95 p-3 shadow-lg backdrop-blur">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8E7967]">
        Map layers
      </p>
      <div className="space-y-1">
        {items.map(([key, label, color]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-xs text-[#2F3E4E] hover:bg-[#F1E8DB]"
          >
            <input
              type="checkbox"
              checked={layers[key]}
              onChange={(e) =>
                setLayers((prev) => ({ ...prev, [key]: e.target.checked }))
              }
              className="accent-[#7B846D]"
            />
            <span style={{ color }}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function MapLegend() {
  const items = [
    ["🌳", "Tree planting priority"],
    ["🔴", "High pollution"],
    ["🟡", "Moderate pollution"],
    ["🟢", "Good environment"],
    ["🔥", "Reported fire"],
    ["♻️", "Recycling / waste"],
  ];
  return (
    <div className="absolute bottom-3 left-3 z-[900] w-64 rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0]/95 p-3 shadow-lg backdrop-blur">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8E7967]">
        Environmental legend
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map(([icon, label]) => (
          <div key={label} className="flex items-center gap-1.5 text-[11px] text-[#2F3E4E]">
            <span>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherCard({ weather, area }) {
  const safety = outdoorSafety(weather, 87);
  return (
    <section className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5 shadow-[0_14px_40px_rgba(47,62,78,.08)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8E7967]">
            Weather & conditions
          </p>
          <h3 className="mt-1 text-xl font-bold text-[#2F3E4E]">
            Basra – {area}
          </h3>
        </div>
        <div className="rounded-full bg-[#F1E8DB] p-2 text-[#7B846D]">
          <Thermometer size={19} />
        </div>
      </div>

      <div className="mb-4 flex items-end gap-2">
        <span className="text-4xl font-bold text-[#2F3E4E]">{weather.temperature}°C</span>
        <span className="pb-1 text-sm text-[#8E7967]">Feels like {weather.feelsLike}°C</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <Metric icon={<Droplets size={15} />} label="Humidity" value={`${weather.humidity}%`} />
        <Metric icon={<Wind size={15} />} label="Wind" value={`${weather.wind} km/h`} />
        <Metric icon={<Sparkles size={15} />} label="Condition" value={weather.condition} />
        <Metric icon={<Eye size={15} />} label="Visibility" value={`${weather.visibility} km`} />
      </div>

      <div className="mt-4 rounded-2xl border border-[#D9D0C4] bg-[#F1E8DB]/70 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#2F3E4E]">Outdoor Safety</span>
          <span className="rounded-full bg-[#DDE7C7] px-2.5 py-1 text-[11px] font-bold text-[#55624A]">
            {safety.label}
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-[#6F6B68]">{safety.message}</p>
      </div>

      <p className="mt-3 text-[10px] text-[#9A8F84]">
        {weather.live ? "Live weather data" : "Demo fallback data"}
      </p>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#F1E8DB]/65 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[#7B846D]">{icon}</div>
      <p className="text-[10px] text-[#8E7967]">{label}</p>
      <p className="mt-0.5 font-semibold text-[#2F3E4E]">{value}</p>
    </div>
  );
}

function AirQualityCard({ air }) {
  const meta = aqiMeta(air.aqi);
  const percentage = Math.min(100, Math.max(3, (air.aqi / 300) * 100));
  const pollutants = [
    ["PM2.5", `${air.pm25} µg/m³`],
    ["PM10", `${air.pm10} µg/m³`],
    ["CO", `${air.co} mg/m³`],
    ["NO₂", `${air.no2} µg/m³`],
    ["SO₂", `${air.so2} µg/m³`],
    ["O₃", `${air.o3} µg/m³`],
  ];

  return (
    <section className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5 shadow-[0_14px_40px_rgba(47,62,78,.08)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8E7967]">
            Air quality analysis
          </p>
          <div className="mt-1 flex items-center gap-2">
            <h3 className="text-xl font-bold text-[#2F3E4E]">AQI: {air.aqi}</h3>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: meta.bg, color: meta.text }}
            >
              {meta.label}
            </span>
          </div>
        </div>
        <div className="rounded-full bg-[#F4E2DF] p-2 text-[#B57A7F]">
          <AirVent size={19} />
        </div>
      </div>

      <div className="mt-4">
        <div className="h-3 overflow-hidden rounded-full bg-[#E7DED3]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
              background:
                air.aqi <= 50
                  ? THEME.sage
                  : air.aqi <= 100
                  ? THEME.warmTaupe
                  : THEME.dustyRose,
            }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-[#9A8F84]">
          <span>Good</span>
          <span>Moderate</span>
          <span>Unhealthy</span>
          <span>Hazardous</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {pollutants.map(([name, value]) => (
          <div key={name} className="rounded-xl bg-[#F1E8DB]/65 p-3">
            <p className="text-[10px] text-[#8E7967]">{name}</p>
            <p className="mt-1 text-sm font-semibold text-[#2F3E4E]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-[#F4E2DF]/55 p-3">
        <p className="text-xs leading-5 text-[#6F6262]">{meta.message}</p>
      </div>

      <p className="mt-3 text-[10px] text-[#9A8F84]">
        {air.live ? "Live air-quality data" : "Demo fallback data"}
      </p>
    </section>
  );
}

function EnvironmentalPanel({ area, data, onPlanting }) {
  return (
    <section className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5 shadow-[0_14px_40px_rgba(47,62,78,.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8E7967]">
            Selected area
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#2F3E4E]">{area}</h2>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#AAB29E] text-lg font-bold text-[#55624A]">
          {data.score}
        </div>
      </div>

      <p className="mt-1 text-xs text-[#8E7967]">Environmental Score / 100</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Air Quality" value={aqiMeta(data.aqi).label} />
        <Stat label="AQI" value={data.aqi} />
        <Stat label="PM2.5" value={`${data.pm25} µg/m³`} />
        <Stat label="PM10" value={`${data.pm10} µg/m³`} />
        <Stat label="Green Coverage" value={`${data.greenCoverage}%`} />
        <Stat label="Waste Risk" value={data.wasteRisk} />
      </div>

      <div className="mt-4 rounded-2xl border border-[#C8D1BE] bg-[#DDE7C7]/45 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#55624A]">Tree Planting Priority</span>
          <span className="rounded-full bg-[#7B846D] px-2.5 py-1 text-[10px] font-bold text-[#FBF7F0]">
            {data.treePriority}
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-[#6D7464]">{data.reason}</p>
      </div>

      <div className="mt-4 flex gap-2 rounded-2xl bg-[#F1E8DB]/70 p-4">
        <Sparkles size={17} className="mt-0.5 shrink-0 text-[#B57A7F]" />
        <p className="text-xs leading-5 text-[#6F6B68]">{data.explanation}</p>
      </div>

      <button
        onClick={onPlanting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#7B846D] px-4 py-3 text-sm font-bold text-[#FBF7F0] shadow-md transition hover:-translate-y-0.5 hover:bg-[#55624A]"
      >
        <TreePine size={17} />
        Join Planting Campaign
      </button>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E2DAD0] bg-[#F1E8DB]/45 p-3">
      <p className="text-[10px] text-[#8E7967]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#2F3E4E]">{value}</p>
    </div>
  );
}

function TreePriorityCard({ zone, onSelect }) {
  return (
    <article className="rounded-[24px] border border-[#D6DDCE] bg-[#FBF7F0] p-4 shadow-[0_12px_30px_rgba(47,62,78,.06)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#DDE7C7] p-2 text-[#55624A]">
            <TreePine size={18} />
          </div>
          <div>
            <h4 className="font-bold text-[#2F3E4E]">{zone.area}</h4>
            <p className="text-[10px] text-[#8E7967]">Priority: {zone.priority}</p>
          </div>
        </div>
        <span className="rounded-full bg-[#DDE7C7] px-2 py-1 text-[10px] font-bold text-[#55624A]">
          {zone.trees} trees
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6F6B68]">
        Low green coverage and elevated pollution levels.
      </p>
      <button
        onClick={onSelect}
        className="mt-3 w-full rounded-full border border-[#7B846D] py-2 text-xs font-bold text-[#55624A] transition hover:bg-[#DDE7C7]"
      >
        View on map
      </button>
    </article>
  );
}

function CampaignSection({ campaigns, onJoin }) {
  return (
    <section className="mt-12">
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D9D0C4] bg-[#F1E8DB] px-4 py-2 text-xs font-semibold tracking-wide text-[#55624A]">
          <Leaf size={15} /> Community action
        </span>
        <h2 className="mt-3 text-3xl font-bold text-[#2F3E4E]">
          🌱 Join EcoDrop Campaigns
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#7D756E]">
          Turn small environmental actions into visible change across Basra.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <article
            key={campaign.id}
            className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5 shadow-[0_14px_40px_rgba(47,62,78,.07)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-[#DDE7C7] p-3 text-[#55624A]">
                <TreePine size={20} />
              </div>
              <span className="rounded-full bg-[#F4E2DF] px-3 py-1 text-xs font-bold text-[#B57A7F]">
                +{campaign.points} Points
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-[#2F3E4E]">{campaign.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#7D756E]">{campaign.description}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#8E7967]">
              <Users size={15} />
              Participants: {campaign.participants.length}
            </div>
            <div className="mt-4 flex -space-x-2">
              {campaign.participants.slice(0, 5).map((name) => (
                <Avatar key={name} name={name} />
              ))}
            </div>
            <button
              onClick={() => onJoin(campaign)}
              className="mt-5 w-full rounded-full bg-[#7B846D] py-3 text-sm font-bold text-[#FBF7F0] transition hover:bg-[#55624A]"
            >
              Join Campaign
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      title={`${name} – demo participant`}
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FBF7F0] bg-[#AAB29E] text-[10px] font-bold text-[#2F3E4E]"
    >
      {initials}
    </div>
  );
}

function JoinCampaignModal({ campaign, onClose, onSubmit }) {
  const [name, setName] = useState("");

  if (!campaign) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName("");
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#2F3E4E]/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-[#DDD4C8] bg-[#FBF7F0] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#DDE7C7] p-3 text-[#55624A]">
              <TreePine size={22} />
            </div>
            <h3 className="text-2xl font-bold text-[#2F3E4E]">Join the Campaign 🌱</h3>
            <p className="mt-2 text-sm leading-6 text-[#7D756E]">
              Enter your name to become part of this environmental initiative.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-[#8E7967] hover:bg-[#F1E8DB]">
            <X size={20} />
          </button>
        </div>

        <p className="mt-4 rounded-2xl bg-[#F1E8DB] p-3 text-xs font-semibold text-[#55624A]">
          {campaign.title} · +{campaign.points} EcoDrop Points
        </p>

        <form onSubmit={submit} className="mt-5">
          <label className="text-xs font-bold text-[#2F3E4E]">Your Name</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-2 w-full rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0] px-4 py-3 text-sm text-[#2F3E4E] outline-none focus:border-[#7B846D]"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#7B846D] py-3 text-sm font-bold text-[#FBF7F0] hover:bg-[#55624A]"
          >
            Join Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

function FireReportSection({ onSubmit, selectedPosition, setReportingMode, reportingMode }) {
  const [form, setForm] = useState({
    location: "",
    area: "Al-Ashar",
    type: "Waste Burning",
    description: "",
    severity: "Medium",
  });
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.location && !selectedPosition) return;

    onSubmit({
      ...form,
      location: form.location || "Selected map location",
      position: selectedPosition || ENVIRONMENTAL_DATA[form.area].position,
    });

    setSuccess(true);
    setForm({
      location: "",
      area: "Al-Ashar",
      type: "Waste Burning",
      description: "",
      severity: "Medium",
    });

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="mt-12 rounded-[30px] border border-[#E0C6C4] bg-[#F4E2DF]/55 p-5 shadow-[0_14px_40px_rgba(47,62,78,.06)] sm:p-7">
      <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <span className="inline-flex rounded-full bg-[#FBF7F0] px-4 py-2 text-xs font-bold text-[#8E4C52]">
            🔥 Environmental safety
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#2F3E4E]">
            Report an Environmental Fire
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#6F6262]">
            Report fires that may contribute to air pollution and environmental damage in Basra.
          </p>

          <div className="mt-6 rounded-2xl border border-[#DDB8B5] bg-[#FBF7F0]/70 p-4">
            <div className="flex gap-3">
              <CircleAlert className="shrink-0 text-[#B05B4E]" size={20} />
              <p className="text-xs leading-5 text-[#6F6262]">
                This prototype stores reports only in frontend React state. No report is sent to a server.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Fire Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Street / landmark"
                className="input"
              />
            </Field>

            <Field label="Area">
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="input"
              >
                {Object.keys(ENVIRONMENTAL_DATA).map((area) => (
                  <option key={area}>{area}</option>
                ))}
              </select>
            </Field>

            <Field label="Fire Type">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="input"
              >
                <option>Waste Burning</option>
                <option>Industrial Fire</option>
                <option>Vegetation Fire</option>
                <option>Scrap Burning</option>
                <option>Unknown</option>
              </select>
            </Field>

            <Field label="Severity">
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="input"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </Field>

            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what you observed..."
                  rows={4}
                  className="input resize-none"
                />
              </Field>
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setReportingMode(!reportingMode)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${
                  reportingMode
                    ? "border-[#B57A7F] bg-[#F4E2DF] text-[#8E4C52]"
                    : "border-[#D9D0C4] text-[#55624A]"
                }`}
              >
                <MapPinned size={15} />
                {reportingMode ? "Click map now..." : "Select location on map"}
              </button>

              <label className="flex cursor-pointer items-center gap-2 rounded-full border border-[#D9D0C4] px-4 py-2 text-xs font-bold text-[#55624A]">
                Optional image
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          {success && (
            <div className="mt-4 rounded-2xl bg-[#DDE7C7] p-3 text-xs font-semibold text-[#55624A]">
              Thank you. Your report has been added to the EcoDrop environmental monitoring system.
            </div>
          )}

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#B05B4E] py-3 text-sm font-bold text-[#FBF7F0] transition hover:bg-[#8E4C52]"
          >
            <Send size={17} />
            Submit Fire Report
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#2F3E4E]">{label}</span>
      {children}
    </label>
  );
}

function BasraMap({
  selected,
  setSelected,
  layers,
  fireReports,
  places,
  onMapClick,
  reportingMode,
}) {
  const selectedData = ENVIRONMENTAL_DATA[selected];

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#D9D0C4] shadow-[0_18px_50px_rgba(47,62,78,.12)]">
      <MapContainer
        center={BASRA_CENTER}
        zoom={11}
        scrollWheelZoom
        className="h-[560px] w-full sm:h-[650px]"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={onMapClick} />
        <FlyToLocation position={selectedData.position} />

        {layers.air &&
          Object.entries(ENVIRONMENTAL_DATA).map(([area, data]) => {
            const meta = aqiMeta(data.aqi);
            const color = data.aqi > 100 ? "#B57A7F" : data.aqi > 50 ? "#A58B66" : "#7B846D";
            return (
              <Circle
                key={`air-${area}`}
                center={data.position}
                radius={850}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.12,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>{area}</strong>
                  <br />
                  AQI {data.aqi} · {meta.label}
                </Popup>
              </Circle>
            );
          })}

        {layers.tree &&
          TREE_ZONES.map((zone) => (
            <Circle
              key={`tree-${zone.area}`}
              center={zone.position}
              radius={650}
              pathOptions={{
                color: THEME.sage,
                fillColor: "#AAB29E",
                fillOpacity: 0.22,
                weight: 2,
              }}
            >
              <Popup>
                <strong>🌳 {zone.area}</strong>
                <br />
                Tree Planting Priority: {zone.priority}
                <br />
                Estimated trees needed: {zone.trees}
              </Popup>
            </Circle>
          ))}

        {layers.green && (
          <Polygon
            positions={[
              [30.523, 47.835],
              [30.532, 47.87],
              [30.505, 47.89],
              [30.493, 47.85],
            ]}
            pathOptions={{
              color: THEME.softGreen,
              fillColor: THEME.softGreen,
              fillOpacity: 0.25,
            }}
          >
            <Popup>🌿 Shatt Al-Arab green corridor – demo ecological zone</Popup>
          </Polygon>
        )}

        {layers.recycling &&
          places
            .filter((place) => ["recycling", "scrap", "waste"].includes(place.category))
            .map((place) => (
              <Marker
                key={place.id}
                position={place.position}
                icon={markerIcon(
                  place.category === "recycling" ? "♻️" : place.category === "waste" ? "🗑️" : "🔄",
                  THEME.forest
                )}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.area}
                  <br />
                  Services: {place.services.join(", ")}
                  <br />
                  {place.hours}
                </Popup>
              </Marker>
            ))}

        {layers.places &&
          places
            .filter((place) => !["recycling", "scrap", "waste"].includes(place.category))
            .map((place) => (
              <Marker
                key={place.id}
                position={place.position}
                icon={markerIcon("🌿", THEME.softGreen)}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.area}
                  <br />
                  {place.services.join(", ")}
                </Popup>
              </Marker>
            ))}

        {layers.fire &&
          fireReports.map((report) => (
            <Marker
              key={report.id}
              position={report.position}
              icon={markerIcon("🔥", "#B05B4E")}
            >
              <Popup>
                <strong>🔥 {report.type}</strong>
                <br />
                Area: {report.area}
                <br />
                Severity: {report.severity}
                <br />
                Status: {report.status}
              </Popup>
            </Marker>
          ))}

        {Object.entries(ENVIRONMENTAL_DATA).map(([area, data]) => (
          <Marker
            key={`area-${area}`}
            position={data.position}
            icon={markerIcon(
              data.treePriority === "HIGH" ? "🌳" : "🌿",
              data.aqi > 100 ? "#B57A7F" : data.aqi > 50 ? "#A58B66" : THEME.sage
            )}
            eventHandlers={{
              click: () => setSelected(area),
            }}
          >
            <Popup>
              <strong>{area}</strong>
              <br />
              Environmental Score: {data.score}/100
              <br />
              AQI: {data.aqi}
              <br />
              Tree Priority: {data.treePriority}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default function MapPage() {
  const [selected, setSelected] = useState("Al-Ashar");
  const [weather, setWeather] = useState(ENVIRONMENTAL_DATA["Al-Ashar"].weatherFallback);
  const [air, setAir] = useState(ENVIRONMENTAL_DATA["Al-Ashar"]);
  const [layers, setLayers] = useState({
    tree: true,
    air: true,
    fire: true,
    recycling: true,
    green: true,
    places: true,
  });
  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [campaignModal, setCampaignModal] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [fireReports, setFireReports] = useState(INITIAL_FIRE_REPORTS);
  const [reportingMode, setReportingMode] = useState(false);
  const [reportPosition, setReportPosition] = useState(null);
  const [places, setPlaces] = useState(MOCK_PLACES);
  const [apiMessage, setApiMessage] = useState("");

  const data = ENVIRONMENTAL_DATA[selected];

  useEffect(() => {
    let cancelled = false;

    async function loadLiveData() {
      setApiMessage("");
      const [liveWeather, liveAir] = await Promise.all([
        getLiveWeather(data.position, data.weatherFallback),
        getLiveAir(data.position, data),
      ]);

      if (cancelled) return;

      setWeather(liveWeather);
      setAir(liveAir);

      if (!liveWeather.live || !liveAir.live) {
        setApiMessage("Live data is currently unavailable for some services. Showing estimated environmental information.");
      }
    }

    loadLiveData();
    return () => {
      cancelled = true;
    };
  }, [selected, data.position, data.weatherFallback]);

  useEffect(() => {
    // Optional live environmental-place lookup.
    // Demo places remain if the public Overpass service is unavailable.
    let cancelled = false;

    async function loadOSMPlaces() {
      try {
        const query = `
          [out:json][timeout:20];
          (
            nwr["amenity"="recycling"](30.35,47.60,30.65,48.10);
            nwr["amenity"="waste_disposal"](30.35,47.60,30.65,48.10);
            nwr["shop"="scrap_yard"](30.35,47.60,30.65,48.10);
            nwr["leisure"="park"](30.35,47.60,30.65,48.10);
          );
          out center tags;
        `;

        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: "data=" + encodeURIComponent(query),
        });

        if (!response.ok) throw new Error("Overpass unavailable");
        const json = await response.json();

        const livePlaces = json.elements
          .map((item) => {
            const lat = item.lat ?? item.center?.lat;
            const lon = item.lon ?? item.center?.lon;
            if (!lat || !lon) return null;

            const tags = item.tags || {};
            let category = "green";
            let iconName = "Green area";

            if (tags.amenity === "recycling") {
              category = "recycling";
              iconName = "Recycling";
            } else if (tags.amenity === "waste_disposal") {
              category = "waste";
              iconName = "Waste collection";
            } else if (tags.shop === "scrap_yard") {
              category = "scrap";
              iconName = "Scrap";
            }

            return {
              id: `osm-${item.type}-${item.id}`,
              name: tags.name || `${iconName} location`,
              category,
              position: [lat, lon],
              area: tags["addr:suburb"] || tags["addr:city"] || "Basra",
              services: tags.description ? [tags.description] : [iconName],
              hours: tags.opening_hours || "Information unavailable",
            };
          })
          .filter(Boolean)
          .slice(0, 80);

        if (!cancelled && livePlaces.length) {
          setPlaces(livePlaces);
        }
      } catch {
        // Keep clearly labeled demo/fallback locations.
      }
    }

    loadOSMPlaces();
    return () => {
      cancelled = true;
    };
  }, []);

  const nearbyPlaces = useMemo(() => {
    return [...places]
      .map((place) => ({
        ...place,
        distance: getDistanceKm(data.position, place.position),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [places, data.position]);

  const selectArea = (area) => {
    if (!ENVIRONMENTAL_DATA[area]) return;
    setSelected(area);
  };

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    const found = Object.keys(ENVIRONMENTAL_DATA).find((area) =>
      area.toLowerCase().includes(query)
    );

    if (found) {
      selectArea(found);
      return;
    }

    const place = places.find((item) => item.name.toLowerCase().includes(query));
    if (place) {
      const nearestArea = Object.entries(ENVIRONMENTAL_DATA).sort(
        ([, a], [, b]) =>
          getDistanceKm(place.position, a.position) -
          getDistanceKm(place.position, b.position)
      )[0]?.[0];

      if (nearestArea) selectArea(nearestArea);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = [position.coords.latitude, position.coords.longitude];
        const nearest = Object.entries(ENVIRONMENTAL_DATA).sort(
          ([, a], [, b]) =>
            getDistanceKm(current, a.position) - getDistanceKm(current, b.position)
        )[0]?.[0];

        if (nearest) selectArea(nearest);
      },
      () => {
        setApiMessage("Location permission was not granted. The map remains centered on Basra.");
      }
    );
  };

  const handleMapClick = (position) => {
    if (reportingMode) {
      setReportPosition(position);
      setReportingMode(false);
      return;
    }

    const nearest = Object.entries(ENVIRONMENTAL_DATA).sort(
      ([, a], [, b]) =>
        getDistanceKm(position, a.position) - getDistanceKm(position, b.position)
    )[0]?.[0];

    if (nearest) selectArea(nearest);
  };

  const handleJoin = (name) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignModal.id &&
        !campaign.participants.some((person) => person.toLowerCase() === name.toLowerCase())
          ? { ...campaign, participants: [...campaign.participants, name] }
          : campaign
      )
    );
    setEcoPoints((points) => points + campaignModal.points);
    setCampaignModal(null);
  };

  const addFireReport = (report) => {
    setFireReports((prev) => [
      ...prev,
      {
        ...report,
        id: `fire-${Date.now()}`,
        status: "Reported",
        date: new Date().toLocaleDateString(),
      },
    ]);
    setReportPosition(null);
  };

  return (
    <main className="min-h-screen bg-[#FBF7F0] text-[#2F3E4E]">
      <style>{`
        .ecodrop-marker { background: transparent !important; border: 0 !important; }
        .input {
          width:100%;
          border:1px solid #D9D0C4;
          background:#FBF7F0;
          border-radius:16px;
          padding:11px 14px;
          color:#2F3E4E;
          outline:none;
        }
        .input:focus { border-color:#7B846D; box-shadow:0 0 0 3px rgba(123,132,109,.12); }
        .leaflet-container { font-family:"Playfair Display",serif; background:#E8E1D7; }
        .leaflet-popup-content-wrapper,.leaflet-popup-tip {
          background:#FBF7F0;
          color:#2F3E4E;
        }
        .leaflet-control-zoom a {
          color:#55624A !important;
          background:#FBF7F0 !important;
          border-color:#D9D0C4 !important;
        }
        @media (max-width: 640px) {
          .leaflet-control-zoom { margin-top: 110px !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mb-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D9D0C4] bg-[#F1E8DB] px-4 py-2 text-xs font-semibold text-[#55624A]">
                <Leaf size={15} /> Sustainable future for Basra
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#2F3E4E] sm:text-5xl">
                Basra Environmental Map
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#7D756E] sm:text-base">
                Explore environmental conditions, tree-planting priorities, recycling locations,
                community campaigns and reported fires across Basra.
              </p>
            </div>

          </div>
        </header>

        {apiMessage && (
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-[#D9D0C4] bg-[#F1E8DB] px-4 py-3 text-xs text-[#6F6B68]">
            <CircleAlert size={16} className="text-[#B57A7F]" />
            {apiMessage}
          </div>
        )}

        <section className="grid gap-5 lg:grid-cols-[1.55fr_.75fr]">
          <div className="min-w-0">
            <div className="relative">
              <MapControls
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
                onCurrentLocation={handleCurrentLocation}
              />
              <LayerControls layers={layers} setLayers={setLayers} />
              <BasraMap
                selected={selected}
                setSelected={selectArea}
                layers={layers}
                fireReports={fireReports}
                places={places}
                onMapClick={handleMapClick}
                reportingMode={reportingMode}
              />
              <MapLegend />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0] p-4">
                <p className="text-xs text-[#8E7967]">Selected</p>
                <p className="mt-1 font-bold text-[#2F3E4E]">{selected}</p>
              </div>
<div className="rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0] p-4">
                <p className="text-xs text-[#8E7967]">Tree priority zones</p>
                <p className="mt-1 font-bold text-[#55624A]">{TREE_ZONES.length}</p>
              </div>
              <div className="rounded-2xl border border-[#D9D0C4] bg-[#FBF7F0] p-4">
                <p className="text-xs text-[#8E7967]">Fire reports</p>
                <p className="mt-1 font-bold text-[#B05B4E]">{fireReports.length}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <EnvironmentalPanel
              area={selected}
              data={data}
              onPlanting={() =>
                setCampaignModal(
                  campaigns.find((campaign) => campaign.id === 1) || campaigns[0]
                )
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <WeatherCard weather={weather} area={selected} />
              <AirQualityCard air={air} />
            </div>

            <section className="rounded-[26px] border border-[#DDD4C8] bg-[#FBF7F0] p-5 shadow-[0_14px_40px_rgba(47,62,78,.08)]">
              <div className="flex items-center justify-between">
                <div>
<p className="text-xs uppercase tracking-[0.18em] text-[#8E7967]">
                    Nearby
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#2F3E4E]">
                    Environmental places
                  </h3>
                </div>
                <Navigation size={18} className="text-[#7B846D]" />
              </div>

              <div className="mt-4 space-y-2">
                {nearbyPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="rounded-2xl bg-[#F1E8DB]/60 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-[#2F3E4E]">{place.name}</p>
                        <p className="mt-1 text-[10px] text-[#8E7967]">
                          {place.area} · {place.category}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-[10px] font-bold text-[#55624A]">
                        {place.distance.toFixed(1)} km
                      </span>
                    </div>
                  </div>
                ))}
              </div>
<p className="mt-3 text-[10px] leading-4 text-[#9A8F84]">
                Real OpenStreetMap data is used when available; otherwise the interface keeps demo locations.
              </p>
            </section>
          </aside>
        </section>

        <section className="mt-12">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DDE7C7] px-4 py-2 text-xs font-bold text-[#55624A]">
              <TreePine size={15} /> Greening Basra
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#2F3E4E]">
              🌳 Tree Planting Priority Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TREE_ZONES.map((zone) => (
              <TreePriorityCard
                key={zone.area}
                zone={zone}
                onSelect={() => selectArea(zone.area)}
              />
            ))}
          </div>
        </section>

        <CampaignSection
          campaigns={campaigns}
          onJoin={(campaign) => setCampaignModal(campaign)}
        />

        <FireReportSection
          onSubmit={addFireReport}
          selectedPosition={reportPosition}
          setReportingMode={setReportingMode}
          reportingMode={reportingMode}
        />
<section className="mt-12 rounded-[30px] border border-[#D9D0C4] bg-[#F1E8DB]/70 p-6 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <ShieldCheck size={28} className="text-[#7B846D]" />
            <h2 className="mt-3 text-2xl font-bold text-[#2F3E4E]">
              EcoDrop – Basra Environmental Intelligence
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#7D756E]">
              Live weather and air-quality data can be combined with community reports and
              environmental demo data to create a future-ready environmental guide for Basra.
            </p>
          </div>
        </section>
      </div>

      <JoinCampaignModal
        campaign={campaignModal}
        onClose={() => setCampaignModal(null)}
        onSubmit={handleJoin}
      />
    </main>
  );
}