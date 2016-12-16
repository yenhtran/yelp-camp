var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Riley wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.get('/', function(req, res){
    res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', function(req, res){
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
app.post('/campgrounds', function(req, res){
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
app.get('/campgrounds/new', function(req, res) {
   res.render('campgrounds/new'); 
});

//SHOW - show more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground ){
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           //render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});

// ===================
// COMMENTS ROUTES
// ===================

app.get('/campgrounds/:id/comments/new', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
           console.log(err);
       } else {
           res.render('comments/new', {campground: campground});
       }
    })
});

app.post('/campgrounds/:id/comments', function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           //create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   //connect new comment to campground
                   campground.comments.push(comment);
                   campground.save();
                   //redirect to campground show page
                   res.redirect('/campgrounds/' + campground._id);
               }
           });
       }
    });
})

// ===================
// AUTH ROUTES
// ===================

//show register form
app.get('/register', function(req, res) {
    res.render('register');
});

//handle sign up logic
app.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});

//show login form
app.get('/login', function(req, res) {
    res.render('login');
});
//handle sign up logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {
    
});

//logout route
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp Server has started!');
});