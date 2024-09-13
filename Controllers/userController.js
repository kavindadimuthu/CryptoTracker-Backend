const User = require('../Models/user.js');
const mongoose = require('mongoose');

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the collection
        console.log("hi, got there");
        res.status(200).json(users);
        console.log(users)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
