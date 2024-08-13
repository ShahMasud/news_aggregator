import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, DatePicker, Row, Col, Spin } from "antd";
import GuardianCard from "../components/guardianCard";
import CustomSearch from "../components/customSearch";
import CustomButton from "../components/customButton";
import CustomSelector from "../components/customSelector";
import CustomDatePicker from "../components/customDatePicker";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const API_KEY = "93b22361-2898-49ec-9b78-9e784af64922";
const BASE_URL = "https://content.guardianapis.com";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100% !important;
    margin-top: 20px;
  }
`;
const TotalArt = styled.p`
  font-size: 16px;
  margin-right: 5px;
  color: #e4e4e4;
  @media (max-width: 600px) {
    // display: none;
    margin-top: 20px;
  }
`;

const GuardianApi = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("All");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [section, setSection] = useState("");
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    getSections();
    getContent();
  }, []);

  useEffect(() => {
    getContent();
  }, [query, page, section, dateRange]);

  const getContent = async () => {
    setLoading(true);
    setError(null);

    const fromDate = dateRange[0] ? new Date(dateRange[0]).toISOString() : null;
    const toDate = dateRange[1] ? new Date(dateRange[1]).toISOString() : null;

    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          q: query,
          page: page,
          section: section || undefined,
          fromDate: fromDate,
          toDate: toDate,
          "api-key": API_KEY,
        },
      });

      setArticles(response.data.response.results);
      setTotalResults(response.data.response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sections`, {
        params: { "api-key": API_KEY },
      });
      setSourceData(response.data.response.results);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

  const handleSectionChange = (value) => {
    setSection(value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
  };

  const sections = sourceData.map((section) => ({
    label: section.webTitle,
    value: section.id,
  }));

  return (
    <div>
      <Spin size="large" spinning={loading}>
        <div style={{ minHeight: "90.7vh", marginBottom: "30px" }}>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                marginTop: "0px",
                textTransform: "capitalize",
                color: "#e5e5e5",
              }}
            >
              <strong style={{ color: "#2268D1" }}>{query || "All"}</strong>{" "}
              Articles
            </h2>

            <CustomSearch
              placeholder="Search articles"
              onSearch={handleSearch}
            />
          </Container>
          <TotalArt
            style={{
              fontSize: "16px",
              fontWeight: 500,
              marginBottom: "35px",
              color: "#e5e5e5",
            }}
          >
            Total Articles:{" "}
            <strong
              style={{
                backgroundColor: "black",
                borderRadius: "6px",
                padding: "2px 6px 4px 6px",
                color: "#2268D1",
              }}
            >
              {totalResults}
            </strong>
          </TotalArt>

          <div>
            <div style={{ marginBottom: "15px" }}>
              <Row gutter={[15, 15]}>
                <Col xs={24} md={12} lg={8}>
                  <CustomSelector
                    defaultValue="Select Section"
                    options={sections}
                    onChange={handleSectionChange}
                  />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <CustomDatePicker onChange={handleDateChange} />
                </Col>
                <Col xs={24} md={24} lg={8} style={{ padding: "0px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 5px",
                    }}
                  >
                    {page > 1 && (
                      <CustomButton onClick={() => setPage(page - 1)}>
                        <LeftOutlined />
                      </CustomButton>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "0px",
                      }}
                    >
                      <p
                        style={{
                          backgroundColor: "#050c17",
                          border: "1px solid #36424e",
                          borderRadius: "6px",
                          width: "150px",
                          padding: "10px 0",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Page:{" "}
                        <strong style={{ color: "#2268D1" }}>{page}</strong>/
                        {Math.ceil(totalResults / 10)}
                      </p>
                    </div>
                    {page < Math.ceil(totalResults / 10) && (
                      <CustomButton onClick={() => setPage(page + 1)}>
                        <RightOutlined />
                      </CustomButton>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
            {articles?.length > 0 ? (
              <Row gutter={[15, 15]}>
                {articles.map((article, index) => (
                  <Col
                    key={article.id}
                    xs={24}
                    sm={12}
                    lg={index === 8 || index === 9 ? 12 : 6}
                  >
                    <GuardianCard guardian="true" article={article} />
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
    </div>
  );
};

export default GuardianApi;
