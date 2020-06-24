
var base_url = "https://api.themoviedb.org/3";
var api_key = "?api_key=89affa2cbcf8890a6f1ad6287012fd67";
var query_url;

var base_image_url = "https://image.tmdb.org/t/p";
// searchMedia(tv/movie) - poster_path, (person) - profile_path, (multi) - decide according to media_type(person, movie, tv)
// mediaDetails(tv/movie/tv_season) - poster_path, (person) - profile_path
// getSimilarMedia(tv/movie) - poster_path
// discoverMedia(tv/movie) - poster_path

var movie_genres = {};
var tv_genres = {};
var countries = {};
var languages = {};

options = {
      query: function (str) {
            return "query=" + str;
      },
      page: function (pageNo) {
            return "page=" + pageNo;
      },
      cast: function (castIds) {
            return "with_cast=" + castIds.join();
      },
      genres: function (genreIds) {
            return "with_genres=" + genreIds.join();
      },
      release_year: function (year) {
            var date_beg = year + "-01-01";
            var date_end = year + "-12-31";
            return "primary_release_date.gte=" + date_beg + "&primary_release_date.lte=" + date_end;
      }
}

orderby = {
      popularity: "sort_by=popularity.desc",
      vote_count: "sort_by=vote_count.desc",
      revenue: "sort_by=revenue.desc",
}

function getQueryUrl(action) {
      query_url = base_url + action + api_key;
      return function inner(args) {
            args.push("language=en-US");
            query_url += "&" + args.join("&");
            return query_url;
      }
}

function checkResponse(response) {
      if (!response.ok) {
            throw Error(response.status);
      }
      return response;
}
function fetchData(query_url, responseFunction) {
      fetch(query_url)
            .then(checkResponse)
            .then(function (response) {
                  console.log("All Ok!");
                  return response.json();
            })
            .then(responseFunction)
            .catch(function (error) {
                  console.log(error);
            });
}


function fillGenresMovie(data) {
      data.genres.forEach(function (element) {
            movie_genres[element.id] = element.name;
      });
      console.log(movie_genres);
}
function fillGenresTv(data) {
      data.genres.forEach(function (element) {
            tv_genres[element.id] = element.name;
      });
      console.log(tv_genres);
}
function getAllGenres() {
      if (Object.keys(movie_genres).length === 0 && movie_genres.constructor === Object) {
            query_url = getQueryUrl("/genre/movie/list")([]);
            fetchData(query_url, fillGenresMovie);
      }
      if (Object.keys(tv_genres).length === 0 && tv_genres.constructor === Object) {
            query_url = getQueryUrl("/genre/tv/list")([]);
            fetchData(query_url, fillGenresTv);
      }
}
// getAllGenres();

function fillLanguages(data) {
      data.forEach(element => {
            languages[element.iso_639_1] = element.english_name;
      });
      console.log(languages);
}
function getLanguages() {
      if (Object.keys(languages).length === 0 && tv_genres.constructor === Object) {
            query_url = getQueryUrl("/configuration/languages")([]);
            fetchData(query_url, fillLanguages)
      }
}
// getLanguages();


function displayMovieDetails(data) {
      console.log(data);
      /*
            backdrop_path: "/vbY95t58MDArtyUXUIb8Fx1dCry.jpg"
            genres: (3) [{…}, {…}, {…}]
            id: 1726
            original_language: "en"
            overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
            poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
            release_date: "2008-04-30"
            runtime: 126
            tagline: "Heroes aren't born. They're built."
            title: "Iron Man"
            vote_average: 7.6
      */
}
function displayTvShowDetails(data) {
      console.log(data);
      /*
            backdrop_path: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg"
            episode_run_time: [60]
            first_air_date: "2011-04-17"
            genres: (2) [{…}, {…}]
            id: 1399
            languages: ["en"]
            name: "Game of Thrones"
            number_of_episodes: 73
            number_of_seasons: 8
            original_language: "en"
            original_name: "Game of Thrones"
            overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond."
            poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
            seasons: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            vote_average: 8.3
      */
}
function displayPersonDetails(data) {
      console.log(data);
      /* 
            adult: false
            biography: "An American actor and filmmaker. He has been nominated for three Academy Awards and has won three Golden Globe Awards. He started his career at age 19 in the 1981 film Endless Love. After portraying supporting roles in Taps (1981) and The Outsiders (1983), his first leading role was in Risky Business, released in August 1983. Cruise became a full-fledged movie star after starring as Pete "Maverick" Mitchell in Top Gun (1986). He has since 1996 been well known for his role as secret agent Ethan Hunt in the Mission: Impossible film series. One of the biggest movie stars in Hollywood, Cruise has starred in many successful films, including The Color of Money (1986), Cocktail (1988), Rain Man (1988), Born on the Fourth of July (1989), Far and Away(1992), A Few Good Men (1992), The Firm (1993), Interview with the Vampire: The Vampire Chronicles (1994), Jerry Maguire (1996), Eyes Wide Shut (1999), Magnolia (1999), Vanilla Sky (2001), Minority Report (2002),The Last Samurai (2003), Collateral (2004), War of the Worlds (2005), Lions for Lambs (2007), Valkyrie (2008), Knight and Day (2010), Jack Reacher (2012), Oblivion (2013), and Edge of Tomorrow (2014). In 2012, Cruise was Hollywood's highest-paid actor. Fifteen of his films grossed over $100 million domestically; twenty-one have grossed in excess of $200 million worldwide. Cruise is known for his support for the Church of Scientology and its affiliated social programs."
            birthday: "1962-07-03"
            id: 500
            known_for_department: "Acting"
            name: "Tom Cruise"
            place_of_birth: "Syracuse, New York, USA"
            profile_path: "/rZXZWW00hiZyVVBtXKBozAAq0Cf.jpg"
      */
}
function displayTvShowSeasonDetail(data) {
      console.log(data);
      /* 
            air_date: "2016-04-24"
            episodes: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                  air_date: "2016-04-24"
                  name: "The Red Woman"
                  overview: "The fate of Jon Snow is revealed. Daenerys meets a strong man. Cersei sees her daughter once again."
                  season_number: 6
                  still_path: "/wUT1usesyneAJee4wzxxu6pfOKY.jpg"
                  vote_average: 7.193
            name: "Season 6"
            overview: "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south."
            poster_path: "/p1udLh0gfqyZFmXBGa393gk8go5.jpg"
      */
}
function getMediaDetails(media, media_id, season_id) {
      query_url = getQueryUrl("/" + media + "/" + media_id)([]);
      if (media === "movie") {
            fetchData(query_url, displayMovieDetails);
      } else if (media === "tv") {
            fetchData(query_url, displayTvShowDetails);
      } else if (media === "person") {
            fetchData(query_url, displayPersonDetails)
      } else if (media === "tv_season") {
            query_url = getQueryUrl("/tv/" + media_id + "/season/" + season_id)([]);
            fetchData(query_url, displayTvShowSeasonDetail);
      }
}
// getMediaDetails("movie", 1726);
// getMediaDetails("tv", 1399);
// getMediaDetails("person", 500);
// getMediaDetails("tv_season", 1399, 6);

function getSearchString(media) {
      var keywords = media.split(" ");
      return keywords.join("+");
}
function displayMultiSearch(data) {
      console.log(data);
      /*
      if(media_type == "tv") 
            displayTvSearch(data)

      if(media_type === "movie")
            displayPersonSearch(data)

      if(media_type === "person")
            displayPeresonSerach(data)
      */
}
function displayMovieSearch(data) {
      console.log(data);
      /*
      genre_ids: (3) [28, 12, 878]
      id: 1726
      original_language: "en"
      overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
      poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
      release_date: "2008-04-30"
      title: "Iron Man"
      */
}
function displayTvSearch(data) {
      console.log(data);
      /* 
      first_air_date: "2012-10-10"
      genre_ids: (4) [80, 18, 9648, 10759]
      id: 1412
      name: "Arrow"
      original_language: "en"
      overview: "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow."
      poster_path: "/gKG5QGz5Ngf8fgWpBsWtlg5L2SF.jpg"
      */
}
function displayPersonSearch(data) {
      console.log(data);
      /* 
      id: 1136406
      known_for: (3) [{…}, {…}, {…}] - just get the title of the movies 
      known_for_department: "Acting"
      name: "Tom Holland"
      profile_path: "/4eiFdjEtqb2pnWX6z98ADcYD9zV.jpg"
      */
}
function searchMedia(media, query_str, pageNo) {
      // filters(Array) - primary release data, page
      var filters = [
            options.query(getSearchString(query_str)),
            orderby.popularity,
            options.page(pageNo)
      ]
      query_url = getQueryUrl("/search/" + media)(filters);

      if (media === "multi") {
            fetchData(query_url, displayMultiSearch);
      } else if (media === "movie") {
            fetchData(query_url, displayMovieSearch);
      } else if (media === "person") {
            fetchData(query_url, displayPersonSearch);
      } else if (media === "tv") {
            fetchData(query_url, displayTvSearch);
      }
}
// searchMedia("movie", "iron man", 1);
// searchMedia("tv", "arrow", 1);
// searchMedia("person", "tom holland");
// searchMedia("multi", "robert", 1);


// this option is visible of the detail page of a movie/tv show
function getSimilarMedia(media, id) {
      query_url = getQueryUrl("/" + media + "/" + id + "/similar")([orderby.popularity]);
      if (media === "movie") {
            fetchData(query_url, displayMovieSearch);
      } else if (media === "tv") {
            fetchData(query_url, displayTvSearch);
      }
}
// getSimilarMedia("movie", 1726);
// getSimilarMedia("tv", 1399);


function discoverMedia(media, filters) {
      query_url = getQueryUrl("/discover/" + media)(filters);
      if (media === "movie") {
            fetchData(query_url, displayMovieSearch);
      } else if (media === "tv") {
            fetchData(query_url, displayTvSearch);
      }
}
// discoverMedia("movie", [options.page(5)]);
// discoverMedia("tv", [options.page(5)]);      

// most liked 
// discoverMedia("movie", [orderby.vote_count, options.page(2)]);
// discoverMedia("tv", [orderby.vote_count, options.page(1)]);

// highest grossing movies 
// discoverMedia("movie", [orderby.revenue, options.page(2)]);

// with cast(only for movies)
// discoverMedia("movie", [options.cast([3223, 16828]), orderby.vote_count, options.page(1)]);

// with genres
// discoverMedia("movie", [options.genres([35, 12, 28]), orderby.vote_count, options.page(3)]);
// use the tv genres only
// discoverMedia("tv", [options.genres([878]), orderby.vote_count, options.page(2)]);

// release year
// discoverMedia("movie", [options.release_year(2019), orderby.vote_count]);