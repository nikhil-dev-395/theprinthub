import React, { useState } from "react";
import "../components/createJobAd.css";
import { BASE_URL } from "../Url.js";

const CurrentNews = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);

    try {
      const response = await fetch(`${BASE_URL()}/api/v1/createCurrentNew`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Current news created successfully");
        setFormData({
          jobTitle: "",
          description: "",
          date: "", // Resetting date field here
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating while creating current news");
    }
  };

  return (
    <div className="add-container">
      <div className="create-job-ad-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            required // Added required attribute
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required // Added required attribute
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date" // Changed from declaration to date
            value={formData.date} // Added value for controlled input
            onChange={handleChange}
            required // Added required attribute
          />

          <button type="submit">Current News Update</button>
        </form>
      </div>{" "}
    </div>
  );
};

export default CurrentNews;
