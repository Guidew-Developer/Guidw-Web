import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type City = {
  name: string;
  lat: number;
  lon: number;
  color?: string;
};

type HubCity = City & {
  satellites: City[];
};

const NEW_ZEALAND_HUB: City = {
  name: "Auckland",
  lat: -36.8485,
  lon: 174.7633,
  color: "#ffb46e"
};

const HUB_NETWORK: HubCity[] = [
  {
    name: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    color: "#4be1d0",
    satellites: [
      { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
      { name: "Brisbane", lat: -27.4698, lon: 153.0251 },
      { name: "Perth", lat: -31.9505, lon: 115.8605 }
    ]
  },
  {
    name: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
    color: "#ffd56f",
    satellites: [
      { name: "Kuala Lumpur", lat: 3.139, lon: 101.6869 },
      { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
      { name: "Bangkok", lat: 13.7563, lon: 100.5018 }
    ]
  },
  {
    name: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    color: "#ff8f7a",
    satellites: [
      { name: "Osaka", lat: 34.6937, lon: 135.5023 },
      { name: "Sapporo", lat: 43.0618, lon: 141.3545 },
      { name: "Fukuoka", lat: 33.5902, lon: 130.4017 }
    ]
  },
  {
    name: "Seoul",
    lat: 37.5665,
    lon: 126.978,
    color: "#c792ff",
    satellites: [
      { name: "Busan", lat: 35.1796, lon: 129.0756 },
      { name: "Daegu", lat: 35.8714, lon: 128.6014 },
      { name: "Jeju", lat: 33.4996, lon: 126.5312 }
    ]
  },
  {
    name: "Dubai",
    lat: 25.2048,
    lon: 55.2708,
    color: "#ffb26f",
    satellites: [
      { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
      { name: "Doha", lat: 25.2854, lon: 51.531 },
      { name: "Muscat", lat: 23.588, lon: 58.3829 }
    ]
  },
  {
    name: "London",
    lat: 51.5072,
    lon: -0.1276,
    color: "#63d0ff",
    satellites: [
      { name: "Paris", lat: 48.8566, lon: 2.3522 },
      { name: "Berlin", lat: 52.52, lon: 13.405 },
      { name: "Madrid", lat: 40.4168, lon: -3.7038 }
    ]
  },
  {
    name: "San Francisco",
    lat: 37.7749,
    lon: -122.4194,
    color: "#52f4ff",
    satellites: [
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { name: "Seattle", lat: 47.6062, lon: -122.3321 },
      { name: "Vancouver", lat: 49.2827, lon: -123.1207 }
    ]
  },
  {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
    color: "#ff9f8a",
    satellites: [
      { name: "Chicago", lat: 41.8781, lon: -87.6298 },
      { name: "Miami", lat: 25.7617, lon: -80.1918 },
      { name: "Toronto", lat: 43.6532, lon: -79.3832 }
    ]
  },
  {
    name: "São Paulo",
    lat: -23.5505,
    lon: -46.6333,
    color: "#5bf0b7",
    satellites: [
      { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
      { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
      { name: "Lima", lat: -12.0464, lon: -77.0428 }
    ]
  }
];

const DEG2RAD = Math.PI / 180;
const TOTAL_CITY_COUNT = 1 + HUB_NETWORK.length + HUB_NETWORK.reduce((sum, hub) => sum + hub.satellites.length, 0);
const MARKER_OFFSETS: Record<"origin" | "hub" | "satellite", number> = {
  origin: 0.08,
  hub: 0.055,
  satellite: 0.04
};
const ROUTE_CONTROL_OFFSET = 0.08;
const ROUTE_LIFT_FACTOR = 0.36;

const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lon + 180) * DEG2RAD;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

type FlightRoute = {
  curve: THREE.CatmullRomCurve3;
  points: THREE.Vector3[];
  geometry: THREE.BufferGeometry;
  line: THREE.Line;
  totalPoints: number;
  speed: number;
  progress: number;
  state: "idle" | "waiting" | "animating" | "completed";
  from: City;
  to: City;
};

type Pulse = {
  mesh: THREE.Mesh;
  phase: number;
  speed: number;
  maxScale: number;
  baseOpacity: number;
  material: THREE.MeshBasicMaterial;
  highlight: number;
};

type MarkerRecord = {
  marker: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  pulse: Pulse;
  baseColor: THREE.Color;
  highlight: number;
  variant: "origin" | "hub" | "satellite";
  offset: number;
};

const GlobalExpansionGlobe = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const initialWidth = container.clientWidth || container.parentElement?.clientWidth || 1;
    const initialHeight = container.clientHeight || container.parentElement?.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, initialWidth / initialHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const group = new THREE.Group();
    group.scale.setScalar(0.92);
    scene.add(group);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];
    const markers = new Map<string, MarkerRecord>();
    const pulses: Pulse[] = [];
    const routes: FlightRoute[] = [];
    const routeQueue: FlightRoute[] = [];
    const activatedCities = new Set<string>();
    const tempColor = new THREE.Color();
    const whiteColor = new THREE.Color("#ffffff");
    const baselineLineOpacity = 0.12;
    const activeLineOpacity = 0.85;
    const completedLineOpacity = 0.45;
    let activeRoute: FlightRoute | null = null;
    let waitTimer = 0;
    let cycleTimer = 0;
    const routeActivationDelay = 0.45;
    const cyclePauseDuration = 4.5;

    const triggerMarkerHighlight = (cityName: string, amount = 1) => {
      const record = markers.get(cityName);
      if (!record) return;
      record.highlight = Math.min(1.2, record.highlight + amount);
      record.pulse.highlight = Math.min(1.2, record.pulse.highlight + amount);
    };

    const scheduleRoutesFromCity = (cityName: string) => {
      routes.forEach(route => {
        if (route.from.name === cityName && route.state === "idle") {
          route.state = "waiting";
          routeQueue.push(route);
        }
      });
    };

    const resetRoutes = () => {
      routes.forEach(route => {
        route.state = "idle";
        route.progress = 0;
        route.geometry.setDrawRange(0, 0);
        const lineMaterial = route.line.material as THREE.LineBasicMaterial;
        lineMaterial.opacity = baselineLineOpacity;
      });
      routeQueue.length = 0;
      activatedCities.clear();
      activatedCities.add(NEW_ZEALAND_HUB.name);
      waitTimer = 0;
      cycleTimer = 0;
      activeRoute = null;
      markers.forEach((record, name) => {
        const highlightValue = name === NEW_ZEALAND_HUB.name ? 0.6 : 0;
        record.highlight = highlightValue;
        record.pulse.highlight = highlightValue;
      });
      scheduleRoutesFromCity(NEW_ZEALAND_HUB.name);
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const globeRadius = 5;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    geometries.push(globeGeometry);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0.15,
      roughness: 0.85,
      emissive: new THREE.Color("#041128"),
      emissiveIntensity: 0.15
    });
    materials.push(globeMaterial);
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    group.add(globe);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/textures/earth-day.jpg",
      texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
        globeMaterial.map = texture;
        globeMaterial.needsUpdate = true;
        textures.push(texture);
      },
      undefined,
      error => {
        console.error("Failed to load Earth texture", error);
      }
    );

    const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 800;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 160;
      }
      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: new THREE.Color("#ffffff"),
        size: 0.7,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.25
      });
      geometries.push(starGeometry);
      materials.push(starMaterial);
      return new THREE.Points(starGeometry, starMaterial);
    };

    const stars = createStars();
    scene.add(stars);

    const originMarkerGeometry = new THREE.SphereGeometry(0.18, 28, 28);
    const hubMarkerGeometry = new THREE.SphereGeometry(0.14, 22, 22);
    const cityMarkerGeometry = new THREE.SphereGeometry(0.1, 18, 18);
    const ringGeometry = new THREE.RingGeometry(0.2, 0.28, 48);
    geometries.push(originMarkerGeometry, hubMarkerGeometry, cityMarkerGeometry, ringGeometry);

    const addCityMarker = (city: City, variant: "origin" | "hub" | "satellite", accentColor?: string) => {
      const color = new THREE.Color(accentColor ?? city.color ?? (variant === "origin" ? "#ffb46e" : variant === "hub" ? "#7bf1ff" : "#ffeab6"));
      const markerMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: variant === "origin" ? 1 : 0.88
      });
      materials.push(markerMaterial);
      const geometry = variant === "origin" ? originMarkerGeometry : variant === "hub" ? hubMarkerGeometry : cityMarkerGeometry;
      const marker = new THREE.Mesh(geometry, markerMaterial);
      const offset = MARKER_OFFSETS[variant];
      const radialDistance = globeRadius + offset;
      const position = latLonToVector3(city.lat, city.lon, radialDistance);
      marker.position.copy(position);
      group.add(marker);

      const pulseMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: variant === "origin" ? 0.5 : 0.32,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      materials.push(pulseMaterial);
      const pulseMesh = new THREE.Mesh(ringGeometry, pulseMaterial);
      pulseMesh.position.copy(position.clone().multiplyScalar(1.002));
      pulseMesh.lookAt(position.clone().multiplyScalar(2));
      group.add(pulseMesh);
      const pulseData: Pulse = {
        mesh: pulseMesh,
        phase: Math.random(),
        speed: 0.4 + Math.random() * 0.2,
        maxScale: variant === "origin" ? 1.6 : 1.25,
        baseOpacity: variant === "origin" ? 0.5 : 0.32,
        material: pulseMaterial,
        highlight: variant === "origin" ? 0.6 : 0
      };
      pulses.push(pulseData);
      markers.set(city.name, {
        marker: marker as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>,
        pulse: pulseData,
        baseColor: color.clone(),
        highlight: variant === "origin" ? 0.5 : 0,
        variant,
        offset
      });
    };

    const createRoute = (from: City, to: City, colorHex: string) => {
      const fromRecord = markers.get(from.name);
      const toRecord = markers.get(to.name);
      if (!fromRecord || !toRecord) return;
      const start = fromRecord.marker.position.clone();
      const end = toRecord.marker.position.clone();
      const startRadius = start.length();
      const endRadius = end.length();
      const controlStart = start.clone().normalize().multiplyScalar(startRadius + ROUTE_CONTROL_OFFSET);
      const controlEnd = end.clone().normalize().multiplyScalar(endRadius + ROUTE_CONTROL_OFFSET);
      const avgRadius = (startRadius + endRadius) / 2;
      const elevatedMid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(avgRadius + globeRadius * ROUTE_LIFT_FACTOR);
      const curve = new THREE.CatmullRomCurve3([start, controlStart, elevatedMid, controlEnd, end]);
      const routePoints = curve.getPoints(240);
      const geometry = new THREE.BufferGeometry().setFromPoints(routePoints);
      geometry.setDrawRange(0, 0);
      geometries.push(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending
      });
      materials.push(lineMaterial);
      const line = new THREE.Line(geometry, lineMaterial);
      group.add(line);

      routes.push({
        curve,
        points: routePoints,
        geometry,
        line,
        totalPoints: routePoints.length,
        speed: 0.22 + Math.random() * 0.08,
        progress: 0,
        state: "idle",
        from,
        to
      });
    };

    addCityMarker(NEW_ZEALAND_HUB, "origin", NEW_ZEALAND_HUB.color);
    HUB_NETWORK.forEach(hub => {
      addCityMarker(hub, "hub", hub.color);
      createRoute(NEW_ZEALAND_HUB, hub, hub.color ?? "#3ddbd9");
      hub.satellites.forEach(city => {
        addCityMarker(city, "satellite", hub.color);
        createRoute(hub, city, hub.color ?? "#3ddbd9");
      });
    });
    activatedCities.add(NEW_ZEALAND_HUB.name);
    scheduleRoutesFromCity(NEW_ZEALAND_HUB.name);
    triggerMarkerHighlight(NEW_ZEALAND_HUB.name, 0.4);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mediaQuery.matches;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    const resizeRenderer = (width: number, height: number) => {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let resizeObserver: ResizeObserver | null = null;
    let windowResizeHandler: (() => void) | null = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === container) {
            const { width, height } = entry.contentRect;
            resizeRenderer(width, height);
          }
        }
      });
      resizeObserver.observe(container);
    } else {
      windowResizeHandler = () => {
        const width = container.clientWidth || 1;
        const height = container.clientHeight || 1;
        resizeRenderer(width, height);
      };
      window.addEventListener("resize", windowResizeHandler);
    }

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      const motionFactor = reduceMotion ? 0.3 : 1;

      group.rotation.y += delta * (reduceMotion ? 0.15 : 0.35);
      group.rotation.x = Math.sin(elapsed * 0.15) * 0.08;
      stars.rotation.y += delta * 0.02;

      if (activeRoute) {
        activeRoute.progress = Math.min(1, activeRoute.progress + activeRoute.speed * delta * motionFactor);
        const visibleCount = Math.max(2, Math.floor(activeRoute.progress * activeRoute.totalPoints));
        activeRoute.geometry.setDrawRange(0, visibleCount);
        if (activeRoute.progress >= 1) {
          const lineMaterial = activeRoute.line.material as THREE.LineBasicMaterial;
          lineMaterial.opacity = completedLineOpacity;
          activeRoute.state = "completed";
          triggerMarkerHighlight(activeRoute.to.name, 0.9);
          activatedCities.add(activeRoute.to.name);
          scheduleRoutesFromCity(activeRoute.to.name);
          activeRoute = null;
          waitTimer = routeActivationDelay;
        }
      } else if (routeQueue.length > 0) {
        if (waitTimer > 0) {
          waitTimer -= delta * motionFactor;
        } else {
          const nextRoute = routeQueue.shift();
          if (nextRoute) {
            const lineMaterial = nextRoute.line.material as THREE.LineBasicMaterial;
            lineMaterial.opacity = activeLineOpacity;
            nextRoute.state = "animating";
            nextRoute.progress = 0;
            nextRoute.geometry.setDrawRange(0, 0);
            activeRoute = nextRoute;
          }
        }
      } else if (activatedCities.size === TOTAL_CITY_COUNT) {
        cycleTimer += delta;
        if (cycleTimer >= cyclePauseDuration) {
          resetRoutes();
        }
      }

      pulses.forEach(pulse => {
        pulse.phase += pulse.speed * delta * motionFactor;
        if (pulse.phase > 1) {
          pulse.phase -= 1;
        }
        const scale = 1 + pulse.phase * (pulse.maxScale - 1);
        pulse.mesh.scale.setScalar(scale);
        const highlightBoost = pulse.highlight * 0.6;
        pulse.material.opacity = (pulse.baseOpacity + highlightBoost) * (1 - pulse.phase);
        pulse.highlight = Math.max(0, pulse.highlight - delta * 0.65);
      });

      markers.forEach(record => {
        if (record.highlight > 0) {
          record.highlight = Math.max(0, record.highlight - delta * 0.4);
        }
        tempColor.copy(record.baseColor);
        if (record.highlight > 0) {
          tempColor.lerp(whiteColor, Math.min(1, record.highlight * 0.8));
        }
        record.marker.material.color.copy(tempColor);
        const baseOpacity = record.variant === "origin" ? 1 : 0.85;
        record.marker.material.opacity = Math.min(1, baseOpacity + record.highlight * 0.3);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (windowResizeHandler) {
        window.removeEventListener("resize", windowResizeHandler);
      }
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-end pr-6 sm:pr-12">
        <div ref={mountRef} className="relative h-[66%] w-[66%]" />
      </div>
    </div>
  );
};

export default GlobalExpansionGlobe;
