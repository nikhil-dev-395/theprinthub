import React, { useState } from "react";
import "./createJobAd.css";
import { BASE_URL } from "../Url.js";

const CreateJobAd = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    vacancy: "",
    date: "",
    advPdf: null,
    applyLink: "",
    officialWebsite: "",
    adImage: null,
    adPoster: null, // Corrected the field name here
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("vacancy", formData.vacancy);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("applyLink", formData.applyLink);
    formDataToSend.append("officialWebsite", formData.officialWebsite);

    // Append file fields conditionally if they exist
    if (formData.advPdf) formDataToSend.append("advPdf", formData.advPdf);
    if (formData.adImage) formDataToSend.append("adImage", formData.adImage);
    if (formData.adPoster) formDataToSend.append("adPoster", formData.adPoster); // Added adPoster here

    try {
      const response = await fetch(`${BASE_URL()}/api/v1/createUser`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Job ad created successfully!");
        // Reset form fields after successful submission
        setFormData({
          jobTitle: "",
          description: "",
          vacancy: "",
          date: "",
          advPdf: null,
          applyLink: "",
          officialWebsite: "",
          adImage: null,
          adPoster: null, // Reset adPoster too
        });
      } else {
        alert(data.message || "Error creating job ad.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating job ad. Please try again.");
    }
  };

  return (
    <div className="add-container">
      <div className="create-job-ad-container">
        <form onSubmit={handleSubmit}>
          <label>
            Job Title:
            <input
              className="jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              className="jobTitle"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <input
            type="number"
            name="vacancy"
            placeholder="Vacancy"
            value={formData.vacancy}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <label>
            Add Advertisement PDF
            <input type="file" name="advPdf" onChange={handleChange} />
          </label>
          <label>
            Add Image
            <input type="file" name="adImage" onChange={handleChange} />
          </label>
          <label>
            Add Poster Information
            <input
              type="file"
              name="adPoster" // Updated to match the backend field name
              onChange={handleChange}
            />
          </label>
          <label>
            Apply Link
            <input
              type="text"
              name="applyLink"
              placeholder="Apply Link"
              value={formData.applyLink}
              onChange={handleChange}
            />
          </label>
          <label>
            Official Website
            <input
              type="text"
              name="officialWebsite"
              placeholder="Official Website"
              value={formData.officialWebsite}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobAd;
