// routes/user.js

import express from 'express';
import { requireSignin } from '../middlewares';
import { updateUserProfile } from '../controllers/user';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.put('/user', requireSignin, upload.single('avatar'), updateUserProfile);

module.exports = router;
