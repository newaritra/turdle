import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  width: fit-content;
  padding: 0 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 5rem;
  border-radius: 2rem;
  background: black;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const AlertContext = createContext({});

const Alert = ({ children }) => {
  const [alert, setAlert] = useState(false);
  return (
    <AlertContext.Provider value={{ alert, setAlert, AlertContainer }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) return;
  return context;
};

export { useAlert, Alert };
