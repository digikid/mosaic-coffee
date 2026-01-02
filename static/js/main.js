$(document).ready(function () {
  $('[data-rellax-speed]').each(function () {
    var element = $(this).get(0);
    var speed = Number($(this).attr('data-rellax-speed') || 0);
    var center = $(this).attr('data-rellax-center') !== undefined;

    new Rellax(element, {
      speed,
      center
    });
  });
});

$(window).on('load', function () {
  $('body').addClass('is-loaded');
});