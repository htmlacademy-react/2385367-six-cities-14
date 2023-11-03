import { useEffect, useRef } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offers } from '../../types/offer';
import { UrlMarker } from '../../const';
import 'leaflet/dist/leaflet.css';


type MapProps = {
  city: City;
  points: Offers;
  selectedPoint: number | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DefaultMarker,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CurrentMarker,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({city, points, selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      ref={ mapRef }
      className="cities__map map"
    />
  );
}

export default Map;
