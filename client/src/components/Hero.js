import React, { useState, useEffect } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
// import { useTypingEffect } from "./useTypingEffect"; // Custom hook for typing effect
import "./Hero.css"; // Import CSS file for styling the Hero component
import ShowJobs from "./ShowJobs";
import LatestNews from "./LatestNews";
import InvestmentArea from "./InvestmentArea";
import ShowAdmitCards from "./ShowAdmitCards";
import ShowExamCards from "./ShowExamCards";
import ShowResults from "./ShowResults";
import { BASE_URL } from "../Url.js";

const Hero = () => {
  const [selectedOption, setSelectedOption] = useState("Job Updates");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    // Load hero data from local storage on component mount
    const savedHeroData = localStorage.getItem("heroData");
    console.log(savedHeroData);
    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData));
    }
  }, []);

  // Use typing effect for the heading
  const typedText = "useTypingEffect(Welcome to The Printing Hub, 100)";

  return (
    <div className="main-container">
      <div className="hero">
        <Container className="text-center">
          <h1>{typedText}</h1>
        </Container>
        <div className="radioForm">
          <Form>
            <div className="mb-5">
              <Form.Check
                inline
                label="Job Updates"
                name="group1"
                type="radio"
                id="inline-radio-1"
                value="Job Updates"
                checked={selectedOption === "Job Updates"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Admit Cards"
                name="group1"
                type="radio"
                id="inline-radio-2"
                value="Admit Cards"
                checked={selectedOption === "Admit Cards"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Exams"
                name="group1"
                type="radio"
                id="inline-radio-3"
                value="Exams"
                checked={selectedOption === "Exams"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Results"
                name="group1"
                type="radio"
                id="inline-radio-4"
                value="Results"
                checked={selectedOption === "Results"}
                onChange={handleChange}
              />
            </div>

            <div className="main-contain">
              <div className="cardCss">
                {selectedOption === "Job Updates" && <ShowJobs />}
                {selectedOption === "Admit Cards" && <ShowAdmitCards />}
                {selectedOption === "Exams" && <ShowExamCards />}
                {selectedOption === "Results" && <ShowResults />}
              </div>
            </div>
          </Form>
        </div>
        <div className="new_invest">
          <div className="current_update">
            <div className="current_update_1">Current Updates</div>{" "}
          </div>
          <LatestNews />
        </div>
      </div>
    </div>
  );
};

export default Hero;
