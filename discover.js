var parent = document.querySelector(".result");
var disc_filters;
var disc_media;
var genres;
var tokens;

window.addEventListener('DOMContentLoaded', (event) => {
      var disc_str = location.search.substring(1);
      // when ?disc_str is missing
      if(disc_str === "") {
            noResults();
            return;
      }
      
      tokens = disc_str.split('&');
      console.log(tokens);

      if((tokens[0] !== "movie" && tokens[0] !== "tv") || tokens.length == 1 || tokens[2] === "") {
            noResults();
            return;
      }
      
      if(tokens[0] === "movie") {
            disc_media = "movie";

            if(tokens[1] === "most-liked") {
                  // tokens[2] is page number 
                  disc_filters = [orderby.vote_count, options.page(tokens[2])];
                  discoverMedia("movie", disc_filters);
            
            } else if(tokens[1] === "highest-grossing") {
                  disc_filters = [orderby.revenue, options.page(tokens[2])];
                  discoverMedia("movie", disc_filters);

            } else if(tokens[1] === "with-genres") {
                  // token[2] becomes the genre list seperated by commas
                  // token[3] - page number 
            } else if(tokens[1] === "with-year") {
                  // token[2] becomes the year
                  // token[3] - page number 
            } else {
                  noResults();
                  return;
            }

      } else if(tokens[0] === "tv") {
            disc_media = "tv";

            if(tokens[1] === "most-liked") {
                  disc_filters = [orderby.vote_count, options.page(tokens[2])];
                  discoverMedia("tv", disc_filters);
            } else if(tokens[1] === "with-genres") {
                  // token[2] becomes the genre list seperated by commas
                  // token[3] - page number
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
      if(data.total_results == 0) {
            noResults();
      }
      var final_str = "";
      if(disc_media === "movie") {
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
      nextBtn.addEventListener('click', function() {
            if(data.page < data.total_pages) {
                  window.location.assign('discover_results.html'+'?'+tokens[0]+'&'+tokens[1]+'&'+(data.page + 1));
            } else {
                  alert("This is the last page!");
            }
      });
      prevBtn.addEventListener('click', function() {
            if(data.page >= 2) {
                  window.location.assign('discover_results.html'+'?'+tokens[0]+'&'+tokens[1]+'&'+(data.page - 1));
            }else {
                  alert("This is the first page!");
            }
      });
}