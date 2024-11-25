import React, { useState } from "react";
import "../components/createJobAd.css";
import { BASE_URL } from "../Url.js";

const CreateJobAd = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    declaration: null,
    admitCardLink: "",
    file: null,
    adPoster: null,
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
    if (
      !formData.jobTitle ||
      !formData.description ||
      !formData.declaration ||
      !formData.admitCardLink
    ) {
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
    formDataToSend.append("description", formData.description);
    formDataToSend.append("declaration", formData.declaration);
    formDataToSend.append("admitCardLink", formData.admitCardLink);
    if (formData.file) formDataToSend.append("file", formData.file);
    if (formData.adPoster) formDataToSend.append("adPoster", formData.adPoster);

    try {
      const response = await fetch(`${BASE_URL()}/api/v1/createAdmitCard`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Job ad created successfully!");
        setFormData({
          jobTitle: "",
          description: "",
          declaration: null,
          admitCardLink: "",
          file: null,
          adPoster: null,
        });
      } else {
        setError(data.message || "Failed to create job ad");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating job ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      <div className="create-job-ad-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>
            Declaration:
            <input
              type="file"
              name="declaration"
              onChange={handleChange}
              required
            />
          </label>
          <input
            type="text"
            name="admitCardLink"
            placeholder="Admit Card Link"
            value={formData.admitCardLink}
            onChange={handleChange}
            required
          />
          <label>
            Images-file:
            <input type="file" name="file" onChange={handleChange} />
          </label>
          <label>
            Add Poster Information:
            <input type="file" name="adPoster" onChange={handleChange} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create Job Ad"}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateJobAd;
