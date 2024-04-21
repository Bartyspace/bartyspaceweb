const carouselList = document.querySelector('.carousel__wrapper');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = [...carouselItems];

carouselList.addEventListener('click', function (event) {
  const newActive = event.target.closest('.carousel__item');
  if (!newActive || newActive.classList.contains('carousel__item_active')) {
    return;
  }
  update(newActive);
});

function update(newActive) {
  const newActivePos = +newActive.dataset.pos;
  const positionMap = new Map();
  elems.forEach(elem => positionMap.set(+elem.dataset.pos, elem));

  const positions = [-2, -1, 0, 1, 2];
  positions.forEach(pos => {
    const item = positionMap.get(pos);
    const itemPos = +item.dataset.pos;
    if (item === newActive) {
      item.classList.add('carousel__item_active');
    } else {
      item.classList.remove('carousel__item_active');
    }
    item.dataset.pos = getPos(itemPos, newActivePos);
  });
}

function getPos(current, active) {
  const diff = current - active;
  if (Math.abs(current - active) > 2) {
    return -current;
  }
  return diff;
}
const prevButton = document.querySelector('.carousel__button_prev');
const nextButton = document.querySelector('.carousel__button_next');

// Přidat posluchače událostí pro tlačítka předchozího a dalšího prvku
prevButton.addEventListener('click', function () {
  if (window.innerWidth <= 425) {
    const activeItem = document.querySelector('.carousel__item_active');
    const prevItem =
      activeItem.previousElementSibling || carouselItems[carouselItems.length - 1];
    update(prevItem);
  }
});

nextButton.addEventListener('click', function () {
  if (window.innerWidth <= 425) {
    const activeItem = document.querySelector('.carousel__item_active');
    const nextItem =
      activeItem.nextElementSibling || carouselItems[0];
    update(nextItem);
  }
});
