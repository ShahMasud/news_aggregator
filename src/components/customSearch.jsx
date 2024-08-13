import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

// Styled container for the search input
const SearchContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141b26;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 0px !important;
  }
`;

// Styled Search input with specific placeholder styling
const StyledSearch = styled(Search)`
  .ant-input {
    background-color: #141b26;
    border-color: #36424e;
    color: #e5e5e5;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 16px;

    &::placeholder {
      color: gray !important;
      opacity: 1; /* Ensure placeholder is fully visible */
    }
  }

  .ant-input-affix-wrapper {
    background-color: #141b26;
    border-color: #36424e;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 16px;
  }

  .ant-btn {
    background-color: #050c17;
    border-color: #36424e;
    border-radius: 8px;
    height: 40.5px;
    color: gray;

    &:hover {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
  }
`;

const CustomSearch = ({ onSearch, placeholder }) => {
  return (
    <SearchContainer>
      <StyledSearch placeholder={placeholder} onSearch={onSearch} enterButton />
    </SearchContainer>
  );
};

export default CustomSearch;
