import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // specify the file name
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and JPG files are allowed!'), false);
    }
};

// Configure multer
const upload = multer({
    storage,
    fileFilter
});

export default upload;