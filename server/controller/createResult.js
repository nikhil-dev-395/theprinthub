const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const User = require("../models/Result");

// Helper function to sanitize file names
const sanitizeFileName = (fileName) => fileName.replace(/\s+/g, "_");

exports.createResult = async (req, res) => {
  try {
    const { jobTitle, description, resultLink } = req.body;
    const file = req.files?.file;
    const declaration = req.files?.declaration;
    const adPoster = req.files?.adPoster;

    // Ensure all required files are provided
    if (!file || !declaration || !adPoster) {
      return res.status(400).json({
        status: 400,
        message: "File, declaration, and adPoster are required.",
      });
    }

    // File type validation
    // if (!file.name.endsWith(".pdf")) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only PDF files are allowed for the main file.",
    //   });
    // }

    // const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
    // if (!imageTypes.includes(declaration.mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only JPG, PNG, or JPEG images are allowed for declaration.",
    //   });
    // }

    // if (!imageTypes.includes(adPoster.mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only JPG, PNG, or JPEG images are allowed for adPoster.",
    //   });
    // }

    // Ensure the directory structure exists
    const uploadDir = path.join(__dirname, "..", "public");
    // const pdfDir = path.join(uploadDir, "pdfs");
    // const imagesDir = path.join(uploadDir, "images");

    // await fsPromises.mkdir(pdfDir, { recursive: true });
    // await fsPromises.mkdir(imagesDir, { recursive: true });

    // Sanitize and define file paths
    const sanitizedFileName = sanitizeFileName(file.name);
    const sanitizedDeclarationName = sanitizeFileName(declaration.name);
    const sanitizedAdPosterName = sanitizeFileName(adPoster.name);

    const filePath = path.join(uploadDir, sanitizedFileName);
    const declarationPath = path.join(uploadDir, sanitizedDeclarationName);
    const adPosterPath = path.join(uploadDir, sanitizedAdPosterName);

    // Move files
    await file.mv(filePath);
    await declaration.mv(declarationPath);
    await adPoster.mv(adPosterPath);

    // Validate request body
    if (!jobTitle || !description || !resultLink) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields.",
      });
    }

    // Save the result in the database
    const result = await User.create({
      jobTitle,
      description,
      resultLink,
      file: sanitizedFileName,
      declaration: sanitizedDeclarationName,
      adPoster: sanitizedAdPosterName,
    });

    return res.status(201).json({
      status: 201,
      message: "Result created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message:
        "Internal server error. Please check the server logs for more details.",
    });
  }
};
