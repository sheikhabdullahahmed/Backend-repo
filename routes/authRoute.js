import express from 'express';
import upload from '../config/cloudinaryConfig';

const router = express.Router();
// Routes

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully!",
      imageUrl: req.file.path, // 
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }

})

// protect,

export default router;
