import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const StyledCard = styled(Card)`
  min-height: 494px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 1px solid #36424e;
  background-color: #050c17;
  border-radius: 7px;
  .ant-card-head {
    border-bottom: 2px solid #36424e;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 6px 6px 0 0;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const ArticleContent = styled.div`
  color: #e5e5e5;
  padding: 10px 0;
`;

const ArticleTitle = styled.h3`
  color: #e5e5e5;
  margin-bottom: 10px;
  font-size: 16px;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  padding-top: 8px;
`;

const ArticleDescription = styled.p`
  margin-bottom: 10px;
  color: #e5e5e5;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  border-top: 1px solid #36424e;
  padding-top: 8px;
`;

const ArticleCard = ({ article }) => {
  const imageUrl =
    article?.multimedia?.length > 0
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "https://via.placeholder.com/600";
  return (
    <a
      href={article?.url || article?.webUrl || article?.web_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <StyledCard
        title={
          <ArticleTitle>
            {article?.title || article?.headline?.main}
          </ArticleTitle>
        }
        bordered={false}
      >
        <StyledImage src={article?.urlToImage || imageUrl} alt="img" />
        <ArticleContent>
          <ArticleDescription>
            {article.description || article?.lead_paragraph} (
            <strong>{article?.author || article?.byline?.original}</strong>)
          </ArticleDescription>
          <ArticleMeta>
            <p>
              <strong>Source:</strong>{" "}
              {article?.source?.name || article?.source}
            </p>
            <p>
              Publish Date:{" "}
              {new Date(
                article?.publishedAt || article?.pub_date
              ).toLocaleDateString()}
            </p>
          </ArticleMeta>
        </ArticleContent>
      </StyledCard>
    </a>
  );
};

export default ArticleCard;
