import type { Coordinates, TravelWindow } from "@/types/guidew";

const EARTH_RADIUS_KM = 6371;

const toRadians = (value: number) => (value * Math.PI) / 180;

export const haversineDistanceKm = (a: Coordinates, b: Coordinates) => {
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return EARTH_RADIUS_KM * c;
};

export const estimateTravelWindow = (
  origin: Coordinates,
  destination: Coordinates,
  startTimeIso: string,
  bufferMinutes = 10,
  assumedSpeedKmh = 35
): TravelWindow => {
  const distanceKm = haversineDistanceKm(origin, destination);
  const travelMinutes = (distanceKm / assumedSpeedKmh) * 60 + bufferMinutes;
  const start = new Date(startTimeIso).getTime();
  const now = Date.now();

  const minutesUntilStart = (start - now) / (1000 * 60);

  return {
    estimatedTravelMinutes: Math.round(travelMinutes),
    canArriveOnTime: minutesUntilStart >= travelMinutes
  };
};

export const formatDistance = (km: number) => {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
};

