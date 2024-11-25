import React, { useState, useEffect } from "react";
import Nevbar from "./Nevbar.js";
import { Link } from "react-router-dom";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable.js";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url.js";
export const ResultMainPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getResultsCard`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Nevbar />
      <CustomPaginationActionsTable data={jobs} type="result" />
    </div>
  );
};
