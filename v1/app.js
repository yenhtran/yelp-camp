var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    
mongoose.connect('mongodb://localhost/yelp_camp');
    
app.use(bodyParser.urlencoded({extended: true}));
    
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

//SET UP CAMPGROUND MODEL
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//      { 
//          name: 'Granite Chief', 
//          image: "https://source.unsplash.com/0A_b9G-Rm6w"
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

app.get('/campgrounds/new', function(req, res) {
   res.render('new'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp Server has started!');
});