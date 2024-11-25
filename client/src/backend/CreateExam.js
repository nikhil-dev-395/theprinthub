import React, { useState } from "react";
import "../components/createJobAd.css";
import { BASE_URL } from "../Url.js";

const CreateExam = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    if (!formData.jobTitle || !formData.date) {
      return "Please fill in all required fields";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);
    setError(null); // Reset error before submitting

    const formDataToSend = new FormData();
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("date", formData.date);
    try {
      const response = await fetch(`${BASE_URL()}/api/v1/createExam`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Exam Date created successfully");
        setFormData({
          jobTitle: "",
          date: "",
        });
      } else {
        setError(data.message || "Failed to create exam");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating exam. Please try again.");
    } finally {
      setLoading(false);
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
            required
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateExam;
