var parent = document.querySelector(".result");
var disc_filters;
var disc_media;
var disc_category;
var genres;
var tokens;

window.addEventListener('DOMContentLoaded', (event) => {
      var disc_str = location.search.substring(1);
      // when ?disc_str is missing
      if (disc_str === "") {
            noResults();
            return;
      }
      
      tokens = disc_str.split('&');
      console.log(tokens);

      if ((tokens[0] !== "movie" && tokens[0] !== "tv") || tokens.length == 1 || tokens[2] === "") {
            noResults();
            return;
      }

      disc_media = tokens[0];
      disc_category = tokens[1];

      if (tokens[0] === "movie") {
            if (tokens[1] === "most-liked") {
                  // tokens[2] is page number 
                  disc_filters = [orderby.vote_count, options.page(tokens[2])];
                  discoverMedia("movie", disc_filters);

            } else if (tokens[1] === "highest-grossing") {
                  disc_filters = [orderby.revenue, options.page(tokens[2])];
                  discoverMedia("movie", disc_filters);

            } else if (tokens[1] === "with-genres") {
                  // token[2] becomes the genre list seperated by commas
                  // token[3] - page number 
                  console.log('hello genres m');
                  if (tokens[2] === undefined || tokens[2] === "" || tokens[3] === undefined || tokens[3] === "") {
                        noResults();
                        return;
                  } else {
                        disc_filters = [options.genres(tokens[2].split(',')), orderby.vote_count, options.page(tokens[3])];
                        discoverMedia("movie", disc_filters);
                  }
            } else if (tokens[1] === "with-year") {
                  if (tokens[2] === undefined || tokens[2] === "" || tokens[3] === undefined || tokens[3] === "") {
                        noResults();
                        return;
                  } else {
                        // code for getting the movie with release year
                        disc_filters = [options.release_year(tokens[2]), orderby.vote_count, options.page(tokens[3])];
                        discoverMedia("movie", disc_filters);
                  }
            } else if (tokens[1] === "select-genres") {
                  createInputForGenres();
            } else {
                  noResults();
                  return;
            }

      } else if (tokens[0] === "tv") {
            if (tokens[1] === "most-liked") {
                  disc_filters = [orderby.vote_count, options.page(tokens[2])];
                  discoverMedia("tv", disc_filters);
            } else if (tokens[1] === "with-genres") {
                  // token[2] becomes the genre list seperated by commas
                  // token[3] - page number
                  console.log('hello genres t');
                  if (tokens[2] === undefined || tokens[2] === "" || tokens[3] === undefined || tokens[3] === "") {
                        noResults();
                        return;
                  } else {
                        disc_filters = [options.genres(tokens[2].split(',')), orderby.vote_count, options.page(tokens[3])];
                        discoverMedia("tv", disc_filters);
                  }
            } else if (tokens[1] === "select-genres") {
                  createInputForGenres();
            } else {
                  noResults();
                  return;
            }

      } else {
            // this condition may not be needed
            // beacause there is a check for tokens[0] 
            console.log("invalid media");
            return;
      }

      // using a loader 
      var results = document.querySelector('.result');
      var loader = document.querySelector('.loader');
      var x = setInterval(function () {
            if (results.childElementCount > 0) {
                  loader.style.display = 'none';
                  clearInterval(x);
                  if(tokens[1] === "select-genres") {
                        addListeerToSubmitButton();
                  }
            } else {
                  loader.style.display = 'block';
            }
      }, 100);
});

function noResults() {
      document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">Page not found!</h1>';
}

function displayDiscoverResults(data) {
      // console.log(data);
      if (data.total_results == 0) {
            noResults();
      }
      var final_str = "";
      if (disc_media === "movie") {
            data.results.forEach(element => {
                  genres = element.genre_ids.map(function (id) {
                        return movie_genres[id];
                  });
                  final_str += constructHTMLStr(element, "movie");
            });
      } else {
            data.results.forEach(element => {
                  genres = element.genre_ids.map(function (id) {
                        return tv_genres[id];
                  });
                  final_str += constructHTMLStr(element, "tv");
            });
      }
      parent.innerHTML = final_str + getFooter();

      document.querySelector('footer span').textContent = data.page;

      var prevBtn = document.querySelector('.prev-btn');
      var nextBtn = document.querySelector('.next-btn');
      nextBtn.addEventListener('click', function () {

            if (data.page < data.total_pages) {
                  tokens.pop();
                  window.location.assign('discover_results.html' + '?' + tokens.join('&').substring(-1) + '&' + (data.page + 1));
            } else {
                  alert("This is the last page!");
            }
      });
      prevBtn.addEventListener('click', function () {
            if (data.page >= 2) {
                  tokens.pop();
                  window.location.assign('discover_results.html' + '?' + tokens.join('&') + '&' + (data.page - 1));
            } else {
                  alert("This is the first page!");
            }
      });
}


function createInputForGenres() {
      var query_url = getQueryUrl("/genre/" + disc_media + "/list")([]);

      fetchData(query_url, function (data) {
            var str = "";
            str += "<div class='genre-form'>";
            data.genres.forEach(element => {
                  str += "<div class='input-box'>";
                  str += "<label><input type='checkbox' value=" + element.id + ">" + element.name + "</label>";
                  str += "</div>";
            });

            str += "<div class='submit-genres'> <button> Find " + ((disc_media === "movie") ? "Movies" : "TV Shows") + "</button>";
            str += "</div>";
            parent.innerHTML = str;
      });
}


function addListeerToSubmitButton() {
      var submitBtn = document.querySelector('.submit-genres>button');
      var checkboxes = document.querySelectorAll('.genre-form > div.input-box > label > input');

      submitBtn.addEventListener('click', function () {
            var checked = [];
            for (var i = 0; i < checkboxes.length; i++) {
                  if (checkboxes[i].checked === true) {
                        checked.push(checkboxes[i].value);
                  }
            }
            
            if(checked.length === 0) {
                  alert("At least one genre must be selected!")
            } else {
                  console.log(checked.join(','));
                  window.location.assign('discover_results.html?' + disc_media + '&with-genres&' + checked.join(',') + "&1");
            }
      })
}