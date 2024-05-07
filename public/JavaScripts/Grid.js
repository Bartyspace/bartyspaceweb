function requestMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', e => {
            handleDeviceMotion(e);
          });
        }
      })
      .catch(console.error);
  } else {
    // zpracování pro prohlížeče, které nevyžadují povolení
    window.addEventListener('devicemotion', e => {
      handleDeviceMotion(e);
    });
  }
}

function handleDeviceMotion(e) {
  const gridMoveDiv = document.getElementById('gridmove');
  const screenWidth = window.innerWidth;
  const divWidth = gridMoveDiv.offsetWidth;
  const horizontalOffset = (screenWidth - divWidth) / 10;
  const accelerationX = e.accelerationIncludingGravity.x;
  gridMoveDiv.style.transform = `translate(${horizontalOffset + accelerationX}px, 0px)`;
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
  }
});
