// controllers/user.js

import multer from 'multer';
import cloudinary from 'cloudinary';
import User from '../models/user';

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });

export const updateUserProfile = async (req, res) => {
  const { name } = req.body;
  let picture;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    picture = result.secure_url;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, picture },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error updating user profile");
  }
};
