
const express = require('express');
const router = express.Router();
const ClickData = require('../models/ClickData');

// Insert data endpoint
router.post('/insert', async (req, res) => {
  try {
    // Create a new document with the request body
    const newClickData = new ClickData({
      timestamp: req.body.timestamp || new Date(),
      message: req.body.message || 'Button clicked'
    });

    // Save to database
    const savedData = await newClickData.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Data inserted successfully',
      id: savedData._id,
      timestamp: savedData.timestamp
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to insert data',
      error: error.message
    });
  }
});

// Get all data endpoint (optional)
router.get('/data', async (req, res) => {
  try {
    const allData = await ClickData.find().sort({ timestamp: -1 });
    res.status(200).json({
      success: true,
      count: allData.length,
      data: allData
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: error.message
    });
  }
});

module.exports = router;
