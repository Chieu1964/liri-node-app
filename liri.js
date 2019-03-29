require('dotenv').config();
var keys = require("./keys.js");
var fs = require('fs');
var moment = require('moment');
// moment().format();
var request = require("request");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var inputs = process.argv[3];
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";
var artists = "";


if (action === "concert-this") {
	artists = inputs;
	getConcert(artists);
}
else if (action === "spotify-this-song") {
	// If the process.argv[3] value exists (same as option1 != null)
	if (inputs) {
		getSpotify(inputs);
	} else {
		// run default song
		getSpotify('Ace of Base');
	}
}
else if (action === "movie-this") {
	if (inputs) {
		var nodeArgs = process.argv.slice(2).join(' ');
		movieName = inputs;
		getMovie();
	} else {
		movieName = "Mr.Nobody";
		getMovie();
	}
} else if (action === "do-what-it-says") {
	doit();
}

// === function to get Concert =====
// id: codingbootcamp
// https://rest.bandsintown.com/artists/circa%20survive/events?app_id=codingbootcamp

function getConcert(inputs) {
	console.log(inputs);
	// var inputs = inputs.split(" ");
	var artists = "";
	for (var i = 0; i < inputs.length; i++) {
		if (artists === "") {
			artists = inputs[i]
		} else {
			artists += "%20" + inputs[i];
		}
	}

	var queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";
	console.log(queryUrl);

	axios.get(queryUrl).then(
		function (response) {
			console.log("Venue: ", response.data[0].venue.name);
			console.log("City: " + response.data[0].venue.city);
			console.log("Date: " + moment(response.data[0].datetime).format("YYYY/MM/DD"));
		}
	);
}

//== Function spotify-this-song =======

function getSpotify(inputs) {
	var spotify = new Spotify(keys.spotify);
	if (inputs) {
		spotify.search({
			type: 'track',
			query: inputs
		}, function (err, data) {
			//Let the user know if they encountered an error 
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			//Let the user know if they encountered an error 
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			// 1) Artist
			console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
			console.log('----------------');
			// 2) Song
			console.log("Song's name: " + data.tracks.items[0].name);
			console.log('----------------');
			// 3) A preview link of the song from Spotify 
			console.log("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
			console.log('----------------');
			// 4) Album that the song is from
			console.log("The album that the song is from: " + data.tracks.items[0].album.name);
			console.log('----------------');
		});

		//If no song is available then default to the "The Sign" by Ace of Base
	} else {
		inputs = 'Ace of Base';
	}
}

// === GET MOVIES =======

function getMovie() {

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=4b9f9b77";

	// This line is just to help us debug against the actual URL.
	// console.log(queryUrl);

	request(queryUrl, function (error, response, body) {

		// If the request is successful
		if (!error && response.statusCode === 200) {

			var omdb = JSON.parse(body, null, 2);

			console.log("Title of the movie: " + omdb.Title);
			console.log("Year the movie came out: " + omdb.Year);
			console.log("imdbRating: " + omdb.imdbRating);
			console.log("Rotten Tomatoes Rating of the movie: " + omdb.Ratings[1].Value);
			console.log("Language: " + omdb.Language);
			console.log("Plot: " + omdb.Plot);
			console.log("Actors: " + omdb.Actors);

		}

	});

}

//== Do-what-it-say==

function doit() {

	//Use fs to read info from a local file
	fs.readFile("random.txt", "utf-8", function (error, data) {

		// If the code experiences any errors it will log the error to the console.
		if (error) {
			return console.log(error);
		}

		// Then split the text into an array by commas (to make it more readable) and trim white spaces
		var dataArr = data.trim().split(",");

		// We will then re-display the content as an array for later use.
		console.log(dataArr);


	});

} 