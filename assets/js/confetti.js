"use strict";
let confettiInProgress = false;
document.querySelector('.confetti-button').onclick = () => {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  if (!confettiInProgress) {
    confettiInProgress= true;
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        confettiInProgress=false;
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }
};



/**
 * Sold out sign
 */
const drawRandomPoint = ([start, end]) => {
  const range = end - start;
  return Math.floor(Math.random() * range + start);
}

const numberOfStars = 10;
const area = { x: [15, 110], y: [0, 60]}

const template = document.getElementById('star-template')
for(let i = 0; i < numberOfStars; i++){
  const x = drawRandomPoint(area.x);
  const y = drawRandomPoint(area.y) - (x/6) +20;

  const clone = template.cloneNode(true);
  clone.id = `star-${i}`;
  clone.style.transform = `scale(0.1) translate(${x}rem,${y}rem)`;
  
  const delay = (Math.random()*4).toFixed(3);
  clone.style.animation = `popup 4s linear ${delay}s infinite`
  
  template.after(clone);
}

