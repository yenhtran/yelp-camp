var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    campgrounds = [
        { name: 'Samon Creek', image: "https://source.unsplash.com/sK1hW5knKkw/400X300"},
        { name: 'Granite Chief', image: "https://source.unsplash.com/63Znf38gnXk/400X300"},
        { name: 'Mountain Goat Rest', image: "https://source.unsplash.com/yOujaSETXlo/400X300"}
    ];
    
app.use(bodyParser.urlencoded({extended: true}));
    
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    var campName = req.body.name,
        campImage = req.body.image,
        newCampground = { name: campName, image: campImage };
    
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
   res.render('new'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp Server has started!');
});