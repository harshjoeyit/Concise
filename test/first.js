var mediaType = "all";
var timeWindow = "day";
var count;

window.addEventListener('DOMContentLoaded', function () {

      /* for controlling the type of search done */

      var baseSearchResultLocation = 'search_results.html';
      // multi search by default
      var searchResultLocation = baseSearchResultLocation + "?multi=";
      var finalSearchLocation;
      var searchLinks = document.querySelectorAll('.link-yellow .sub-links > li');
      var searchBtn = document.querySelector('.search-form > button');
      var searchInput = document.querySelector('.search-form > input');

      function addListenerForSearchLinks(link, str) {
            link.addEventListener('click', function () {
                  searchResultLocation = baseSearchResultLocation + "?" + str + "=";
                  if(str != "multi") {
                        searchBtn.textContent = str.charAt(0).toUpperCase() + str.slice(1) + " Search";
                  } else {
                        searchBtn.textContent = "Search";
                  }
            });
      }

      addListenerForSearchLinks(searchLinks[0].firstChild, "multi");
      addListenerForSearchLinks(searchLinks[1].firstChild, "movie");
      addListenerForSearchLinks(searchLinks[2].firstChild, "tv");
      addListenerForSearchLinks(searchLinks[3].firstChild, "person");

      searchInput.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                  searchBtn.click();
            }
      });

      searchBtn.addEventListener('click', function () {
            var inputVal = searchInput.value;
            // add Input validation - regex 
            if (inputVal === "") {
                  alert("input box was left empty!");
            } else {
                  finalSearchLocation = searchResultLocation + inputVal.trim().split(' ').join('+') + "=1";
                  window.location.assign(finalSearchLocation);
            }
      });

      // listener for carousel form submit button
      var carouselBtn = document.querySelector('.carousel-form>button');
      carouselBtn.addEventListener('click', () => {
            mediaType = document.querySelector(".media-type").value;
            timeWindow = document.querySelector(".time-window").value;
            getTrending();
            currentSlide(1);
      });

      // adding a loader 
      addLoader();

      // carousel
      getTrending();

      // entertainment news 
      getEntertainmentNews();
});


// loader
function addLoader() {
      var parent = document.querySelector('.slideshow');
      parent.innerHTML = "<div id='loader' class='loader'></div>";
      var loader = document.querySelector('.loader');
      var x = setInterval(function () {
            if (parent.firstChild.id != "loader") {
                  loader.style.display = 'none';
                  clearInterval(x);
            } else {
                  document.querySelector('.slideshow').style.width = "300px";
                  loader.style.display = 'block';
            }
      }, 100);
}

/* carousel */

// take input for the type of trending - day/week, tv/movie/person
// initiall y we show all that is treding - movie, tv, person

function getTrending() {
      query_url = getQueryUrl('/trending/' + mediaType + '/' + timeWindow)([]);
      var parent = document.querySelector('.slideshow');

      var slide_str = "<h3 style='text-align: center'>Trending Now</h>";
      slide_str += "<div class='slideshow-container'>";
      fetchData(query_url, function (data) {
            count = data.results.length;
            for (var i = 0; i < count; i++) {
                  slide_str += constructHTMLStrForCarousel(data.results[i], i);
            }

            slide_str += "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>";
            slide_str += "<a class='next' onclick='plusSlides(1)'>&#10095;</a>";

            slide_str += "</div>";
            slide_str += "<div style='text-align:center'>";
            for (var i = 0; i < count; i++) {

                  slide_str += "<span class='dot' onclick='currentSlide(" + (i + 1) + ")'></span>"
            }
            slide_str += "</div>";

            // console.log(slide_str);
            parent.innerHTML = slide_str;
            showSlides(slideIndex);
      });

}

// construct html item str 
function constructHTMLStrForCarousel(element, index) {
      var elMedia = mediaType;
      var item_str = "";
      if (mediaType === "all") {
            elMedia = element.media_type;
      }
      item_str += "<div class='mySlides fade'>";
      item_str += "<div class='numbertext'>" + (index + 1) + " / " + count + "</div>";
      if (elMedia === "movie") {
            if (element.poster_path == null) {
                  item_str += "<img src=./images/media.png alt='poster' style='width: 100%'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' style='width: 100%'>";
            }
            item_str += "<div class='text'>" + element.title + "</div>";

      } else if (elMedia === "tv") {
            if (element.poster_path == null) {
                  item_str += "<img src=./images/media.png alt='poster' style='width: 100%'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.poster_path + " alt='poster' style='width: 100%'>";
            }
            item_str += "<div class='text'>" + element.name + "</div>";

      } else if (elMedia === "person") {
            if (element.profile_path == null) {
                  item_str += "<img src=./images/user.png alt='poster' style='width: 100%'>"
            } else {
                  item_str += "<img src=https://image.tmdb.org/t/p/w500" + element.profile_path + " alt='poster' style='width: 100%'>";
            }
            item_str += "<div class='text'>" + element.name + "</div>";
      }
      item_str += "</div>";
      return item_str;
}


var slideIndex = 1;

function plusSlides(n) {
      showSlides(slideIndex += n);
}

function currentSlide(n) {
      showSlides(slideIndex = n);
}

function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
}



// also create click listener for going to the details page by using id of the media item