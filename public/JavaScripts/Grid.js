function requestMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', e => {
            // Váš kód zde
          });
        }
      })
      .catch(console.error);
  } else {
    // zpracování pro prohlížeče, které nevyžadují povolení
    window.addEventListener('devicemotion', e => {
      // Váš kód zde
    });
  }
}

document.addEventListener('DOMContentLoaded', requestMotionPermission);

document.addEventListener('DOMContentLoaded', () => {
  const gridMoveDiv = document.getElementById('gridmove');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const divWidth = gridMoveDiv.offsetWidth;
  const divHeight = gridMoveDiv.offsetHeight;

  const horizontalOffset = (screenWidth - divWidth) / 10;
  const verticalOffset = (screenHeight - divHeight) / 10;

  if (screenWidth > 1024) {
    gridMoveDiv.style.transform = `translate(${horizontalOffset}px, ${verticalOffset}px)`;

    document.addEventListener('mousemove', event => {
      const xOffset = (event.clientX - screenWidth / 2) / screenWidth;
      gridMoveDiv.style.transform = `translate(${horizontalOffset + xOffset * 20}px, ${verticalOffset}px)`;
    });
  } else if (screenWidth <= 1000 && window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', e => {
      const accelerationX = e.accelerationIncludingGravity.x;
      gridMoveDiv.style.transform = `translate(${horizontalOffset + accelerationX}px, ${verticalOffset}px)`;
    });
  }
});
