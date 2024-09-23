const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
// Route to get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    // Use Restaurant model to fetch all restaurants
    const restaurants = await Restaurant.findAll();

    // Send restaurants as a JSON response
    res.json(restaurants);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});




module.exports = app;