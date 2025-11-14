import type { ProviderProfile } from "@/types/guidew";
import { memo, useMemo } from "react";
import clsx from "clsx";

interface ProviderMapProps {
  providers: ProviderProfile[];
  selectedProviderId?: string;
  onSelect?: (providerId: string) => void;
}

const latBounds = { min: -47, max: -34 };
const lngBounds = { min: 166, max: 179 };

const project = (lat: number, lng: number) => {
  const x = ((lng - lngBounds.min) / (lngBounds.max - lngBounds.min)) * 100;
  const y = ((latBounds.max - lat) / (latBounds.max - latBounds.min)) * 100;
  return { x, y };
};

const ProviderMap = ({ providers, selectedProviderId, onSelect }: ProviderMapProps) => {
  const projectedProviders = useMemo(
    () =>
      providers.map(provider => ({
        provider,
        position: project(provider.location.lat, provider.location.lng)
      })),
    [providers]
  );

  return (
    <div className="relative h-96 rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_40%)]" />
      <div className="absolute inset-0">
        {projectedProviders.map(({ provider, position }) => (
          <button
            key={provider.id}
            className={clsx(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold shadow-lg transition",
              selectedProviderId === provider.id
                ? "bg-brand-teal text-white scale-110"
                : "bg-white/90 text-gray-900 hover:bg-brand-teal/80 hover:text-white"
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={() => onSelect?.(provider.id)}
          >
            {provider.location.city}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-gray-700">
        <p className="font-semibold">Live provider availability</p>
        <p>Tap a badge to inspect credentials, tags, and availability.</p>
      </div>
    </div>
  );
};

export default memo(ProviderMap);

