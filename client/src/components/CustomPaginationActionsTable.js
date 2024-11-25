import React, { useState, useEffect } from "react";
import "./ShowJobs.css";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

function CustomPaginationActionsTable(prop) {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);

  // Simulate fetching data (If you need to fetch data, replace this with an API call)
  useEffect(() => {
    if (prop.data && prop.data.length > 0) {
      setExams(prop.data);
      setLoading(false); // Set loading to false once data is available
    } else {
      setError("No data found.");
      setLoading(false); // Set loading to false even if no data is found
    }
  }, [prop.data]);

  // Format date to 'DD/MM/YYYY'
  function formatDate(dateString) {
    if (!dateString) return "N/A";
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
      <div className="examDetails-container">
        <table>
          <thead>
            <tr>
              <th>{prop.type}</th>
              {exams.some((exam) => exam.date) && <th>Date</th>}
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              [...exams].reverse().map((exam, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link
                      to={`/${prop.type}/${encodeURIComponent(exam.jobTitle)}`}
                    >
                      {exam.jobTitle || "N/A"}
                    </Link>
                  </td>
                  {/* {exam.jobTitle}</td> */}
                  {exam.date && <td>{formatDate(exam.date)}</td>}
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

export default CustomPaginationActionsTable;
