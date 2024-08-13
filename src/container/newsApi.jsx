import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, DatePicker, Row, Col, Spin } from "antd";
import ArticleCard from "../components/customCard";
import CustomSearch from "../components/customSearch";
import CustomSelector from "../components/customSelector";
import styled from "styled-components";
import CustomDatePicker from "../components/customDatePicker";
const { RangePicker } = DatePicker;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100% !important;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const TotalArt = styled.p`
  font-size: 16px;
  margin-right: 5px;
  color: #e4e4e4;
  text-align: end;
  margin-top: 10px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const TotalArt2 = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: #e4e4e4;
  @media (min-width: 600px) {
    display: none;
  }
`;
const NewsApi = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [source, setSource] = useState("");
  const [sourceData, setSourceData] = useState([]);

  // Track unique source identifiers
  const seen = new Set();

  // Extract unique sources from articles
  const sources = sourceData
    .map((data) => ({
      label: data?.source?.name || "Unknown Source", // Default label
      value: data?.source?.id || data?.source?.name, // Use source.id or fallback to source.name
    }))
    .filter((item) => {
      if (seen.has(item.value)) {
        return false;
      }
      seen.add(item.value);
      return true;
    });

  // Fetch articles from API
  const fetchArticles = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        headers: {
          "x-api-key": process.env.REACT_APP_NEWS_API_KEY, // Use header for API key
        },
        params: {
          q: filters.keyword || "",
          sources: filters.source || "",
          from: filters.from || "",
          to: filters.to || "",
          language: "en",
        },
      });
      console.log("API Response:", response);
      if (response?.data?.status == "ok") {
        setArticles(response.data.articles);
        setTotalResults(response?.data?.totalResults);
      } else {
        setArticles([]);
        setTotalResults([]);
      }
    } catch (error) {
      setArticles([]);
      setTotalResults([]);
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchSources = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        headers: {
          "x-api-key": process.env.REACT_APP_NEWS_API_KEY, // Use header for API key
        },
        params: {
          q: filters.keyword || "",
          sources: filters.source || "",
          from: filters.from || "",
          to: filters.to || "",
          language: "en",
        },
      });
      console.log("setSourceData Response:", response);
      setSourceData(response?.data?.articles);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial articles on mount
  useEffect(() => {
    fetchArticles({ keyword: "All Categories" });
    fetchSources({ keyword: "All" });
  }, []);

  // Handle search input
  const handleSearch = (value) => {
    console.log("Search Value:", value);
    setCategory(value);
    fetchArticles({
      keyword: value,
      source,
      from: dateRange[0],
      to: dateRange[1],
    });
  };

  // Handle source selection
  const handleSourceChange = (value) => {
    console.log("Selected Source:", value);
    setSource(value);
    fetchArticles({
      keyword: category,
      source: value,
      from: dateRange[0],
      to: dateRange[1],
    });
  };

  // Handle date range selection
  const handleDateChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
    console.log("Selected Dates:", dateStrings);
    fetchArticles({
      keyword: category,
      source,
      from: dateStrings[0],
      to: dateStrings[1],
    });
  };

  console.log("Articles:", articles);

  return (
    <Spin size="large" spinning={loading}>
      <div style={{ minHeight: "90.7vh" }}>
        <Container>
          <h2
            style={{
              color: "#E4E4E4",
              marginTop: "0px",
              textTransform: "capitalize",
            }}
          >
            <strong style={{ color: "#2268D1" }}>{category || "All"}</strong>{" "}
            Articles
          </h2>
          <CustomSearch placeholder="Search articles" onSearch={handleSearch} />
        </Container>

        <div>
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <Row gutter={[15, 15]}>
              <Col xs={24} md={12} lg={8}>
                <CustomSelector
                  defaultValue="Select Source"
                  options={sources}
                  onChange={handleSourceChange}
                />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <CustomDatePicker onChange={handleDateChange} />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <TotalArt>
                  Total Articles:{" "}
                  <strong style={{ color: "#2268D1" }}>{totalResults}</strong>
                </TotalArt>
              </Col>
            </Row>
          </div>
          <TotalArt2>
            Total Articles:{" "}
            <strong style={{ color: "#2268D1" }}>{totalResults}</strong>{" "}
          </TotalArt2>
          {articles?.length > 0 ? (
            <Row gutter={[15, 15]}>
              {articles.map((article) => (
                <Col xs={24} sm={12} lg={8} key={article.url}>
                  <ArticleCard article={article} />
                </Col>
              ))}
            </Row>
          ) : (
            <div
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <h2>No Data</h2>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default NewsApi;
