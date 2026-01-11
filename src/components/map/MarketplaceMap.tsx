'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MarketplaceMap({ listings }: { listings: any[] }) {
  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden border-4 border-border shadow-2xl relative z-0">
      <MapContainer center={[45.523062, -122.676482]} zoom={7} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.filter(l => l.location_lat && l.location_lng).map((l) => (
          <Marker key={l.id} position={[l.location_lat, l.location_lng]}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold uppercase italic font-space-grotesk">{l.title}</h3>
                <p className="text-primary font-black">${l.price}</p>
                <a href={`/listing/${l.id}`} className="text-xs font-bold underline mt-2 block">View Details</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
