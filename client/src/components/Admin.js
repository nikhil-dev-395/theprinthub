import React, { useState } from "react";
import CreateJobAd from "./CreateJobAd";
import Nevbar from "./Nevbar";
import { Form } from "react-bootstrap";
import CreateAdmitCard from "../backend/CreateAdmitCard";
import CreateResult from "../backend/CreateResult";
import CurrentNews from "../backend/CurrentNews";
import CreateExam from "../backend/CreateExam.js";
import "./admin.css";
// import CurrentNews component if you have it
// import CurrentNews from "./CurrentNews";

export const Admin = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const label = event.target.nextSibling.textContent;
    setSelectedOption(label);
    console.log(label);
  };

  return (
    <div>
      <Nevbar />
      <div className="radioForm">
        <Form>
          <div className="mb-5 admin-option">
            <Form.Check
              inline
              label="Job Updates"
              name="group1"
              type="radio"
              id="inline-radio-1"
              checked={selectedOption === "Job Updates"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Admit Cards"
              name="group1"
              type="radio"
              id="inline-radio-2"
              checked={selectedOption === "Admit Cards"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Exams"
              name="group1"
              type="radio"
              id="inline-radio-3"
              checked={selectedOption === "Exams"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Results"
              name="group1"
              type="radio"
              id="inline-radio-4"
              checked={selectedOption === "Results"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="CurrentNews"
              name="group1"
              type="radio"
              id="inline-radio-5"
              checked={selectedOption === "CurrentNews"}
              onChange={handleChange}
            />
          </div>
        </Form>
      </div>
      {selectedOption === "Job Updates" && <CreateJobAd />}
      {selectedOption === "Exams" && <CreateExam />}
      {selectedOption === "Admit Cards" && <CreateAdmitCard />}
      {selectedOption === "Results" && <CreateResult />}
      {selectedOption === "CurrentNews" && <CurrentNews />}
    </div>
  );
};

export default Admin;
