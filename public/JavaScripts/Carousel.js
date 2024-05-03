document.querySelector('.carousel__wrapper').addEventListener('click', function (event) {
  const newActive = event.target.closest('.carousel__item');
  if (!newActive || newActive.classList.contains('carousel__item_active')) {
    return;
  }

  const elems = Array.from(document.querySelectorAll('.carousel__item'));
  const newActivePos = Number(newActive.dataset.pos);
  const current = elems.find(elem => Number(elem.dataset.pos) === 3);

  current.classList.remove('carousel__item_active');
  elems.forEach(item => {
    const itemPos = Number(item.dataset.pos);
    let diff = itemPos - newActivePos;
    if (diff < 0) {
      diff += 5;
    }
    item.dataset.pos = ((diff + 2) % 5) + 1;
  });
  newActive.classList.add('carousel__item_active');
  newActive.dataset.pos = 3;
});
// Funkce pro detekci malé obrazovky
function isSmallScreen() {
  return window.innerWidth <= 728;
}

// Aktualizace karuselu pro malé obrazovky
if (isSmallScreen()) {
  let currentPos = 3;

  window.addEventListener('DOMContentLoaded', () => {
    const carouselItems = Array.from(document.querySelectorAll('.carousel__item'));
    carouselItems
      .find(item => Number(item.dataset.pos) === 3)
      ?.classList.add('carousel__item_active');
  });

  function updateCarousel(direction) {
    const carouselItems = Array.from(document.querySelectorAll('.carousel__item'));
    carouselItems.forEach(item => {
      item.classList.remove('carousel__item_active');
      const pos = Number(item.dataset.pos);
      item.dataset.pos =
        direction === 'next' ? (pos === 1 ? 5 : pos - 1) : pos === 5 ? 1 : pos + 1;
    });

    currentPos =
      direction === 'next'
        ? currentPos === 5
          ? 1
          : currentPos
        : currentPos === 1
          ? 5
          : currentPos;
    carouselItems
      .find(item => Number(item.dataset.pos) === currentPos)
      ?.classList.add('carousel__item_active');
  }

  document
    .querySelector('.carousel__button_next')
    .addEventListener('click', () => updateCarousel('next'));
  document
    .querySelector('.carousel__button_prev')
    .addEventListener('click', () => updateCarousel('prev'));
}
