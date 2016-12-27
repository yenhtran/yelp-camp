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
router.post('/', isLoggedIn, function(req, res){
    var campName = req.body.name,
        campImage = req.body.image,
        campDescription = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCampground = { name: campName, image: campImage, description: campDescription, author: author};

    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreatedCampground);
            res.redirect('/campgrounds');
        }
    });
    
});

//NEW - show form to create new campground
router.get('/new', isLoggedIn, function(req, res) {
   res.render('campgrounds/new'); 
});

//SHOW - show more info about one campground
router.get('/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground ){
       if (err) {
           console.log(err);
       } else {
           //render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;
