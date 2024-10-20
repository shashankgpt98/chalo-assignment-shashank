import { styled } from "styled-components";

export const BottomMargin = styled.div`
margin-bottom: 16px;
`;

export const FileInput = styled.input`
margin: 20px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 14px;
`;

export const ExportButton = styled.button<{ disabled?: boolean }>`
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