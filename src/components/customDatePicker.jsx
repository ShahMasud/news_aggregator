import React from "react";
import styled from "styled-components";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const StyledRangePicker = styled(RangePicker)`
  width: 100%;
  background-color: #050c17;
  &:hover {
    background-color: #050c17;
  }
  .ant-picker {
    background-color: #f0f0f0;
    border-radius: 8px;
    border: 2px solid #d9d9d9;
    &:hover {
      border-color: #1890ff;
    }
  }

  .ant-picker-input > input {
    font-weight: 500;
  }

  .ant-picker-clear {
    background-color: #ff4d4f;
    &:hover {
      background-color: #ff7875;
    }
  }
`;

const CustomDatePicker = ({ onChange }) => {
  return <StyledRangePicker size="large" onChange={onChange} />;
};

export default CustomDatePicker;
