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

// GET /restaurants/:id - Get a specific restaurant by ID
app.get('/restaurants/:id', async (req, res) => {
    const { id } = req.params;  // Get the ID from route params
    try {
        const restaurant = await Restaurant.findByPk(id);  // Find the restaurant by its primary key
        if (restaurant) {
            res.json(restaurant);  // Send the found restaurant as JSON
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// POST /restaurants - Add a new restaurant
app.post('/restaurants', async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);  // Create a new restaurant
        res.status(201).json(newRestaurant);  // Respond with the newly created restaurant
    } catch (error) {
        res.status(500).json({ error: 'Unable to create restaurant' });
    }
});

// PUT /restaurants/:id - Update an existing restaurant by ID
app.put('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            await restaurant.update(req.body);  // Update restaurant with the data from request body
            res.json(restaurant);  // Respond with the updated restaurant
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to update restaurant' });
    }
});

// DELETE /restaurants/:id - Delete a restaurant by ID
app.delete('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            await restaurant.destroy();  // Delete the restaurant
            res.json({ message: 'Restaurant deleted' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete restaurant' });
    }
});



module.exports = app;