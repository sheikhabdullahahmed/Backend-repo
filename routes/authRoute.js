import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controller/authController.js';
import requireAuth from '../middleware/authMiddleware.js';
import upload from '../config/cloudinaryConfig.js';

const router = express.Router();
// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', requireAuth, getUserInfo);
// router.post('/upload', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// });

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Cloudinary gives a direct URL in req.file.path
        const imageUrl = req.file.path;

        res.status(200).json({
            message: 'File uploaded successfully!',
            imageUrl
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            message: 'Upload failed!',
            error: error.message
        });
    }
});

// protect,

export default router;
