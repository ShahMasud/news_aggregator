import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import CustomMenu from "../components/customMenu";

const { Header, Content } = Layout;

// Styled Header component
const StyledHeader = styled(Header)`
  background: #050c17;
  border-bottom: 1px solid #36424e;
  @media (max-width: 600px) {
    padding: 0px !important;
  }
`;

// Styled Content component
const StyledContent = styled(Content)`
  background-color: #0d131c;
`;

const MainLayout = () => {
  const items = [
    {
      title: "News Api",
      path: "news-api",
    },
    {
      title: " Guardian Api",
      path: "guardian",
    },
    {
      title: "New York Times",
      path: "new-york-times",
    },
  ];

  return (
    <Layout style={{ background: "#1e1e1e" }}>
      <StyledHeader>
        <CustomMenu items={items} />
      </StyledHeader>
      <StyledContent>
        <div style={{ width: "92%", margin: "0 auto" }}>
          <Outlet />
        </div>
      </StyledContent>
    </Layout>
  );
};

export default MainLayout;
