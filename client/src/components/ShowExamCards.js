import React, { useState, useEffect } from "react";
import "./ShowJobs.css";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url.js";
function ShowExamCards() {
  const [exams, setExams] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const exams = [
  //   { name: "Math Exam", date: "2024-12-01" },
  //   { name: "Science Exam", date: "2024-12-10" },
  // ];
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getExam`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setExams(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  function formatDate(dateString) {
    // Use 'en-GB' for DD/MM/YYYY format
    const formatter = new Intl.DateTimeFormat("en-GB");
    return formatter.format(new Date(dateString));
  }
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <h3>Upcoming Exam Details</h3>
      <div className="examDetails-container">
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {exams && exams.length > 0 ? (
              [...exams].reverse().map((exam, index) => (
                <tr key={index}>
                  <td>{exam.jobTitle}</td>
                  <td>{formatDate(exam.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No exams scheduled</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowExamCards;
