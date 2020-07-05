/* slideshow for movies */

var movieSlideIndex = 1;
showMovieSlides(movieSlideIndex);

function plusMovieSlides(n) {
      showMovieSlides(movieSlideIndex += n);
}

function currentMovieSlide(n) {
      showMovieSlides(movieSlideIndex = n);
}

function showMovieSlides(n) {
      var i;
      var slides = document.getElementsByClassName("movieSlides");
      var movieDots = document.getElementsByClassName("movieDot");
      if (n > slides.length) { movieSlideIndex = 1 }
      if (n < 1) { movieSlideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
      }
      for (i = 0; i < movieDots.length; i++) {
            movieDots[i].className = movieDots[i].className.replace(" active", "");
      }
      slides[movieSlideIndex - 1].style.display = "block";
      movieDots[movieSlideIndex - 1].className += " active";
}


/* slideshow for tv shows */

var tvSlideIndex = 1;
showTVSlides(tvSlideIndex);

function plusTVSlides(n) {
      showTVSlides(tvSlideIndex += n);
}

function currentTVSlide(n) {
      showTVSlides(tvSlideIndex = n);
}

function showTVSlides(n) {
      var i;
      var slides = document.getElementsByClassName("tvSlides");
      var Dots = document.getElementsByClassName("tvDot");
      if (n > slides.length) { tvSlideIndex = 1 }
      if (n < 1) { tvSlideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
      }
      for (i = 0; i < Dots.length; i++) {
            Dots[i].className = Dots[i].className.replace(" active", "");
      }
      slides[tvSlideIndex - 1].style.display = "block";
      Dots[tvSlideIndex - 1].className += " active";
}


/* slideshow for celebs */

var celebSlideIndex = 1;
showCelebSlides(celebSlideIndex);

function plusCelebSlides(n) {
      showCelebSlides(celebSlideIndex += n);
}

function currentCelebSlide(n) {
      showCelebSlides(celebSlideIndex = n);
}

function showCelebSlides(n) {
      var i;
      var slides = document.getElementsByClassName("celebSlides");
      var Dots = document.getElementsByClassName("celebDot");
      if (n > slides.length) { celebSlideIndex = 1 }
      if (n < 1) { celebSlideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
      }
      for (i = 0; i < Dots.length; i++) {
            Dots[i].className = Dots[i].className.replace(" active", "");
      }
      slides[celebSlideIndex - 1].style.display = "block";
      Dots[celebSlideIndex - 1].className += " active";
}