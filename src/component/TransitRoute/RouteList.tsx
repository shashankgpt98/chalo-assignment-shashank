
import React from 'react';
import { styled } from 'styled-components';
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


// const Container = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h3`
//   text-align: center;
//   color: #333;
// `;

// const RouteItem = styled.div`
//   margin-bottom: 15px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   background-color: #fff;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// const RouteHeader = styled.h4`
//   color: #007bff;
// `;

// const RouteDetails = styled.p`
//   font-size: 14px;
//   color: #666;
// `;

// const StopsList = styled.ul`
//   margin: 5px 0 0 20px;
// `;

// const StopItem = styled.li`
//   font-size: 14px;
//   color: #555;
// `;

// const Button = styled.button`
//   padding: 8px 12px;
//   margin-right: 10px; /* Space between buttons */
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-weight: bold;
//   transition: background-color 0.3s, color 0.3s;

//   &:hover {
//     filter: brightness(0.9);
//   }
// `;

// const UpdateButton = styled(Button)`
//   background-color: #4caf50; /* Green */
//   color: white;
//   margin-top: 10px; /* Top margin */

//   &:hover {
//     background-color: #45a049; /* Darker green */
//   }
// `;

// const DeleteButton = styled(Button)`
//   background-color: #f44336; /* Red */
//   color: white;
//   margin-top: 10px; /* Top margin */

//   &:hover {
//     background-color: #e53935; /* Darker red */
//   }
// `;

const RouteList: React.FC<RouteListProps> = ({ routes,onDelete, onUpdate  }) => {
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
