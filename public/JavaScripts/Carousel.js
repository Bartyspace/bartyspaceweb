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

// Při načtení stránky nastaví jako aktivní první položku karuselu (component 1)
window.addEventListener('DOMContentLoaded', () => {
  const carouselItems = Array.from(document.querySelectorAll('.carousel__item'));
  
  // Najde položku s data-pos="1" (první component)
  const firstItem = carouselItems.find(item => item.dataset.pos === '1');
  
  if (firstItem) {
    // Odebere aktivní třídu ze všech položek
    carouselItems.forEach(item => item.classList.remove('carousel__item_active'));
    
    // Označí první položku jako aktivní a přesune ji na pozici 3 (střed)
    firstItem.classList.add('carousel__item_active');
    const firstItemPos = Number(firstItem.dataset.pos);
    
    // Přepočítá pozice všech položek tak, aby první byla ve středu
    carouselItems.forEach(item => {
      const itemPos = Number(item.dataset.pos);
      let diff = itemPos - firstItemPos;
      if (diff < 0) {
        diff += 5;
      }
      item.dataset.pos = ((diff + 2) % 5) + 1;
    });
    firstItem.dataset.pos = 3;
  }
});

// Funkce pro detekci malé obrazovky
function isSmallScreen() {
  // Vrací true, pokud je šířka okna menší nebo rovna 728px
  return window.innerWidth <= 728;
}

// Aktualizace karuselu pro malé obrazovky
if (isSmallScreen()) {
  // Aktuální pozice v karuselu
  let currentPos = 3;

  // Funkce pro aktualizaci karuselu
  function updateCarousel(direction) {
    // Získá všechny položky karuselu
    const carouselItems = Array.from(document.querySelectorAll('.carousel__item'));

    // Funkce pro aktualizaci pozice položky karuselu
    const updatePosition = item => {
      // Odebere třídu 'carousel__item_active' z položky
      item.classList.remove('carousel__item_active');
      // Získá aktuální pozici položky
      const pos = Number(item.dataset.pos);
      // Aktualizuje pozici položky na základě směru
      item.dataset.pos =
        direction === 'next' ? (pos === 1 ? 5 : pos - 1) : pos === 5 ? 1 : pos + 1;
    };

    // Pokud je směr definován, aktualizuje pozici všech položek karuselu
    if (direction) {
      carouselItems.forEach(updatePosition);
    }

    // Aktualizuje aktuální pozici na základě směru
    currentPos =
      direction === 'next'
        ? currentPos === 5
          ? 1
          : currentPos
        : currentPos === 1
          ? 5
          : currentPos;
    // Najde položku karuselu na aktuální pozici a označí ji jako aktivní
    carouselItems
      .find(item => Number(item.dataset.pos) === currentPos)
      ?.classList.add('carousel__item_active');
  }

  // Při kliknutí na tlačítko 'next' aktualizuje karusel
  document
    .querySelector('.carousel__button_next')
    .addEventListener('click', () => updateCarousel('next'));
  document
    .querySelector('.carousel__button_prev')
    .addEventListener('click', () => updateCarousel('prev'));
}
