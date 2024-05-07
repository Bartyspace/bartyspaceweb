// Funkce pro žádost o povolení pro přístup k událostem pohybu zařízení
function requestMotionPermission() {
  // Kontrola, zda prohlížeč podporuje žádost o povolení pro pohyb zařízení
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Žádost o povolení
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        // Pokud je povolení uděleno, přidáme posluchače události 'devicemotion'
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', e => {
            // Váš kód zde
          });
        }
      })
      .catch(console.error); // Logování chyb
  } else {
    // Pro prohlížeče, které nevyžadují povolení, přímo přidáme posluchače události 'devicemotion'
    window.addEventListener('devicemotion', e => {
      // Váš kód zde
    });
  }
}

// Po načtení dokumentu požádáme o povolení pro pohyb zařízení
document.addEventListener('DOMContentLoaded', requestMotionPermission);

// Po načtení dokumentu provedeme další inicializaci
document.addEventListener('DOMContentLoaded', () => {
  // Získáme element, který budeme posouvat
  const gridMoveDiv = document.getElementById('gridmove');
  // Získáme šířku obrazovky
  const screenWidth = window.innerWidth;
  // Vypočítáme horizontální offset
  const horizontalOffset = (screenWidth - gridMoveDiv.offsetWidth) / 10;

  // Pokud je obrazovka širší než 1024px
  if (screenWidth > 1024) {
    // Posuneme element
    gridMoveDiv.style.transform = `translate(${horizontalOffset}px, 0px)`;

    // Přidáme posluchače události 'mousemove'
    document.addEventListener('mousemove', event => {
      // Vypočítáme offset na základě pozice kurzoru
      const xOffset = (event.clientX - screenWidth / 2) / screenWidth;
      // Posuneme element
      gridMoveDiv.style.transform = `translate(${horizontalOffset + xOffset * 20}px, 0px)`;
    });
  } else if (screenWidth <= 1000 && window.DeviceMotionEvent) {
    // Pokud je obrazovka menší nebo rovna 1000px a prohlížeč podporuje 'DeviceMotionEvent'
    // Přidáme posluchače události 'devicemotion'
    window.addEventListener('devicemotion', e => {
      // Získáme hodnotu akcelerace v ose X
      const accelerationX = e.accelerationIncludingGravity.x;
      // Posuneme element
      gridMoveDiv.style.transform = `translate(${horizontalOffset + accelerationX}px, 0px)`;
    });
  }
});
