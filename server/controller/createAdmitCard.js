const path = require("path");
const fsPromises = require("fs/promises");
const User = require("../models/AdmitCard");

const sanitizeFileName = (filename) => filename.replace(/[^a-z0-9.\-]/gi, "_");

exports.createAdmitCard = async (req, res) => {
  try {
    const { jobTitle, description, admitCardLink } = req.body;

    // Ensure all required files are provided
    if (
      !req.files ||
      !req.files.file ||
      !req.files.declaration ||
      !req.files.adPoster
    ) {
      return res.status(400).json({
        status: 400,
        message: "File, declaration, and adPoster are required.",
      });
    }

    const file = req.files.file;
    const declaration = req.files.declaration;
    const adPoster = req.files.adPoster;

    const uploadDir = path.join(__dirname, "..", "public");
    // const pdfDir = path.join(uploadDir, "pdfs");
    // const imagesDir = path.join(uploadDir, "images");

    // Create directories if they don't exist
    // await fsPromises.mkdir(pdfDir, { recursive: true });
    // await fsPromises.mkdir(imagesDir, { recursive: true });

    // Sanitize file names
    const sanitizedFileName = sanitizeFileName(file.name);
    const sanitizedDeclarationName = sanitizeFileName(declaration.name);
    const sanitizedAdPosterName = sanitizeFileName(adPoster.name);

    // Define file paths
    const filePath = path.join(uploadDir, sanitizedFileName);
    const declarationPath = path.join(uploadDir, sanitizedDeclarationName);
    const adPosterPath = path.join(uploadDir, sanitizedAdPosterName);

    // Save files
    try {
      await file.mv(filePath);
      await declaration.mv(declarationPath);
      await adPoster.mv(adPosterPath);
    } catch (error) {
      return res.status(500).json({ message: "Error saving files." });
    }

    // Check required fields
    if (!jobTitle || !description || !admitCardLink) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Save admit card details in the database
    const admitCard = await User.create({
      jobTitle,
      description,
      file: sanitizedFileName,
      declaration: sanitizedDeclarationName,
      adPoster: sanitizedAdPosterName,
      admitCardLink,
    });

    return res.status(201).json({
      status: "success",
      message: "Admit card created successfully",
      data: admitCard,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
