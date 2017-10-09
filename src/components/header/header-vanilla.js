let hamburger = document.querySelector('.main-head .c-hamburger');
let mMenu = document.querySelector('.main-head .main-head_menu');
let mOverlay = document.querySelector('.menu_overlay');
let openItems = [hamburger, mMenu, mOverlay];

hamburger.addEventListener('click', function() {
  openItems.forEach(function(el) {
    el.classList.toggle('is-open');
  });
});

window.addEventListener('click', function(event) {
  if (event.target === mOverlay) {
    openItems.forEach(function(el) {
      el.classList.remove('is-open');
    });
  }
});

window.onresize = function() {
  if (window.innerWidth >= 961) {
    openItems.forEach(function(el) {
      el.classList.remove('is-open');
    });
  }
};
