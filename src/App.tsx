import React, { useState, useRef, useEffect } from "react";
import RouteForm from "./component/TransitRoute/RouteFrom";
import { TransitRoute } from "./component/type";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import RouteList from "./component/TransitRoute/RouteList";
import {
  createRouteInLocalStorage,
  exportRoutesAsCSV,
  getRoutesFromLocalStorage,
} from "./component/utils";
import { styled } from "styled-components";
import MapView from "./component/MapView/MapView";

const ExportButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 20px 10px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const FileInput = styled.input`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const BottomMargin = styled.div`
  margin-bottom: 16px;
`;

const App: React.FC = () => {
  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<TransitRoute | undefined>(
    undefined
  );

  const formRef = useRef<HTMLDivElement>(null);
  const STORAGE_KEY = "transitRoutes";

  useEffect(() => {
    const storedRoutes = getRoutesFromLocalStorage(STORAGE_KEY);

    if (storedRoutes.length > 0) {
      setRoutes(storedRoutes);
    }
  }, []);

  useEffect(() => {
    createRouteInLocalStorage(STORAGE_KEY, routes);
  }, [routes]);

  const handleDelete = (routeId: string) => {
    setRoutes(routes.filter((route) => route.routeId !== routeId));
  };

  const handleUpdate = (routeId: string) => {
    const routeToUpdate = routes.find((route) => route.routeId === routeId);
    if (routeToUpdate) {
      setCurrentRoute(routeToUpdate);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const addRoute = (newRoute: TransitRoute) => {
    setRoutes((prevState) => {
      const newState = structuredClone(prevState);
      const existingRouteIndex = newState.findIndex(
        (route) => route.routeId === newRoute.routeId
      );

      if (existingRouteIndex !== -1) {
        newState[existingRouteIndex] = newRoute;
      } else {
        newState.push(newRoute);
      }

      return newState;
    });
  };

  const handleBatchUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split("\n");
      const newRoutes = [];
      lines.slice(1).forEach((line) => {
        const [
          routeId,
          name,
          direction,
          status,
          stopName,
          latitude,
          longitude,
        ] = line.split(",");
        if (routeId) {
          let route = newRoutes.find((route) => route.routeId === routeId);
          if (!route) {
            route = { routeId, name, direction, status, stops: [] };
            newRoutes.push(route);
          }
          route.stops.push({ stopName, latitude, longitude });
        }
      });
      setRoutes([...routes, ...newRoutes]);
    };
    reader.readAsText(file);
  };


  return (
    <div>
      <h1>Public Transit Route Repository</h1>
      <ExportButton
        disabled={routes.length === 0}
        onClick={() => exportRoutesAsCSV(routes)}
      >
        Export as CSV
      </ExportButton>

      <FileInput type="file" accept=".csv" onChange={handleBatchUploadCSV} />
      <div ref={formRef}>
        <RouteForm onSubmit={addRoute} currentRoute={currentRoute} />
      </div>
      <BottomMargin>
        <RouteList
          routes={routes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </BottomMargin>

      <MapView routes={routes} />
    </div>
  );
};

export default App;
