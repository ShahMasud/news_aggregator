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
    margin-bottom: 25px;
    margin-top: 20px;
  }
`;

const TotalArt = styled.p`
  font-size: 16px;
  margin-right: 5px;
  color: #e4e4e4;
  text-align: end;
  margin-top: 10px;
  @media (max-width: 600px) {
    // display: none;
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

const NewYorkTimes = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [source, setSource] = useState("");
  const [query, setQuery] = useState("");
  const [sourceData, setSourceData] = useState([]);

  // Track unique source identifiers
  const seen = new Set();

  // Extract unique sources from articles
  const sources = sourceData
    .map((data) => ({
      label: data?.source || "Unknown Source", // Default label
      value: data?.source || data?.source, // Use source.id or fallback to source.name
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
      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            q: filters.keyword || query,
            source: filters.source,
            begin_date:
              filters.from || (dateRange[0] && dateRange[0].replace(/-/g, "")),
            end_date:
              filters.to || (dateRange[1] && dateRange[1].replace(/-/g, "")),
            "api-key": "QZTVRP0dTEQYXPIZJzJ0dET2AN9BYqpM",
          },
        }
      );
      setArticles(response.data.response.docs);
      setTotalResults(response.data.response.docs?.length);
      console.log("New York Times Response:", response);
    } catch (error) {
      // setArticles([]);
      // setTotalResults(0);
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
      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            "api-key": "QZTVRP0dTEQYXPIZJzJ0dET2AN9BYqpM",
          },
        }
      );

      console.log("source Response:", response);

      setSourceData(response.data.response.docs);
    } catch (error) {
      // setTotalResults(0);
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial articles on mount
  useEffect(() => {
    fetchArticles();
    fetchSources();
  }, []);

  // Handle search input
  const handleSearch = (value) => {
    console.log("Search Value:", value);
    setQuery(value);
    fetchArticles({
      keyword: value,
      source,
      from: dateRange[0],
      to: dateRange[1],
    });
  };

  const handleSourceChange = (value) => {
    console.log("Selected Section:", value);
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
      keyword: query,
      source,
      from: dateStrings[0],
      to: dateStrings[1],
    });
  };

  console.log("Articles newyork:", articles);

  return (
    <Spin size="large" spinning={loading}>
      <div style={{ minHeight: "90vh" }}>
        <Container>
          <h2
            style={{
              marginTop: "0px",
              textTransform: "capitalize",
              color: "#E4E4E4",
            }}
          >
            <strong style={{ color: "#2268D1" }}>{query || "All"}</strong>{" "}
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
          {articles ? (
            <Row gutter={[15, 15]}>
              {articles.map((article) => (
                <Col xs={24} sm={12} lg={8} key={article.web_url}>
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
              <h1>No Data</h1>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default NewYorkTimes;
