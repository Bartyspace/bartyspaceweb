$(document).ready(function () {
  // Set the initial position
  let currentPosition = 0;

  // Handle next button click
  $('#next-button').on('click', function () {
    currentPosition = (currentPosition + 1) % $('.carousel__item').length;
    updateCarousel(currentPosition);
  });

  // Handle prev button click
  $('#prev-button').on('click', function () {
    currentPosition =
      (currentPosition - 1 + $('.carousel__item').length) % $('.carousel__item').length;
    updateCarousel(currentPosition);
  });

  // Handle item click
  $('.carousel__item').on('click', function () {
    currentPosition = $(this).index();
    updateCarousel(currentPosition);
  });

  // Function to update the carousel
  function updateCarousel(position) {
    $('.carousel__item').removeClass('carousel__item_active');
    $('.carousel__item').attr('data-pos', function (index) {
      let newPos = index - position;
      if (newPos < -2) {
        newPos += $('.carousel__item').length;
      } else if (newPos > 2) {
        newPos -= $('.carousel__item').length;
      }
      return newPos;
    });
    $('.carousel__item[data-pos="0"]').addClass('carousel__item_active');
  }
});
