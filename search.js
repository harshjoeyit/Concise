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

function displayMultiSearch(data) {
      console.log(data);
      var final_str = "";
      data.results.forEach(element => {
            final_str += constructHTMLStr(element);
      });
      parent.innerHTML = final_str;
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

function constructHTMLStr(element, media) {
      item_str = "";

      if (media == undefined) {
            media = element.media_type;
      } 

      if (media === "movie") {
            item_str = "<div class='item'>";
            item_str += "<div class='poster'>";
            if (element.poster_path == null) {
                  item_str += "<img src=/images/media.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
            }
            item_str += "</div>"
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.title + "</h2>";
            item_str += "<div>";
            item_str += "<span><i style='color: #5C7D76' class='fa fa-calendar'></i>" + element.release_date + "</span>";
            item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
            item_str += "</div>";
            genres = element.genre_ids.map(function (id) {
                  return movie_genres[id];
            });
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
            if (element.poster_path == null) {
                  item_str += "<img src=/images/media.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
            }
            item_str += "</div>"
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.name + "</h2>";
            item_str += "<div>";
            item_str += "<span><i style='color: #5C7D76' class='fa fa-calendar'></i>" + element.first_air_date + "</span>";
            item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
            item_str += "</div>";
            genres = element.genre_ids.map(function (id) {
                  return tv_genres[id];
            });
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
            item_str = "<div class='item'>";
            item_str += "<div class='poster'>";
            if (element.profile_path == null) {
                  item_str += "<img src=/images/user.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.profile_path + " alt='poster' >";
            }
            item_str += "</div>"
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.name + "</h2>";
            item_str += "<div>";
            item_str += "<span><i style='color: #1295FF' class='fa fa-dot-circle-o'></i>" + element.known_for_department + "</span>";
            item_str += "<span><i style='color: #AE3FFF' class='fa fa-thumbs-up'></i>" + element.popularity + "</span>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "<div class='known-for'>";
            element.known_for.forEach(project => {
                  var proj_str = "<div class='project'>";
                  if (project.poster_path == null) {
                        proj_str += "<img src=/images/media.png alt='poster'>"
                  } else {
                        proj_str += "<img src=https://image.tmdb.org/t/p/w300" + project.poster_path + " alt='poster' >";
                  }
                  if (project.media_type == "movie") {
                        proj_str += "<p>" + project.title + "</p>";
                  } else {
                        proj_str += "<p>" + project.name + "</p>";
                  }
                  proj_str += "</div>";
                  item_str += proj_str;
            });
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";
      }

      return item_str;
}