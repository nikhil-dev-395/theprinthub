import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShowJobs.css";
import Nevbar from "./Nevbar.js";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url.js";
function ShowAdmitCards() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getAdmitCard`);
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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return <Spinner animation="border size=sm" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Nevbar />
      <CustomPaginationActionsTable data={jobs} type="admitCard" />
    </div>
  );
}

export default ShowAdmitCards;
