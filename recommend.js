function displayRecommendedMedia(media, data) {
      if (data[0] == undefined || data[1] == undefined) {
            recommendMedia(media);
            return;
      }

      parent = document.querySelector(".result");
      final_str = "";

      data.forEach(element => {
            // getting all the genres
            var genres = element.genre_ids.map(function (id) {
                  return movie_genres[id];
            });

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
            item_str += "<p><i style='color: #BE5300' class='fa fa-film'></i><b>Genres: </b>" + genres.join(", ") + "</p>";
            item_str += "</div>";
            item_str += "<div class='extra-info'>";
            item_str += "<p><b>Overview: </b>" + element.overview + "</p>";
            item_str += "<div>";
            item_str += "<span><i style='color: #FFCB38' class='fa fa-star-o'></i>" + element.vote_average + "</span>";
            item_str += "<span><i style='color: #FE316C'  class='fa fa-heart-o'></i>" + element.vote_count + "</span>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";
            item_str += "</div>";

            final_str += item_str;
      });
      parent.innerHTML = final_str;
}
function getRandom(limit) {
      var r = parseInt(Math.random() * limit);
      return (r + 1) % (limit + 1);
}
function recommendMedia(media) {
      // a random pages
      var randPage = getRandom(25);
      // two diff random items from the page
      var index1 = getRandom(20);           // 20 results on the page
      var index2 = index1;
      while (index2 === index1) {
            index2 = getRandom(20);
      }

      var filters = [orderby.vote_count, options.page(randPage)];
      query_url = getQueryUrl("/discover/" + media)(filters);

      fetch(query_url)
            .then(checkResponse)
            .then(function (response) {
                  console.log("All Ok!");
                  return response.json();
            })
            .then(function (data) {
                  displayRecommendedMedia(media, [data.results[index1], data.results[index2]]);
            })
            .catch(function (error) {
                  console.log(error);
            });

}

window.addEventListener('DOMContentLoaded', (event) => {
      var media = location.search.substring(1);
      recommendMedia(media);
});