var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground');
    
mongoose.connect('mongodb://localhost/yelp_camp');
    
app.use(bodyParser.urlencoded({extended: true}));
    
app.set('view engine', 'ejs');


// Campground.create(
//      { 
//          name: 'Granite Chief', 
//          image: "https://source.unsplash.com/0A_b9G-Rm6w",
//          description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite.'
//      }, function(err, campground){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('NEWLY CREATED CAMPGROUND')
//             console.log(campground);
//         }
//     });
    
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
           res.render('campgrounds', {campgrounds: allCampgrounds}); 
        }
    });
});

app.post('/campgrounds', function(req, res){
    var campName = req.body.name,
        campImage = req.body.image,
        newCampground = { name: campName, image: campImage };
    
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
app.get('/campgrounds/new', function(req, res) {
   res.render('new'); 
});

//SHOW - show more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground ){
       if (err) {
           console.log(err);
       } else {
           //render show template with that campground
           res.render('show', {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp Server has started!');
});