import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nevbar from "./Nevbar";
import "./JobDetails.css";
import ReplyForm from "./ReplyForm";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url.js";

function JobDetails() {
  const { jobTitle } = useParams(); // Get the jobTitle from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL()}/api/v1/getAllUsers/${encodeURIComponent(jobTitle)}`
        ); // Encoding jobTitle to handle special characters in the URL

        if (!response.ok) {
          throw new Error(
            "Failed to fetch job details. Please try again later."
          );
        }

        const data = await response.json();
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
  }, [jobTitle]);

  if (loading) {
    return <Spinner animation="border" />;
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
        {job.adImage && (
          <img
            src={`${BASE_URL()}/${job.adImage}`}
            alt={job.jobTitle}
            className="JobDetails-image"
          />
        )}

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
        <div className="JobDetails-a">
          {/* Vacancy Information */}
          <div className="JobDetails-jobVacancy1">
            {job.vacancy ? (
              <>
                <strong>विविध पदांच्या एकूण </strong>
                <span className="JobDetails-jobVacancy2">{job.vacancy}</span>
                <strong> जागा</strong>
              </>
            ) : (
              <strong>Vacancy details not available</strong>
            )}
          </div>

          {/* Educational Qualification */}
          <div className="JobDetails-education">
            <strong>शैक्षणिक पात्रता </strong>
            <span>
              – पदांनुसार सविस्तर शैक्षणिक पात्रतेकरिता कृपया मूळ जाहिरात
              डाऊनलोड करून पाहावी.
            </span>
          </div>

          {/* Last Date to Apply */}
          <div className="JobDetails-lastDate">
            <strong>अर्ज करण्याची शेवटची तारीख </strong>
            <span>
              – दिनांक{" "}
              <span className="JobDetails-jobVacancy2">
                {job.date
                  ? new Date(job.date).toLocaleDateString("en-GB")
                  : "Date not available"}
              </span>{" "}
              पर्यंत ऑनलाईन पद्धतीने अर्ज करता येतील.
            </span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="JobDetails-buttons">
          {/* View Advertisement PDF */}
          {job.advPdf ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${BASE_URL()}/${job.advPdf}`}
            >
              <div
                className="JobDetails-ViewAd"
                role="button"
                aria-label="View Ad"
              >
                जाहिरात पाहा
              </div>
            </a>
          ) : (
            <div className="JobDetails-ViewAd-disabled">Ad not available</div>
          )}

          {/* Apply Online Link */}
          {job.applyLink ? (
            <a target="_blank" rel="noopener noreferrer" href={job.applyLink}>
              <div
                className="JobDetails-Aplly"
                role="button"
                aria-label="Apply Online"
              >
                ऑनलाइन अर्ज करा
              </div>
            </a>
          ) : (
            <div className="JobDetails-Aplly-disabled">
              Apply link not available
            </div>
          )}

          {/* Official Website Link */}
          {job.officialWebsite ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={job.officialWebsite}
            >
              <div
                className="JobDetails-official"
                role="button"
                aria-label="Official Website"
              >
                अधिकृत वेबसाइट
              </div>
            </a>
          ) : (
            <div className="JobDetails-official-disabled">
              Official website not available
            </div>
          )}
        </div>
      </div>
      <ReplyForm />
      <Footer />
    </div>
  );
}

export default JobDetails;
