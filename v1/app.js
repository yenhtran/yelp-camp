var express = require('express'),
    app = express();
    
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        { name: 'Samon Creek', image: "https://source.unsplash.com/sK1hW5knKkw/400X300"},
        { name: 'Granite Chief', image: "https://source.unsplash.com/63Znf38gnXk/400X300"},
        { name: 'Mountain Goat Rest', image: "https://source.unsplash.com/yOujaSETXlo/400X300"}];
        
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp Server has started!');
});