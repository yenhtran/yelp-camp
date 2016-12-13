var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    data = [
        {   
            name: "Cloud's Rest", 
            image: "https://source.unsplash.com/r0q06hjTgOc",
            description: "blah blah blah"
        },
        {
            name: "Jungle's Point", 
            image: "https://source.unsplash.com/i9FLJwYhVQs",
            description: "Vape jean shorts mlkshk etsy street art. Pitchfork next level gochujang, viral yr microdosing salvia offal poutine church-key asymmetrical street art cardigan. Intelligentsia la croix hexagon, offal biodiesel woke jianbing bespoke "
        },
        {
            name: "Little Fire", 
            image: "https://source.unsplash.com/5Rhl-kSRydQ",
            description: "Banh mi coloring book master cleanse biodiesel af. Ramps copper mug tbh, prism coloring book retro butcher mlkshk yuccie jianbing ethical bitters godard. Food truck seitan selfies aesthetic cardigan pickled ugh banjo. VHS church-key umami mlkshk. Normcore polaroid mumblecore, squid keytar locavore lyft fingerstache crucifix hot chicken heirloom air plant. Hammock sustainable green juice, yuccie fap succulents prism sartorial kale chips live-edge. Readymade distillery four dollar toast disrupt roof party iceland."
        },
        {
            name: "Sleepy Giant", 
            image: "https://source.unsplash.com/sK1hW5knKkw",
            description: "Neutra succulents gluten-free, normcore hella lomo dreamcatcher sustainable tousled selfies edison bulb YOLO artisan food truck."
        },
        {
            name: "Mountain Crow", 
            image: "https://source.unsplash.com/8i-LoPR-Jmc",
            description: "Neutra succulents gluten-free, normcore hella lomo dreamcatcher sustainable tousled selfies edison bulb YOLO artisan food truck. Aesthetic coloring book edison bulb, neutra man braid cliche microdosing chicharrones listicle forage irony locavore seitan subway tile. Air plant hoodie dreamcatcher umami pour-over schlitz craft beer, vinyl williamsburg cray lumbersexual distillery intelligentsia. Air plant cornhole mixtape, YOLO hot chicken lo-fi vaporware shoreditch gochujang PBR&B. Cardigan venmo pabst edison bulb. Normcore cliche edison bulb, messenger bag four loko iPhone blog four dollar toast forage aesthetic tumeric kickstarter DIY woke fap. Succulents pop-up gochujang bicycle rights mustache actually. Godard tumeric lyft post-ironic whatever. Enamel pin paleo hexagon before they sold out activated charcoal. Aesthetic activated charcoal ethical banjo meh pickled. Shoreditch austin bitters, kogi hexagon post-ironic 8-bit ennui waistcoat. Art party kinfolk hashtag man bun, typewriter drinking vinegar poutine selvage PBR&B photo booth VHS pour-over kombucha. Tbh hell of next level, williamsburg truffaut wolf trust fund normcore austin fixie put a bird on it etsy ethical hashtag. Knausgaard heirloom hell of mixtape slow-carb pork belly."
        }
    ];
  
function seedDB() {
    //CLEARS OUT ALL EXISITING CAMPGROUNDS
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
        //ADDS A FEW CAMPGROUND
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err){
                    console.log(err);
                } else {
                    console.log('added a campground');
                    //CREATE A COMMENT
                    Comment.create({
                        text: 'This place is great, but I wish there was internet',
                        author: "Homer"
                    }, function(err, comment){
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Created new comment');
                        }
                    });
                }
            });
        });
    });
}  

module.exports = seedDB;