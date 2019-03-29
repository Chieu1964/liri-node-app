# Description:

LIRI is a Language Interpretation and Recognition Interface, which is a command line node app that takes in parameters and gives you back data.

# Instructions
1) "node liri.js concert-this" will search the Bands in Town Artist Events API
for an artist and render the following information about each event to the terminal:
* Name of the venue
* Venue location
* Date of the Event

2) "node liri.js spotify-this-song" will show the following information about the song in your terminal window: 
   * Artist(s), 
   * The song's name, 
   * A preview link of the song from Spotify, 
   * The album that the song is from  
   * If no song is provided then your program will default to "The Sign" by Ace of Base.
3) "node liri.js movie-this" will display the following information to your terminal window:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
4) "node liri.js do-what-it-says" will use the fs Node package to  take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

# Usage
    Terminal / Bash
  - node liri.js concert-this
  - node liri.js spotify-this-song
  - node liri.js movie-this
  - node liri.js do-what-it-says

