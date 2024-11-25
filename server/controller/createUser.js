const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises; // Using promises for async file operations

exports.createUser = async (req, res) => {
  try {
    console.log("req.files:", req.files); // Log the files to check the structure

    const { jobTitle, description, vacancy, date, applyLink, officialWebsite } =
      req.body;

    // Ensure files are present
    if (
      !req.files ||
      !req.files.advPdf ||
      !req.files.adImage ||
      !req.files.adPoster
    ) {
      return res.status(400).json({
        status: 400,
        message: "Both advPdf, adImage, and adPoster files are required",
      });
    }

    const advPdf = req.files.advPdf;
    const adImage = req.files.adImage;
    const adPoster = req.files.adPoster;

    // Log tempFilePaths to debug
    console.log("advPdf.tempFilePath:", advPdf.tempFilePath);
    console.log("adImage.tempFilePath:", adImage.tempFilePath);
    console.log("adPoster.tempFilePath:", adPoster.tempFilePath);

    // Validate file types (example: only PDF for advPdf, and images for adImage and adPoster)
    // if (!advPdf.name.endsWith(".pdf")) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only PDF files are allowed for advPdf.",
    //   });
    // }

    // const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
    // if (!imageTypes.includes(adImage.mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only JPG, PNG, or JPEG images are allowed for adImage.",
    //   });
    // }
    // if (!imageTypes.includes(adPoster.mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Only JPG, PNG, or JPEG images are allowed for adPoster.",
    //   });
    // }

    // Ensure the /public directory and subdirectories exist
    const uploadDir = path.join(__dirname, "..", "public");
    // const pdfDir = path.join(uploadDir, "pdfs");
    // const imagesDir = path.join(uploadDir, "images");

    // Create the directory structure if it doesn't exist
    // await fsPromises.mkdir(pdfDir, { recursive: true });
    // await fsPromises.mkdir(imagesDir, { recursive: true });

    // Define the file paths for saving
    const advPdfPath = path.join(uploadDir, advPdf.name.replace(/\s+/g, "_")); // Replacing spaces with underscores
    const adImagePath = path.join(uploadDir, adImage.name.replace(/\s+/g, "_"));
    const adPosterPath = path.join(
      uploadDir,
      adPoster.name.replace(/\s+/g, "_")
    );

    // Log the final paths for debugging
    console.log("advPdfPath:", advPdfPath);
    console.log("adImagePath:", adImagePath);
    console.log("adPosterPath:", adPosterPath);

    // Move the files using fs.promises.rename
    await fsPromises.rename(advPdf.tempFilePath, advPdfPath);
    await fsPromises.rename(adImage.tempFilePath, adImagePath);
    await fsPromises.rename(adPoster.tempFilePath, adPosterPath);

    // Validate and convert inputs
    if (
      !jobTitle ||
      !description ||
      !vacancy ||
      !date ||
      !applyLink ||
      !officialWebsite
    ) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const vacancyNumber = Number(vacancy);
    const dateISO = new Date(date);

    // Validate vacancy and date
    if (isNaN(vacancyNumber)) {
      return res.status(400).json({
        status: 400,
        message: "Vacancy must be a number",
      });
    }

    if (isNaN(dateISO.getTime())) {
      return res.status(400).json({
        status: 400,
        message: "Date must be a valid date",
      });
    }

    // Create the user in the database
    const user = await User.create({
      jobTitle,
      description,
      vacancy: vacancyNumber,
      date: dateISO,
      advPdf: advPdf.name, // Save the filename in the database
      applyLink,
      officialWebsite,
      adImage: adImage.name, // Save the filename in the database
      adPoster: adPoster.name, // Save the filename in the database
    });

    return res.status(201).json({
      status: 201,
      message: "Job Ad created successfully",
      data: user,
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
