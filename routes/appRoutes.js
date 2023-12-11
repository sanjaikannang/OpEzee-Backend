import express from 'express';
import multer from 'multer';

import  { createApp, deleteApp, getAllApps, getSpecificApp, updateApp } from '../controllers/appsControllers.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

// Create
router.post('/create', upload.single('icon'),createApp);

// Read
router.get('/get', getAllApps);

// Update
router.put('/update/:id', upload.single('icon'), updateApp);

// Delete
router.delete('/delete/:id', deleteApp);

//get specific details of the app using ID
router.get('/get/:id', getSpecificApp); 


export default router;