/* for opening up links when the main links are clicked */

var sideBarLinks = document.querySelector('aside div');
var links = document.querySelectorAll('aside div div');

for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
            var curr = document.querySelector('.selected');
            // if for the consdition since in strting none is selceted so - curr = null
            if (curr) {
                  curr.classList.remove('selected');
            }
            this.classList.add('selected');
      });
}

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
            searchBtn.textContent = str.charAt(0).toUpperCase() + str.slice(1) + " Search";
            console.log(searchResultLocation);
      });
}

addListenerForSearchLinks(searchLinks[0].firstChild, "multi");
addListenerForSearchLinks(searchLinks[1].firstChild, "movie");
addListenerForSearchLinks(searchLinks[2].firstChild, "tv");
addListenerForSearchLinks(searchLinks[3].firstChild, "person");

console.log(searchResultLocation);

searchBtn.addEventListener('click', function() {
      var inputVal = searchInput.value;
      // add Input validation - regex 
      if(inputVal === "") {
            return;
      } else {
            finalSearchLocation = searchResultLocation + inputVal.trim().split(' ').join('+') + "=1";
            // console.log(finalSearchLocation);
            window.location.assign(finalSearchLocation);
      }
});


/* For getting the movies based on release date */

var searchForm = document.querySelector('.search-form');
var yearForm = document.querySelector('.year-form');

var searchLinkMain = document.querySelector('.sidebar-links .link-yellow');
searchLinkMain.addEventListener('click', function() {
      searchForm.style.display = 'block';
      yearForm.style.display = 'none';
});

var baseDiscoverLocation = "discover_results.html?movie&with-year&";
var discoverWithYearLink = document.querySelectorAll('.link-red .sub-links > li')[3];
discoverWithYearLink.addEventListener('click', function() {
      if(yearForm.style.display == 'none') {
            searchForm.style.display = 'none';
            yearForm.style.display = 'block';
      } else {
            searchForm.style.display = 'block';
            yearForm.style.display = 'none';
      }
});

var yearFormBtn = document.querySelector('.year-form button');
var yearFormInput = document.querySelector('.year-form input');

yearFormBtn.addEventListener('click', function() {
      var inputVal = yearFormInput.value;
      console.log(inputVal);
      if(inputVal === "") {
            return;
      } else {
            window.location.assign(baseDiscoverLocation + inputVal + '&1');
      }
});