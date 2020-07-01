var parent = document.querySelector(".result");
var tokens;
var detailMedia;
var mediaId;
var seasonId;

window.addEventListener('DOMContentLoaded', (event) => {
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

      var detail_str = location.search.substring(1);
      if (detail_str === "") {
            noResults();
            return;
      }

      tokens = detail_str.split('&');
      console.log(tokens);

      if ((tokens[0] !== "movie" && tokens[0] !== "tv" && tokens[0] !== "person" && tokens[0] !== "tv_season") || tokens.length == 1 || tokens[2] === "") {
            noResults();
            return;
      }

      detailMedia = tokens[0];
      mediaId = tokens[1];

      if (detailMedia === "tv_season") {
            if (tokens[2] === undefined || tokens[2] === "") {
                  noResults();
                  return;
            }
            seasonId = tokens[2];
      }
      getMediaDetails();
});

function getMediaDetails() {
      if (detailMedia === "tv_season") {
            query_url = getQueryUrl("/tv/" + mediaId + "/season/" + seasonId)([]);
      } else {
            query_url = getQueryUrl("/" + detailMedia + "/" + mediaId)([]);
      }
      fetchData(query_url, function (data) {
            parent.innerHTML = constructMediaDetailsHTMLStr(data);
            if (detailMedia === "tv") {
                  addEventListenerToSeasons();
            }
            if(detailMedia === "tv" || detailMedia === "movie") {
                  addEventListenerToSimilarBtn();
            }
      });
}

function noResults() {
      document.querySelector('.main-content').innerHTML = '<h1 style="text-align:center">Page not found!</h1>';
}

// to display season details add listener 
function addEventListenerToSeasons() {
      var allSeasons = document.querySelectorAll('.season');
      for (var i = 0; i < allSeasons.length; i++) {
            allSeasons[i].addEventListener('click', function () {
                  window.location.assign('media_details.html?tv_season&' + mediaId + '&' + this.id);
            });
      }
}

// listener for similar media 
function addEventListenerToSimilarBtn() {
      var simBtn = document.querySelector('.extra-info p button');
      simBtn.addEventListener('click', function() {
            window.location.assign('similar_media.html?' + detailMedia + '&' + mediaId + '&1');
      });
}

function constructMediaDetailsHTMLStr(element) {
      item_str = "";
      if (detailMedia === "movie") {
            item_str = "<div class='item movie' id=" + element.id + ">";
            item_str += "<div class='poster'>";
            if (element.poster_path == null) {
                  item_str += "<img src=./images/media.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
            }
            item_str += "</div>";
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.title + "</h2>";
            item_str += "<p style='position: relative; top: -20px'><b>" + element.tagline + "</b></p>"
            item_str += "<div>";
            item_str += "<span><i style='color: #742ce8' class='fa fa-calendar'></i>" + element.release_date + "</span>";
            item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
            item_str += "</div>";
            item_str += "<div>";
            item_str += "<span><i style='color: #ff8c12' class='fa fa-clock-o'></i>" + element.runtime + " min</span>";
            item_str += "<span><i style='color: #4fcf00' class='fa fa-thumbs-up'></i>" + element.popularity * 1000 + "</span>";
            item_str += "</div>";
            item_str += "<div>";
            item_str += "<span><i style='color: #FFCB38' class='fa fa-star-o'></i>" + element.vote_average + "</span>";
            item_str += "<span><i style='color: #FE316C'  class='fa fa-heart-o'></i>" + element.vote_count + "</span>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "<div class='extra-info'>";
            item_str += "<p style='padding: 10px 0'><i style='color: #968462' class='fa fa-video-camera' aria-hidden='true'></i>";
            item_str += element.production_companies.map(el => {
                  return el.name;
            }).join(', ');
            item_str += "</p>";
            item_str += "<p>" + element.overview + "</p>";
            if (element.homepage) {
                  item_str += "<p><a href=" + element.homepage + " target='new'>" + element.homepage + "</a></p>";
            }
            item_str += "<p style='padding-top: 15px'><button>Similar Movies</button></p>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";

      } else if (detailMedia === "tv") {
            item_str = "<div class='item tv' id=" + element.id + ">";
            item_str += "<div class='poster'>";
            if (element.poster_path == null) {
                  item_str += "<img src=./images/media.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
            }
            item_str += "</div>";
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.name + "</h2>";
            item_str += "<div>";
            item_str += "<span><i style='color: #870afc' class='fa fa-calendar'></i>" + element.first_air_date + "</span>";
            item_str += "<span><i style='color: #0380A3' class='fa fa-language'></i>" + languages[element.original_language] + "</span>";
            item_str += "</div>";
            item_str += "<div>";
            var runtimes = element.episode_run_time.map(el => {
                  return el;
            }).join(' min, ');
            item_str += "<span><i style='color: #ff8c12' class='fa fa-clock-o'></i>" + runtimes + " min</span>";
            item_str += "<span><i style='color: #4fcf00' class='fa fa-thumbs-up'></i>" + element.popularity * 1000 + "</span>";
            item_str += "</div>";
            item_str += "<div>";
            item_str += "<span><i style='color: #FFCB38' class='fa fa-star-o'></i>" + element.vote_average + "</span>";
            item_str += "<span><i style='color: #FE316C'  class='fa fa-heart-o'></i>" + element.vote_count + "</span>";
            item_str += "</div>";
            var createdBy = element.created_by.map(el => {
                  return el.name;
            }).join(', ');
            item_str += "<p><i style='color: #515152' class='fa fa-pencil'></i>" + createdBy + "</p>";
            var networks = element.networks.map(el => {
                  return el.name;
            }).join(', ');
            item_str += "<p><i style='color: #00c2a2' class='fa fa-rss' aria-hidden='true'></i>" + networks + "</p>";
            var productionComps = element.production_companies.map(el => {
                  return el.name;
            }).join(', ');
            item_str += "<p><i style='color: #968462' class='fa fa-video-camera' aria-hidden='true'></i>" + productionComps + "</p>";
            item_str += "</div>";

            item_str += "<div class='extra-info' style='padding-top: 10px'>";
            item_str += "<p>" + element.overview + "</p>";
            // season details
            item_str += "<div class='seasons' style='justify-content: center; margin-bottom: 10px'>";
            element.seasons.forEach(season => {
                  var season_str = "<div class='season' id=" + season.season_number + ">";
                  if (season.poster_path == null) {
                        season_str += "<img src=./images/media.png alt='poster'>";
                  } else {
                        season_str += "<img src=https://image.tmdb.org/t/p/w300" + season.poster_path + " alt='poster' >";
                  }
                  season_str += "<p>" + season.name + "</p>";
                  season_str += "</div>";
                  item_str += season_str;
            });;
            item_str += "</div>";
            if (element.homepage) {
                  item_str += "<p style='padding-top: 10px'><a href=" + element.homepage + " target='new'>" + element.homepage + "</a></p>";
            }
            item_str += "<p style='padding-top: 15px;'><button>Similar TV Showes</button></p>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";

      } else if (detailMedia === "person") {
            item_str = "<div class='item'>";
            item_str += "<div class='poster'>";
            if (element.profile_path == null) {
                  item_str += "<img src=./images/user.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.profile_path + " alt='poster' >";
            }
            item_str += "</div>";
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.name + "</h2>";
            item_str += "<div>";
            item_str += "<span><i style='color: #1295FF' class='fa fa-dot-circle-o'></i>" + element.known_for_department + "</span>";
            item_str += "<span><i style='color: #AE3FFF' class='fa fa-thumbs-up'></i>" + element.popularity * 1000 + "</span>";
            item_str += "</div>";
            item_str += "<div>";
            item_str += "<span><i style='color: #ff4599' class='fa fa-birthday-cake'></i>" + element.birthday + "</span>";
            item_str += "<span><i style='color: #e61700' class='fa fa-map-marker'></i>" + element.place_of_birth + "</span>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "<div class='extra-info'>";
            item_str += "<p style='padding: 10px'>" + element.biography + "</p>"
            if (element.homepage) {
                  item_str += "<p><a href=" + element.homepage + " target='new'>" + element.homepage + "</a></p>";
            }
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";

      } else if (detailMedia === "tv_season") {
            console.log(element);
            item_str = "<div class='item'>";
            item_str += "<div class='poster'>";
            if (element.poster_path == null) {
                  item_str += "<img src=./images/user.png alt='poster'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' >";
            }
            item_str += "</div>";
            item_str += "<div class='info'>";
            item_str += "<div class='main-info'>";
            item_str += "<h2>" + element.name + "</h2>";
            item_str += "<p>" + element.overview + "</p>"
            item_str += "</div>";
            item_str += "<div class='extra-info'>";
            item_str += "<div class='episodes' style='justify-content: center; align-items: start'>";
            element.episodes.forEach(project => {
                  var proj_str = "<div class='episode'>";
                  if (project.still_path == null) {
                        proj_str += "<img src=./images/media.png alt='poster'>"
                  } else {
                        proj_str += "<img src=https://image.tmdb.org/t/p/w300" + project.still_path + " alt='poster' >";
                  }
                  proj_str += "<p>" + project.name + "</p>";
                  proj_str += "</div>";
                  item_str += proj_str;
            });
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";
      }
      return item_str;
}