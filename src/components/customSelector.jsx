import React from "react";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

const SelectContainer = styled.div`
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 100% !important;
    margin-bottom: 10px !important;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  &.ant-select {
    .ant-select-selector {
      background-color: #050c17;
      // width: 200px !important;
      border-radius: 8px !important;
      padding: 10px !important;
      font-size: 16px;
      box-shadow: none !important;
      border-color: #36424e;
      @media (max-width: 600px) {
        width: 100% !important;
      }

      transition: border-color 0.3s ease;
      .ant-select-selection-placeholder {
        color: #888 !important; /* Change this to your desired placeholder color */
      }
    }

    &:hover .ant-select-selector {
      border-color: #40a9ff !important;
    }

    &.ant-select-open .ant-select-selector {
      border-color: #40a9ff !important;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
    }
  }
`;

const CustomSelector = ({ defaultValue, options, onChange, ...rest }) => {
  return (
    <SelectContainer>
      <StyledSelect
        className="custom-selector"
        {...rest}
        size="large"
        defaultValue={defaultValue}
        onChange={onChange}
        dropdownStyle={{ backgroundColor: "#141b26" }}
      >
        {options.map((option) => (
          <Option
            style={{
              color: "gray",
            }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </Option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default CustomSelector;
