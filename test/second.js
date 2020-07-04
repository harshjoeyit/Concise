function openNav() {
      document.getElementById("mynavbar").style.width = "70%";
}

function closeNav() {
      document.getElementById("mynavbar").style.width = "0";
      // closing the opened sublinks on the navbar 
      var curr = document.querySelector('.selected');
      curr.click();
}



function swapCaretClass(el) {
      if (el.classList.contains('fa-caret-down')) {
            el.classList.remove('fa-caret-down');
            el.classList.add('fa-caret-up');
      } else if (el.classList.contains('fa-caret-up')) {
            el.classList.remove('fa-caret-up');
            el.classList.add('fa-caret-down');
      }
}