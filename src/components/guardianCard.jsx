import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const StyledCard = styled(Card)`
  min-height: 280px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease, color 0.3s ease;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 1px solid #36424e;
  background-color: #050c17;
  .ant-card-head {
    border-bottom: 2px solid #36424e;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ArticleContent = styled.div`
  padding: 15px 15px;
  color: gray;
`;

const ArticleTitle = styled.h3`
  color: #e5e5e5;
  margin-bottom: 0px;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  border-top: 1px solid #36424e;
  padding-top: 20px;
  margin-top: 35px;
`;

const GuardianCard = ({ article }) => {
  return (
    <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
      <StyledCard
        title={<ArticleTitle>Section: {article.sectionName}</ArticleTitle>}
        bordered={false}
      >
        <ArticleContent>
          <strong>{article.webTitle}</strong>
          <ArticleMeta>
            <p>
              <strong>Type:</strong> {article.type}
            </p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(article.webPublicationDate).toLocaleDateString()}
            </p>
          </ArticleMeta>
        </ArticleContent>
      </StyledCard>
    </a>
  );
};

export default GuardianCard;
