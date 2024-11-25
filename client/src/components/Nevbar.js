import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Nevbar.css";
import { BASE_URL } from "../Url.js";

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  return `${date} ${time}`;
};

function CollapsibleExample() {
  // Function to get current date and time

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div
        className="d-flex justify-content-center my-4 bg-color"
        style={{ backgroundColor: " rgb(215 212 212)", padding: "20px" }}
      >
        <img
          src="/img/logoImg.png"
          alt="Description of image"
          style={{ width: "23%", height: "auto" }}
        />
        <div className="ms-auto">{currentDateTime}</div>
      </div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        {/* <Navbar.Text className="ms-auto">{currentDateTime}</Navbar.Text> */}
        <Container>
          <Navbar.Brand as={Link} to="/">
            The Printing Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto hoverCSS">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/job-updates">
                Job Updates
              </Nav.Link>
              <Nav.Link as={Link} to="/admit-cards">
                Admit Cards
              </Nav.Link>
              <Nav.Link as={Link} to="/exams">
                Exams
              </Nav.Link>
              <Nav.Link as={Link} to="/results">
                Results
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => {
                  alert("comming sooon......");
                }}
              >
                Notes
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => {
                  alert("comming sooon......");
                }}
              >
                Investments
              </Nav.Link>
              <Nav.Link as={Link} to="/help-desk">
                Help Desk
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;
