var parent = document.querySelector(".result");
var genres;
var QueryStr;

window.addEventListener('DOMContentLoaded', (event) => {
      var search_str = location.search.substring(1);
      var tokens = search_str.split("=");
      console.log(tokens);
      if(tokens[0] == undefined || tokens[1] == undefined || tokens[2] == undefined || tokens[2] == "") {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">Page not found!</h1>';
            return;
      }
      if (tokens[0] === "multi" || tokens[0] === "movie" || tokens[0] === "tv" || tokens[0] === "person") {
            // do the search
            QueryStr = tokens[1];
            // if token[2](page of the search result) is tampered - page 1 is displayed always
            searchMedia(tokens[0], tokens[1], tokens[2]);
      } else {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">Page not found!</h1>';
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

function displayMultiSearch(data) {
      if(data.total_results == 0) {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">No results found!</h1>';
      }
      var final_str = "";
      data.results.forEach(element => {
            final_str += constructHTMLStr(element);
      });
      parent.innerHTML = final_str + getFooter();

      document.querySelector('footer span').textContent = data.page;

      var prevBtn = document.querySelector('.prev-btn');
      var nextBtn = document.querySelector('.next-btn');
      nextBtn.addEventListener('click', function() {
            if(data.page < data.total_pages) {
                  window.location.assign('search_results.html?multi=' + QueryStr + '=' + (data.page+1));
            } else {
                  alert("This is the last page!")
            }
      });
      prevBtn.addEventListener('click', function() {
            if(data.page >= 2) {
                  window.location.assign('search_results.html?multi=' + QueryStr + '=' + (data.page - 1));
            } else {
                  alert("This is the first page!");
            }
      });
}
function displayMovieSearch(data) {
      if(data.total_results == 0) {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">No results found!</h1>';
      }
      var final_str = "";
      data.results.forEach(element => {
            genres = element.genre_ids.map(function (id) {
                  return movie_genres[id];
            });
            final_str += constructHTMLStr(element, "movie");
      });
      parent.innerHTML = final_str + getFooter();

      document.querySelector('footer span').textContent = data.page;

      var prevBtn = document.querySelector('.prev-btn');
      var nextBtn = document.querySelector('.next-btn');
      nextBtn.addEventListener('click', function() {
            if(data.page < data.total_pages) {
                  window.location.assign('search_results.html?movie=' + QueryStr + '=' + (data.page + 1));
            } else {
                  alert("This is the last page!");
            }
      });
      prevBtn.addEventListener('click', function() {
            if(data.page >= 2) {
                  window.location.assign('search_results.html?movie=' + QueryStr + '=' + (data.page - 1));
            }else {
                  alert("This is the first page!");
            }
      });
}
function displayTvSearch(data) {
      if(data.total_results == 0) {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">No results found!</h1>';
      }
      var final_str = "";
      data.results.forEach(element => {
            genres = element.genre_ids.map(function (id) {
                  return tv_genres[id];
            });
            final_str += constructHTMLStr(element, "tv");
      });
      parent.innerHTML = final_str + getFooter();

      document.querySelector('footer span').textContent = data.page;

      var prevBtn = document.querySelector('.prev-btn');
      var nextBtn = document.querySelector('.next-btn');
      nextBtn.addEventListener('click', function() {
            if(data.page < data.total_pages) {
                  window.location.assign('search_results.html?tv=' + QueryStr + '=' + (data.page + 1));
            }else {
                  alert("This is the last page!");
            }
      });
      prevBtn.addEventListener('click', function() {
            if(data.page >= 2) {
                  window.location.assign('search_results.html?tv=' + QueryStr + '=' + (data.page - 1));
            }else {
                  alert("This is the first page!");
            }
      });
}
function displayPersonSearch(data) {
      if(data.total_results == 0) {
            document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">No results found!</h1>';
      }
      var final_str = "";
      data.results.forEach(element => {
            final_str += constructHTMLStr(element, "person");
      });
      parent.innerHTML = final_str + getFooter();

      document.querySelector('footer span').textContent = data.page;

      var prevBtn = document.querySelector('.prev-btn');
      var nextBtn = document.querySelector('.next-btn');
      nextBtn.addEventListener('click', function() {
            if(data.page < data.total_pages) {
                  window.location.assign('search_results.html?person=' + QueryStr + '=' + (data.page + 1));
            } else {
                  alert("This is the last page");
            }
      });
      prevBtn.addEventListener('click', function() {
            if(data.page >= 2) {
                  window.location.assign('search_results.html?person=' + QueryStr + '=' + (data.page - 1));
            } else {
                  alert("This is the first page!");
            }
      });
}