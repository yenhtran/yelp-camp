var mongoose = require('mongoose');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//SET UP CAMPGROUND MODEL
var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = mongoose.model('Campground', campgroundSchema);