// Get all carousel items
const carouselItems = document.querySelectorAll('.carousel__item');

// Create a map to track the original order of items
const originalOrderMap = new Map();

// Initialize the original order map
carouselItems.forEach((item, index) => {
  originalOrderMap.set(item, index - 2);
});

// Function to handle the click event on each carousel item
carouselItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Get the current position of the clicked item
    const currentPosition = parseInt(item.getAttribute('data-pos'));

    // If the clicked item is not in position 0, update its position
    if (currentPosition !== 0) {
      const diff = currentPosition - 0;

      // Update the position of the clicked item
      item.setAttribute('data-pos', 0);

      // Update the positions of the other items based on the original order map
      carouselItems.forEach(otherItem => {
        if (otherItem !== item) {
          const originalPos = originalOrderMap.get(otherItem);
          const newPos = originalPos - diff;
          otherItem.setAttribute('data-pos', newPos);
        }
      });
    }
  });
});
