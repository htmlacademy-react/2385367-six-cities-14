import { useEffect, useRef } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/use-map';
import { Offers, Offer } from '../../types/offer';
import { UrlMarker } from '../../const';

import './map.css';

type MapProps = {
  city: Offers['city'];
  points: Offers[];
  selectedPoint?: string | null;
  offer?: Offer;
}

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DefaultMarker,
  iconSize: [27, 39],
  iconAnchor: [-13, -39]
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CurrentMarker,
  iconSize: [27, 39],
  iconAnchor: [-13, -39]
});

function Map({ city, points, selectedPoint, offer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker([
          point.location.latitude,
          point.location.longitude
        ]);
        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint
            || offer && offer.id === point.id
              ? currentCustomIcon : defaultCustomIcon
          )
          .setOpacity(0.75)
          .addTo(markerLayer);
      });

      map.flyTo(
        [
          city.location.latitude,
          city.location.longitude,
        ],
        city.location.zoom
      );

      if (offer) {
        map.doubleClickZoom.disable();
        map.dragging.disable();
        map.scrollWheelZoom.disable();
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, city, selectedPoint, offer]);

  return (
    <div
      ref={ mapRef }
      className="cities__ map map"
    />
  );
}

export default Map;
