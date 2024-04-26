document.addEventListener('DOMContentLoaded', () => {
  // Check if screen width is greater than 1024px
  if (window.innerWidth > 1024) {
    const gridMoveDiv = document.getElementById('gridmove');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const divWidth = gridMoveDiv.offsetWidth;
    const divHeight = gridMoveDiv.offsetHeight;

    const horizontalOffset = (screenWidth - divWidth) / 10;
    const verticalOffset = (screenHeight - divHeight) / 10;

    gridMoveDiv.style.transform = `translate(${horizontalOffset}px, ${verticalOffset}px)`;

    document.addEventListener('mousemove', event => {
      const xOffset = (event.clientX - screenWidth / 2) / screenWidth;
      // Set yOffset to 0 to prevent vertical movement
      const yOffset = 0;
      gridMoveDiv.style.transform = `translate(${horizontalOffset + xOffset * 20}px, ${verticalOffset + yOffset * 20}px)`;
    });
  } else if (window.innerWidth <= 768) {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', e => {
        const gridMoveDiv = document.getElementById('gridmove');
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const divWidth = gridMoveDiv.offsetWidth;
        const divHeight = gridMoveDiv.offsetHeight;

        const horizontalOffset = (screenWidth - divWidth) / 10;
        const verticalOffset = (screenHeight - divHeight) / 10;

        const accelerationX = e.accelerationIncludingGravity.x;

        gridMoveDiv.style.transform = `translate(${horizontalOffset + accelerationX}px, ${verticalOffset}px)`;
      });
    }
  }
});
