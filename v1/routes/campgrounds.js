var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground');
    
//INDEX - show all campgrounds
router.get('/', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
           res.render('campgrounds/index', {campgrounds: allCampgrounds}); 
        }
    });
});

//NEW - add new campgrounds to DB
router.post('/', function(req, res){
    var campName = req.body.name,
        campImage = req.body.image,
        campDescription = req.body.description,
        newCampground = { name: campName, image: campImage, description: campDescription};
    
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});

//NEW - show form to create new campground
router.get('/new', function(req, res) {
   res.render('campgrounds/new'); 
});

//SHOW - show more info about one campground
router.get('/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground ){
       if (err) {
           console.log(err);
       } else {
           //console.log(foundCampground);
           //render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});

module.exports = router;
