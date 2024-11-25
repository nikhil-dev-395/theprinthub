import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nevbar from "./Nevbar";
import "./JobDetails.css";
import ReplyForm from "./ReplyForm";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url.js";

function JobAdmitCard() {
  const { jobTitle } = useParams(); // Get the jobTitle from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL()}/api/v1/getResultsCard/${encodeURIComponent(jobTitle)}`
        ); // Encoding jobTitle to handle special characters in the URL

        if (!response.ok) {
          throw new Error(
            "Failed to fetch job details. Please try again later."
          );
        }

        const data = await response.json();
        console.log(data);
        console.log(data.data);
        setJob(data.data[0] || {});
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Could not load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    console.log();
  }, [jobTitle]);
  if (loading) {
    return <Spinner animation="border" />; // You can add a spinner or other loading element here
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!job) {
    return <div className="no-job-message">Job not found</div>;
  }

  return (
    <div>
      <Nevbar />
      <div className="JobDetails-container">
        {/* Job Title */}
        <div className="JobDetails-jobTitle">{job.jobTitle}</div>

        {/* Job Image (optional) */}
        {/* {job.adImage && (
          <img
            src={`http://localhost:4000/${job.adImage}`}
            alt={job.jobTitle}
            className="JobDetails-image"
          />
        )} */}

        {/* Job Description */}
        <div className="JobDetails-jobDescription">
          {job.description || "Job description not available"}
        </div>
        <div className="JobDetails-infoImage">
          <img
            src={`${BASE_URL()}/${job.adPoster}`}
            alt={job.jobTitle}
            className="JobPoster-image"
          />
        </div>

        {/* Action Buttons */}
        <div className="JobDetails-buttons">
          {/* Apply Online Link */}
          {job.resultLink ? (
            <a target="_blank" rel="noopener noreferrer" href={job.resultLink}>
              <div
                className="JobDetails-Aplly"
                role="button"
                aria-label="Apply Online"
              >
                Result Link
              </div>
            </a>
          ) : (
            <div className="JobDetails-Aplly-disabled">
              download link not available
            </div>
          )}
        </div>
      </div>
      <ReplyForm />
      <Footer />
    </div>
  );
}

export default JobAdmitCard;
