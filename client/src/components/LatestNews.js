import React, { useState, useEffect } from "react";
import "./LatestNews.css";
import { BASE_URL } from "../Url.js";
function LatestNews() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedDes, setSelectedDes] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getCurrentNew`);
        if (!response.ok) {
          throw new Error(
            "Failed to fetch job details. Please try again later."
          );
        }
        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Could not load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestNews();
  }, []);
  useEffect(() => {
    console.log("Jobs state updated:", jobs);
  }, [jobs]);

  const handleClick = (newsTitle, disc, date) => {
    setSelectedNews(newsTitle);
    setSelectedDes(disc);
    setSelectedDate(date);
  };

  const handleClose = () => setSelectedNews(null);

  return (
    <div className={selectedNews ? "blur-background" : ""}>
      <div className="marquee-container">
        {loading && <div className="loading">Loading news...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && jobs.length === 0 && (
          <div className="no-news">No news available.</div>
        )}
        <div className="marquee">
          {[...jobs].reverse().map((item, index) => (
            <div
              className="marquee-item"
              key={item.id || `${item.title}-${index}`}
              onClick={() =>
                handleClick(
                  item.jobTitle || "No Title",
                  item.description || "No Description"
                )
              }
            >
              {item.jobTitle || "No Title"}
            </div>
          ))}
        </div>
      </div>

      {selectedNews && (
        <div
          className="popup-container"
          role="dialog"
          aria-labelledby="news-title"
          aria-describedby="news-description"
        >
          <div className="popup-content">
            <h2 id="news-title">{selectedNews}</h2>
            <p id="news-description">{selectedDes}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LatestNews;
