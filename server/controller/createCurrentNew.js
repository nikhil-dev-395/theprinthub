const path = require("path");
const fs = require("fs");
const CurrentNew = require("../models/CurrentNews");

// Controller function to create a new CurrentNews
exports.createCurrentNew = async (req, res) => {
  try {
    const { jobTitle, description, date } = req.body;

    // Basic validation
    if (!jobTitle || !description || !date) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields (title, description, and date) are required.",
      });
    }

    // Input sanitization can be added here if necessary

    const newCurrentNew = new CurrentNew({
      jobTitle,
      description,
      date,
    });

    const result = await newCurrentNew.save(); // Use save method to ensure document validation

    // Respond with success message and data
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Current news created successfully",
      data: result,
    });
  } catch (error) {
    // Log and respond with error message
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message:
        "Internal server error. Please check the server logs for more details.",
    });
  }
};
