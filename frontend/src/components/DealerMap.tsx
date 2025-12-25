import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, CheckCircle, XCircle, Navigation } from 'lucide-react';
import { Dealer } from '@/store/scanStore';
import { Button } from '@/components/ui/button';
import { loadGoogleMaps } from '@/lib/googleMaps';

interface DealerMapProps {
  dealers: Dealer[];
}

const DealerMap = ({ dealers }: DealerMapProps) => {
  const [enriched, setEnriched] = useState<Array<Dealer & { verified?: boolean; phone?: string; computedDistanceKm?: number }>>(dealers);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? 'AIzaSyAZ9wXQZneu30fokTiuF4faAbcX4Q4HCqs';

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const google = await loadGoogleMaps(API_KEY);

        // Acquire user location (fallback to first dealer if unavailable)
        const userPos: { lat: number; lng: number } | null = await new Promise((res) => {
          if (!navigator.geolocation) return res(null);
          navigator.geolocation.getCurrentPosition(
            (p) => res({ lat: p.coords.latitude, lng: p.coords.longitude }),
            () => res(null),
            { timeout: 5000 }
          );
        });

        const center = userPos ?? (dealers[0] ? { lat: dealers[0].lat, lng: dealers[0].lng } : { lat: 0, lng: 0 });

        // create visible map in the UI
        const mapEl = mapRef.current;
        if (!mapEl) return;

        const map = new google.maps.Map(mapEl, {
          center,
          zoom: 12,
          disableDefaultUI: true,
        });

        const service = new google.maps.places.PlacesService(map);

        const toPromise = (fn: (cb: (res: any, status: any) => void) => void) =>
          new Promise<any>((resolve) => fn((res: any, status: any) => resolve({ res, status })));

        const updated = await Promise.all(
          dealers.map(async (d) => {
            try {
              const nearbyReq = {
                location: new google.maps.LatLng(d.lat, d.lng),
                radius: 150,
                keyword: d.name,
              } as any;

              const { res: nearbyRes, status: nearbyStatus } = await toPromise((cb) => service.nearbySearch(nearbyReq, cb));

              let verified = false;
              let phone: string | undefined = undefined;

              if (nearbyStatus === google.maps.places.PlacesServiceStatus.OK && nearbyRes && nearbyRes.length > 0) {
                verified = true;
                const placeId = nearbyRes[0].place_id;
                const { res: detailsRes, status: detailsStatus } = await toPromise((cb) => service.getDetails({ placeId }, cb));
                if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && detailsRes) {
                  phone = detailsRes.formatted_phone_number ?? undefined;
                }
              }

              const userLatLng = new google.maps.LatLng(center.lat, center.lng);
              const dealerLatLng = new google.maps.LatLng(d.lat, d.lng);
              const meters = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, dealerLatLng);

              return { ...d, verified, phone, computedDistanceKm: Math.round((meters / 1000) * 10) / 10 };
            } catch (e) {
              return { ...d };
            }
          })
        );
        if (mounted) setEnriched(updated);

        // add markers to the visible map
        const markers: any[] = [];
        const infoWindow = new google.maps.InfoWindow();
        const bounds = new google.maps.LatLngBounds();

        // user marker
        if (center) {
          const userMarker = new google.maps.Marker({
            position: center,
            map,
            title: 'You',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#3B82F6',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#0ea5e9'
            }
          });
          markers.push(userMarker);
          bounds.extend(center);
        }

        updated.forEach((d) => {
          try {
            const marker = new google.maps.Marker({
              position: { lat: d.lat, lng: d.lng },
              map,
              title: d.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: d.hasStock ? 10 : 7,
                fillColor: d.verified ? '#10B981' : '#9CA3AF',
                fillOpacity: 1,
                strokeWeight: 0,
              },
            });

            marker.addListener('click', () => {
              const phoneHtml = d.phone ? `<div><a href=\"tel:${d.phone}\">${d.phone}</a></div>` : '';
              const html = `<div style=\"min-width:160px;color:#111\"><strong>${d.name}</strong><div>${d.address}</div>${phoneHtml}</div>`;
              infoWindow.setContent(html);
              infoWindow.open(map, marker);
            });

            markers.push(marker);
            bounds.extend(new google.maps.LatLng(d.lat, d.lng));
          } catch (e) {}
        });

        if (updated.length > 0) map.fitBounds(bounds);

        // cleanup on unmount
        const cleanup = () => {
          markers.forEach((m) => { try { m.setMap(null); } catch {} });
        };

        // ensure cleanup when component unmounts or dealers change
        (map as any).__cleanup = cleanup;
      } catch (err) {
        console.error('Google Maps load/verify failed', err);
      }
    })();

    return () => { mounted = false; };
  }, [dealers]);

  return (
    <div className="space-y-4">
      <h3 className="font-orbitron text-lg font-semibold text-foreground flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Verified Nearby Dealers
      </h3>
      
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Map container */}
        <div className="glass-card rounded-2xl overflow-hidden h-64 lg:h-auto relative">
          {/* Simulated dark map background */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%, hsl(142 71% 45% / 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 60%, hsl(142 71% 45% / 0.05) 0%, transparent 50%),
                linear-gradient(180deg, hsl(240 6% 8%) 0%, hsl(240 6% 12%) 100%)
              `
            }}
          />
          
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Visible Google Map */}
          <div ref={mapRef} className="absolute inset-0" />
          
          {/* Map overlay info */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="glass-card px-3 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Navigation className="w-3 h-3 text-blue-500" />
                <span>Your location • {enriched.length} dealers nearby</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dealer list */}
        <div className="space-y-3">
          {enriched.map((dealer, index) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`
                glass-card p-4 transition-all
                ${dealer.hasStock 
                  ? 'hover:border-primary/30' 
                  : 'opacity-60'
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{dealer.name}</h4>
                    {dealer.hasStock ? (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <CheckCircle className="w-3 h-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{dealer.address}</p>
                  <span className="text-xs text-primary font-medium">{dealer.computedDistanceKm ? `${dealer.computedDistanceKm} km` : dealer.distance}</span>
                </div>
                
                <Button 
                  variant="glass" 
                  size="sm"
                  disabled={!dealer.hasStock && !dealer.phone}
                  onClick={() => {
                    if (dealer.phone) window.open(`tel:${dealer.phone}`);
                  }}
                >
                  <Phone className="w-4 h-4" />
                  {dealer.phone ? dealer.phone : 'Contact'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealerMap;
