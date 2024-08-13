import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #050c17;
  border-color: #36424e;

  border-radius: 100%;
  width: 36px;
  height: 36px;
  color: gray;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 14px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #2268d1 !important;
    color: white !important;
  }

  &:focus {
    outline: nones;
    box-shadow: 0 0 0 2px rgba(72, 199, 142, 0.2);
  }
`;

const CustomButton = ({ onClick, children, style, ...rest }) => {
  return (
    <StyledButton {...rest} style={{ ...style }} size="large" onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
