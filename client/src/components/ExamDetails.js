import React, { useEffect, useState } from "react";
import Nevbar from "./Nevbar";
import Footer from "./Footer";
import "./ExamDetails.css";
import { BASE_URL } from "../Url.js";

function ExamDetails() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`/exam_data.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSections(data.sections);
        console.log(data.sections); // Log sections to verify the structure
      })
      .catch((error) => {
        console.error("There was a problem fetching exam data:", error);
      });
  }, []);

  return (
    <div>
      <Nevbar />
      <div className="exam-container">
        <div className="caption-header">
          <h2>Upcoming Government Exams Calendar 2024</h2>
        </div>
        <p>
          Being aware of the exam dates is crucial for candidates gearing up for
          competitive examinations. A significant number of aspirants struggle
          to cover the entire syllabus within the given time frame. Having
          information about the upcoming competitive examinations enables
          candidates to formulate a strategic study plan, ensuring comprehensive
          syllabus coverage in a timely manner.
        </p>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section">
            <div className="exam-info-title">
              <h2>{section.heading}</h2>
            </div>
            <p>{section.description}</p>
            <table className="exam-table">
              <thead>
                <tr>
                  <th>Name of the Exam</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {section.exams.map((exam, examIndex) => (
                  <tr key={examIndex}>
                    <td>{exam.name}</td>
                    <td>{exam.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExamDetails;
