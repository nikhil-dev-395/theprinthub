import React, { useState } from "react";
import "../components/createJobAd.css";
import { BASE_URL } from "../Url.js";

const CreateResult = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    declaration: null,
    resultLink: "",
    file: null,
    adPoster: null,
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
    formDataToSend.append("declaration", formData.declaration);
    formDataToSend.append("resultLink", formData.resultLink);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }
    if (formData.adPoster) formDataToSend.append("adPoster", formData.adPoster); // Added adPoster here

    try {
      const response = await fetch(`${BASE_URL()}/api/v1/createResult`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Result created successfully");
        setFormData({
          jobTitle: "",
          description: "",
          declaration: null,
          resultLink: "",
          file: null,
          adPoster: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating while creating result");
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
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="declaration">Declaration:</label>
          <input
            type="file"
            name="declaration"
            placeholder="Declaration"
            onChange={handleChange}
          />

          <label htmlFor="resultLink">Result Link:</label>
          <input
            type="text"
            name="resultLink"
            placeholder="Result Link"
            value={formData.resultLink}
            onChange={handleChange}
          />
          <label>
            Add Poster Information
            <input
              type="file"
              name="adPoster" // Updated to match the backend field name
              onChange={handleChange}
            />
          </label>
          <br />

          <label htmlFor="file"> Image Upload File:</label>
          <input type="file" name="file" onChange={handleChange} />

          <button type="submit">Create Job Ad</button>
        </form>
      </div>
    </div>
  );
};

export default CreateResult;
