var input = process.argv[2];

var definer = process.argv.slice(3).join(" ");

var newMethod = "Billy";


require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment")

console.log(keys)

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify)

function spotifying() {
 
    spotify.search({ type: 'track', query: definer }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
        var tracksArray = data.tracks.items;
        var length = tracksArray.length;
        var i = 0;
        while (i < length) {
        var artist = data.tracks.items[i].artists[0].name;
        var name = data.tracks.items[i].name;
        var album = data.tracks.items[i].album.name;
        var previewUrl = data.tracks.items[i].preview_url;

            console.log(" Artist: " + artist,'\n', "Track: " + name,'\n', "Album: " + album,'\n',"Preview URL: " + previewUrl);
            console.log("-------------------------------------------------------");
            i++
        };
        
       
    });

};

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + definer + "/events?app_id=codingbootcamp")
    .then(function(response) {
        var i = 0;
        while (i < 6) {
            var country = response.data[i].venue.country
            var city = response.data[i].venue.city
            var venueName = response.data[i].venue.name
            // var date = response.data[0].datetime;
            // var dateFormat = "MM/DD/YYYY";
            // var convertedDate = moment(date, dateFormat);
            console.log("Country: " + country + ", City: " + city + ", Venue: " + venueName);
            //console.log(convertedDate);
            console.log("-----------------------------------------------------")
            i++
        };
    });

};

function movie() {
    
    var queryLink = "http://www.omdbapi.com/?t=" + definer + "&y=&plot=short&apikey=trilogy"
    console.log(queryLink)
    axios.get(queryLink)
    .then(function(response) {
        var title = response.data.Title;
        var rating = response.data.Rated;
        var year = response.data.Year;
        var imbdRating = response.data.imbdRating;
        var country = response.data.Country;
        var language = response.data.language;
        var plot = response.data.Plot;
        console.log(" Title: " + title,'\n',"Rated: " + rating,'\n',"Year: " + year,'\n',"IMBD Rating: " + imbdRating,'\n',"Country: " + country,'\n',"Language: " + language,'\n',"Plot: " + plot);
    });

};


function random() {

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

    
        if (error) {
        return console.log(error)
        }


        var newData = data.split(",");

        console.log(newData[0]);

        newMethod = newData[0];

        definer = newData[1];
        

        runMethod();


    });
};


function runMethod() {

    var method = " ";

    if (newMethod !== "Billy") {
        method = newMethod
    } else {
        method = input
    }

    switch (method) {
        case "concert-this":
            concert();
            break;

        case "spotify-this-song":
            spotifying();
            break;

        case "movie-this":
            movie();
            break;

        case "do-what-it-says":
            random();
            break;

        default:
            break;
    };

};


runMethod();
