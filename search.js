window.addEventListener('DOMContentLoaded', (event) => {
      var search_str = location.search.substring(1);
      var tokens = search_str.split("=");
      console.log(tokens);
      if ((tokens[0] === "multi" || tokens[0] === "movie" || tokens[0] === "tv" || tokens[0] === "person") && (tokens[1] !== "")) {
            // do the search
            searchMedia(tokens[0], tokens[1], tokens[2]);
      } else {
            console.log("invalid");
      }

      // using a loader 
      var results = document.querySelector('.result');
      var loader = document.querySelector('.loader');
      var x = setInterval(function () {
            if (results.childElementCount > 0) {
                  loader.style.display = 'none';
                  clearInterval(x);
            } else {
                  loader.style.display = 'block';
            }
      }, 100);
});



var parent = document.querySelector(".result");
var genres;
var known_for;



function constructHTMLStr(element, media) {
      item_str = "";

      if (media == undefined) {
            // multi search 
            // get element.media_type
      } else {
            if (media === "movie") {
                  item_str = "<div class='item'>";
                  item_str += "<div class='poster'>";
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
                  item_str += "</div>"
                  item_str += "<div class='info'>";
                  item_str += "<div class='main-info'>";
                  item_str += "<h2>" + element.title + "</h2>";
                  item_str += "<div>";
                  item_str += "<span><i style='color: #5C7D76' class='fa fa-calendar'></i>" + element.release_date + "</span>";
                  item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
                  item_str += "</div>";
                  item_str += "<p><i style='color: #BE5300' class='fa fa-film'></i>" + genres.join(", ") + "</p>";
                  item_str += "</div>";
                  item_str += "<div class='extra-info'>";
                  item_str += "<p>" + element.overview + "</p>";
                  item_str += "<div>";
                  item_str += "<span><i style='color: #FFCB38' class='fa fa-star-o'></i>" + element.vote_average + "</span>";
                  item_str += "<span><i style='color: #FE316C'  class='fa fa-heart-o'></i>" + element.vote_count + "</span>";
                  item_str += "</div>";
                  item_str += "</div>";
                  item_str += "</div>";
                  item_str += "</div>";

            } else if (media === "tv") {
                  item_str = "<div class='item'>";
                  item_str += "<div class='poster'>";
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
                  item_str += "</div>"
                  item_str += "<div class='info'>";
                  item_str += "<div class='main-info'>";
                  item_str += "<h2>" + element.name + "</h2>";
                  item_str += "<div>";
                  item_str += "<span><i style='color: #5C7D76' class='fa fa-calendar'></i>" + element.first_air_date + "</span>";
                  item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
                  item_str += "</div>";
                  item_str += "<p><i style='color: #BE5300' class='fa fa-film'></i>" + genres.join(", ") + "</p>";
                  item_str += "</div>";
                  item_str += "<div class='extra-info'>";
                  item_str += "<p>" + element.overview + "</p>";
                  item_str += "<div>";
                  item_str += "<span><i style='color: #FFCB38' class='fa fa-star-o'></i>" + element.vote_average + "</span>";
                  item_str += "<span><i style='color: #FE316C'  class='fa fa-heart-o'></i>" + element.vote_count + "</span>";
                  item_str += "</div>";
                  item_str += "</div>";
                  item_str += "</div>";
                  item_str += "</div>";
            } else if (media === "person") {
                  // needs to be constructed a new html_Str
            }
      }

      return item_str;
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
      var final_str = "";
      data.results.forEach(element => {
            genres = element.genre_ids.map(function (id) {
                  return movie_genres[id];
            });
            final_str += constructHTMLStr(element, "movie");
      });
      parent.innerHTML = final_str;
}
function displayTvSearch(data) {
      console.log(data);
      var final_str = "";
      data.results.forEach(element => {
            genres = element.genre_ids.map(function (id) {
                  return tv_genres[id];
            });
            final_str += constructHTMLStr(element, "tv");
      });
      parent.innerHTML = final_str;
}
function displayPersonSearch(data) {
      console.log(data);
      var final_str = "";
      data.results.forEach(element => {
            final_str += constructHTMLStr(element, "person");
      });
      parent.innerHTML = final_str;
}