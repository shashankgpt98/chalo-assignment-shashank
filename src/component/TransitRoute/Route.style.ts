// Route.style.ts
import styled from 'styled-components';

// Styles for RouteForm
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

export const FormLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
`;

export const FormInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
`;

export const FormSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
`;

export const FormButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const StopList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StopListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e7f3e7;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

export const StopDeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
  }
`;

// Styles for RouteList
export const RouteContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const RouteTitle = styled.h3`
  text-align: center;
  color: #333;
`;

export const RouteItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const RouteHeader = styled.h4`
  color: #007bff;
`;

export const RouteDetails = styled.p`
  font-size: 14px;
  color: #666;
`;

export const RouteButton = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const UpdateRouteButton = styled(RouteButton)`
  background-color: #4caf50; /* Green */
  color: white;
  margin-top: 10px; /* Top margin */

  &:hover {
    background-color: #45a049; /* Darker green */
  }
`;

export const DeleteRouteButton = styled(RouteButton)`
  background-color: #f44336; /* Red */
  color: white;
  margin-top: 10px; /* Top margin */

  &:hover {
    background-color: #e53935; /* Darker red */
  }
`;

export const RouteStopList = styled.ul`
  margin: 5px 0 0 20px;
`;

export const RouteStopItem = styled.li`
  font-size: 14px;
  color: #555;
`;
