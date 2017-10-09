let openItems = '.c-hamburger, .main-head_menu, .menu_overlay';
$('.main-head .c-hamburger').click( function() {
  $(openItems).toggleClass('is-open');
});
$(window).click(function(event) {
  if ( $(event.target).hasClass('menu_overlay') ) {
    $(openItems).removeClass('is-open');
  }
});
$(window).resize(function() {
  if ($(window).width() >= 961) {
    $(openItems).removeClass('is-open');
  }
});


