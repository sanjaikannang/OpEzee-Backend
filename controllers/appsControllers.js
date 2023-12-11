import App from '../models/appsModels.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create
export const createApp = async (req, res) => {
  try {
    const { name, configuration } = req.body;
    const icon = req.file.filename; // Multer adds the file object to the request

    const newApp = new App({ icon, name, configuration });
    const savedApp = await newApp.save();

    res.status(201).json(savedApp);
  } catch (error) {
    console.error('Error creating app:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
export const getAllApps = async (req, res) => {
  try {
    const apps = await App.find();

    // Assuming 'icon' is the filename stored in the database
    const appsWithFullPath = apps.map(app => ({
      ...app.toObject(),
      icon: `http://localhost:4000/uploads/${app.icon}`, // Update this URL
    }));

    res.status(200).json(appsWithFullPath);
  } catch (error) {
    console.error('Error getting apps:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
export const updateApp = async (req, res) => {
  try {
    const { name, configuration } = req.body;

    let updateFields = { name, configuration };

    if (req.file) {
      updateFields.icon = req.file.filename;
    }

    const updatedApp = await App.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.status(200).json(updatedApp);
  } catch (error) {
    console.error('Error updating app:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
export const deleteApp = async (req, res) => {
  try {
    const deletedApp = await App.findByIdAndDelete(req.params.id);
    res.status(200).json('deleted successfully');
  } catch (error) {
    console.error('Error deleting app:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSpecificApp = async (req, res) => {
  try {
    const appId = req.params.id;
    const app = await App.findById(appId);

    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }

    // Use import.meta.url to get the current module's URL
    const currentUrl = import.meta.url;
    const currentPath = dirname(fileURLToPath(currentUrl));

    // Construct the full path to the image
    const appWithFullPath = {
      ...app.toObject(),
      icon: `http://localhost:4000/uploads/${app.icon}`, // Update this URL
    };
    
    res.status(200).json(appWithFullPath);

  } catch (error) {
    console.error('Error getting app details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

