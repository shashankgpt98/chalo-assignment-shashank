
import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { TransitRoute } from '../type';  // Assuming types are defined elsewhere
import { addArrowsToRoute, addCrossIconsToRoute, addSignsToRoute } from './helper';

interface MapViewProps {
  routes: TransitRoute[];
}

const MapView: React.FC<MapViewProps> = ({ routes }) => {
  const mapElement = useRef<HTMLDivElement | null>(null);

function getRandomColor() {
    let randomColor = Math.floor(Math.random() * 0x888888).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}


  
  useEffect(() => {
    const map = tt.map({
      key: 'Lylux5YQKHcAq5WHyE4YAVAuha70uFXS',
      container: mapElement.current!,
      center: [78.9629, 22.5937], 
      zoom: 4,
    });

    // Wait for the map to fully load before adding any layers
    map.on('load', () => {
      routes.forEach(route => {
        const coordinates = route.stops.map(stop => [stop.longitude, stop.latitude]);

        // console.log("coordinates",coordinates);
        
        const geoJson:any = {
          type: 'Feature' as const,
          geometry: {
            type: 'LineString',
            coordinates,
          },
          properties: {},
        };

        // Add the route layer after the map has loaded
        const color = getRandomColor();
        map.addLayer({
          id: route.routeId,
          type: 'line',
          source: {
            type: 'geojson',
            data: geoJson,
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': color,
            'line-width': 3,
            'line-dasharray':[2,2]
          },
        });
        // addArrowsToRoute(coordinates,map, route.direction)
        addSignsToRoute(coordinates, map, color,route.status)
        
        if (route.status === 'Inactive') {
            addCrossIconsToRoute(route.stops, map);
          }
      });
    });

    return () => map.remove(); // Cleanup on component unmount
  }, [routes]);

  return <div ref={mapElement} style={{ height: '800px', width: '100%' }} />;
};

export default MapView;
