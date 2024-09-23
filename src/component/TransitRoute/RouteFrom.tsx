
import React, { useEffect, useState } from "react";
import { indianStates } from "../../data";
import { TransitRoute, Stop } from "../type";
import { DIRECTIONS, STATUSES } from "./constant";
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormSelect,
  FormButton,
  StopList,
  StopListItem,
  StopDeleteButton
} from './Route.style';

interface RouteFormProps {
  onSubmit: (route: TransitRoute) => void;
  currentRoute?: TransitRoute;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, currentRoute }) => {
  const [name, setName] = useState("");
  const [direction, setDirection] = useState<"UP" | "DOWN">("UP");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState("")

  useEffect(() => {
    if (currentRoute) {
      setName(currentRoute.name);
      setDirection(currentRoute.direction);
      setStatus(currentRoute.status);
      setStops(currentRoute.stops);
    }
  }, [currentRoute]);

  const handleStopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedStop(selectedState)
    const stateIndex = e.target.selectedOptions[0].getAttribute('data-custom');
    if (stateIndex) {
      const selected = indianStates[parseInt(stateIndex)];
      setStops([...stops, selected]);
    }
  };

  const handleStopDelete = (stopIndex: number) => {
    const updatedStops = stops.filter((_, index) => index !== stopIndex);
    setStops(updatedStops);
  };

  const handleResetForm = () => {
    setName("");
    setDirection("UP");
    setStatus("Active");
    setStops([]);
    setSelectedStop('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoute: TransitRoute = {
      routeId: currentRoute ? currentRoute.routeId : Date.now().toString(),
      name,
      direction,
      status,
      stops,
    };

    onSubmit(newRoute);
    handleResetForm()

  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <FormLabel>Route Name:</FormLabel>
        <FormInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <FormLabel>Direction:</FormLabel>
        <FormSelect
          value={direction}
          onChange={(e) => setDirection(e.target.value as "UP" | "DOWN")}
        >
          {DIRECTIONS.map((dir) => (
            <option key={dir.value} value={dir.value}>{dir.label}</option>
          ))}
        </FormSelect>
      </div>
      <div>
        <FormLabel>Status:</FormLabel>
        <FormSelect
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </FormSelect>
      </div>

      <div>
        <FormLabel>Select State:</FormLabel>
        <FormSelect onChange={handleStopChange} value={selectedStop} >
          <option value="">Select a state</option>
          {indianStates.map((state, index) => (
            <option key={index} value={state.stopName} data-custom={index}>
              {state.stopName}
            </option>
          ))}
        </FormSelect>
      </div>

      {stops.length > 0 && (
        <div>
          <h3>Selected Stops:</h3>
          <StopList>
            {stops.map((stop, index) => (
              <StopListItem key={index}>
                <span>
                  {stop.stopName} (Lat: {stop.latitude}, Lng: {stop.longitude})
                </span>
                <StopDeleteButton
                  type="button"
                  onClick={() => handleStopDelete(index)}
                >
                  <img
                    src="src/assets/red-x-icon.svg"
                    alt="Delete"
                  />
                </StopDeleteButton>
              </StopListItem>
            ))}
          </StopList>
        </div>
      )}

      <FormButton type="submit">Submit Route</FormButton>
    </FormContainer>
  );
};

export default RouteForm;
