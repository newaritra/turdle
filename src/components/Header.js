import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h3`
  font-weight: 600;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  text-align: center;
  font-size: 3rem;
`;
const Header = () => {
  return <StyledHeader>Turdle</StyledHeader>;
};

export default Header;
