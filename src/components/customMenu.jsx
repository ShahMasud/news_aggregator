import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  background: none;
  border-bottom: none;
`;

const StyledMenuItem = styled(Menu.Item)`
  color: #e4e4e4 !important;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    color: #1890ff !important;
  }

  &.ant-menu-item-selected {
    color: #1890ff !important;
  }
`;

const CustomMenu = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("0");

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "guardian":
        setSelectedKey("1");
        break;
      case "new-york-times":
        setSelectedKey("2");
        break;
      default:
        setSelectedKey("0");
    }
  }, [location]);

  const handleClick = (key, path) => {
    setSelectedKey(key);
    navigate(path);
  };

  return (
    <StyledMenu mode="horizontal" selectedKeys={[selectedKey]}>
      {items.map((item, index) => (
        <StyledMenuItem
          key={index.toString()}
          onClick={() => handleClick(index.toString(), item.path)}
        >
          {item.title}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
};

export default CustomMenu;
