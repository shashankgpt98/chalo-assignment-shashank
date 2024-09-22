
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { indianStates } from "../../data";
import { TransitRoute, Stop } from "../type";

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

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const Label = styled.label`
//   font-size: 1rem;
//   margin-bottom: 5px;
//   color: #333;
// `;

// const Input = styled.input`
//   padding: 8px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
//   font-size: 1rem;
//   width: 100%;
// `;

// const Select = styled.select`
//   padding: 8px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
//   font-size: 1rem;
//   width: 100%;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 1rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const StopsList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const StopItem = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between; /* Space between stop name and delete button */
//   background-color: #e7f3e7;
//   padding: 10px;
//   border-radius: 4px;
//   margin-bottom: 10px;
//   font-size: 0.9rem;
// `;

// const DeleteButton = styled.button`
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   margin-left: 10px; 
//   display: flex; 
//   align-items: center; 
//   img {
//     width: 16px;
//     height: 16px;
//   }
// `;

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, currentRoute }) => {
  const [name, setName] = useState("");
  const [direction, setDirection] = useState<"UP" | "DOWN">("UP");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop]  = useState("")

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
    const stateIndex =  e.target.selectedOptions[0].getAttribute('data-custom');
    if (stateIndex) {
      const selected = indianStates[parseInt(stateIndex)];
      setStops([...stops, selected]);
    }
  };

  const handleStopDelete = (stopIndex: number) => {
    const updatedStops = stops.filter((_, index) => index !== stopIndex);
    setStops(updatedStops);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoute: TransitRoute = {
      routeId: currentRoute ? currentRoute.routeId : Date.now().toString(), // Use existing ID for updates
      name,
      direction,
      status,
      stops,
    };

    onSubmit(newRoute);

    // Reset form
    setName("");
    setDirection("UP");
    setStatus("Active");
    setStops([]);
    setSelectedStop('')
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
          <option value="UP">UP</option>
          <option value="DOWN">DOWN</option>
        </FormSelect>
      </div>
      <div>
        <FormLabel>Status:</FormLabel>
        <FormSelect
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
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
  // return (
  //   <FormContainer onSubmit={handleSubmit}>
  //     <div>
  //       <Label>Route Name:</Label>
  //       <Input
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <Label>Direction:</Label>
  //       <Select
  //         value={direction}
  //         onChange={(e) => setDirection(e.target.value as "UP" | "DOWN")}
  //       >
  //         <option value="UP">UP</option>
  //         <option value="DOWN">DOWN</option>
  //       </Select>
  //     </div>
  //     <div>
  //       <Label>Status:</Label>
  //       <Select
  //         value={status}
  //         onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
  //       >
  //         <option value="Active">Active</option>
  //         <option value="Inactive">Inactive</option>
  //       </Select>
  //     </div>

  //     <div>
  //       <Label>Select State:</Label>
  //       <Select onChange={handleStopChange}>
  //         <option value="">Select a state</option>
  //         {indianStates.map((state, index) => (
  //           <option key={index} value={index}>
  //             {state.stopName}
  //           </option>
  //         ))}
  //       </Select>
  //     </div>

  //     {stops.length > 0 && (
  //       <div>
  //         <h3>Selected Stops:</h3>
  //         <StopsList>
  //           {stops.map((stop, index) => (
  //             <StopItem key={index}>
  //               <span>
  //                 {stop.stopName} (Lat: {stop.latitude}, Lng: {stop.longitude})
  //               </span>
  //               <DeleteButton
  //                 type="button"
  //                 onClick={() => handleStopDelete(index)}
  //               >
  //                 <img
  //                   src="src/assets/red-x-icon.svg"
  //                   alt="Delete"
  //                 />
  //               </DeleteButton>
  //             </StopItem>
  //           ))}
  //         </StopsList>
  //       </div>
  //     )}

  //     <Button type="submit">Submit Route</Button>
  //   </FormContainer>
  // );
};

export default RouteForm;
