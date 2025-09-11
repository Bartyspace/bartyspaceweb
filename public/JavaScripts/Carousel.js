/**
 * Carousel Implementation
 * Podporuje desktop (kliknutí na položky) i mobile (navigační tlačítka)
 */

class Carousel {
  constructor() {
    this.TOTAL_ITEMS = 5;
    this.CENTER_POSITION = 3;
    this.MOBILE_BREAKPOINT = 728;
    this.currentPos = this.CENTER_POSITION;
    
    // Cache DOM elements
    this.wrapper = document.querySelector('.carousel__wrapper');
    this.items = null;
    this.nextButton = document.querySelector('.carousel__button_next');
    this.prevButton = document.querySelector('.carousel__button_prev');
    
    this.init();
  }

  // Detekce malé obrazovky s podporou resize
  isSmallScreen() {
    return window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  // Cache DOM elements - voláme jen jednou
  cacheItems() {
    this.items = Array.from(document.querySelectorAll('.carousel__item'));
  }

  // Najde aktivní položku
  findActiveItem() {
    return this.items.find(item => Number(item.dataset.pos) === this.CENTER_POSITION);
  }

  // Najde položku na dané pozici
  findItemByPosition(position) {
    return this.items.find(item => Number(item.dataset.pos) === position);
  }

  // Desktop funkčnost - kliknutí na položky
  handleDesktopClick(event) {
    const newActive = event.target.closest('.carousel__item');
    if (!newActive || newActive.classList.contains('carousel__item_active')) {
      return;
    }

    const newActivePos = Number(newActive.dataset.pos);
    const current = this.findActiveItem();

    if (current) {
      current.classList.remove('carousel__item_active');
    }

    // Přepočítání pozic všech položek
    this.items.forEach(item => {
      const itemPos = Number(item.dataset.pos);
      let diff = itemPos - newActivePos;
      if (diff < 0) {
        diff += this.TOTAL_ITEMS;
      }
      item.dataset.pos = ((diff + 2) % this.TOTAL_ITEMS) + 1;
    });

    newActive.classList.add('carousel__item_active');
    newActive.dataset.pos = this.CENTER_POSITION;
  }

  // Mobile funkčnost - navigační tlačítka
  updateCarousel(direction) {
    if (!this.items) {
      this.cacheItems();
    }

    // Odebere aktivní třídu ze všech položek
    this.items.forEach(item => {
      item.classList.remove('carousel__item_active');
      const pos = Number(item.dataset.pos);
      
      // Aktualizuje pozici položky
      if (direction === 'next') {
        item.dataset.pos = pos === 1 ? this.TOTAL_ITEMS : pos - 1;
      } else {
        item.dataset.pos = pos === this.TOTAL_ITEMS ? 1 : pos + 1;
      }
    });

    // Najde a označí novou aktivní položku
    const activeItem = this.findItemByPosition(this.CENTER_POSITION);
    if (activeItem) {
      activeItem.classList.add('carousel__item_active');
    }
  }

  // Inicializace aktivní položky
  initializeActiveItem() {
    const activeItem = this.findItemByPosition(this.CENTER_POSITION);
    if (activeItem) {
      activeItem.classList.add('carousel__item_active');
    }
  }

  // Inicializace event listeners
  initEventListeners() {
    // Desktop: kliknutí na wrapper
    if (this.wrapper) {
      this.wrapper.addEventListener('click', (event) => {
        if (!this.isSmallScreen()) {
          this.handleDesktopClick(event);
        }
      });
    }

    // Mobile: navigační tlačítka
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        if (this.isSmallScreen()) {
          this.updateCarousel('next');
        }
      });
    }

    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        if (this.isSmallScreen()) {
          this.updateCarousel('prev');
        }
      });
    }

    // Poslouchá změny velikosti okna
    window.addEventListener('resize', () => {
      // Debounce resize events
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  // Zpracování změny velikosti okna
  handleResize() {
    // Znovu inicializuje aktivní položku při změně velikosti
    this.initializeActiveItem();
  }

  // Hlavní inicializace
  init() {
    // Čeká na načtení DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.cacheItems();
        this.initializeActiveItem();
        this.initEventListeners();
      });
    } else {
      this.cacheItems();
      this.initializeActiveItem();
      this.initEventListeners();
    }
  }
}

// Inicializace carousel po načtení stránky
new Carousel();
