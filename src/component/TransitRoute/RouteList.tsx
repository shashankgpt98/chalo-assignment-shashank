
import React from 'react';
import { TransitRoute } from '../type';
import {
  RouteContainer,
  RouteTitle,
  RouteItem,
  RouteHeader,
  RouteDetails,
  RouteStopList,
  RouteStopItem,
  UpdateRouteButton,
  DeleteRouteButton
} from './Route.style';

interface RouteListProps {
  routes: TransitRoute[];
  onDelete: (routeId: string) => void;
  onUpdate: (routeId: string) => void;
}

const RouteList: React.FC<RouteListProps> = ({ routes, onDelete, onUpdate }) => {
  return (
    <RouteContainer>
      <RouteTitle>Added Routes</RouteTitle>
      {routes.length > 0 ? (
        <>
          {routes.map((route, index) => (
            <RouteItem key={index}>
              <RouteHeader>{route.name}</RouteHeader>
              <RouteDetails>
                Route ID: {route.routeId} | Direction: {route.direction} | Status: {route.status}
              </RouteDetails>
              <RouteDetails>Stops:</RouteDetails>
              <RouteStopList>
                {route.stops.map((stop, stopIndex) => (
                  <RouteStopItem key={stopIndex}>
                    {stop.stopName} (Lat: {stop.latitude}, Lng: {stop.longitude})
                  </RouteStopItem>
                ))}
              </RouteStopList>
              <UpdateRouteButton onClick={() => onUpdate(route.routeId)}>Update</UpdateRouteButton>
              <DeleteRouteButton onClick={() => onDelete(route.routeId)}>Delete</DeleteRouteButton>
            </RouteItem>
          ))}
        </>
      ) : (
        <p>No routes added yet.</p>
      )}
    </RouteContainer>
  );
};

export default RouteList;
