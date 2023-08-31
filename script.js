/* Tab Icon */

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  document.querySelector('link[rel="icon"]').href = './tabicon-light.png';
}



/* Variables */

const dvd = document.getElementById('dvd');
const colorSetting = document.getElementById('color');

const dir = Math.random() * (Math.PI / 3 - Math.PI / 6) + Math.PI / 6;
let vX = window.innerWidth / 300 * Math.cos(dir);
let vY = window.innerWidth / 300 * Math.sin(dir);
let screenWidth = window.innerWidth;



/* Color setting */

const old = localStorage.getItem('colorSetting');
if (old !== null && old != 'undefined') {
  colorSetting.checked = old === 'true';
}

colorSetting.addEventListener('click', function() {
  localStorage.setItem('colorSetting', this.checked);
  color();
});



/* DVD */

function resize() {
  vX = vX / screenWidth * window.innerWidth;
  vY = vY / screenWidth * window.innerWidth;
  screenWidth = window.innerWidth;
}
resize();
window.addEventListener('resize', resize);

function color() {
  if (colorSetting.checked) {
    dvd.style.setProperty('--color', "#" + Math.floor(Math.random() * 16777215).toString(16));
    document.body.style.setProperty('--bgColor', '#000');
  } else {
    const colors = ['#70A4C4', '#ABC979', '#7F7094', '#FFADAD', '#FFE49C'].filter(function(item) {
        return item !== dvd.style.getPropertyValue('--color');
    });
    const bgColors = ['#1982C4', '#8AC926', '#6A4C93', '#FF595E', '#FFCA3A'].filter(function(item) {
        return item !== document.body.style.getPropertyValue('--bgColor');
    });
    let rand = Math.floor(Math.random() * colors.length);
    dvd.style.setProperty('--color', colors[rand]);
    document.body.style.setProperty('--bgColor', bgColors[rand]);
  }
}
color();

function move() {
  const box = dvd.getBoundingClientRect();
  dvd.style.top = box.top + vY + 'px';
  dvd.style.left = box.left + vX + 'px';
  if ((box.top + box.height >= window.innerHeight && vY > 0) || (box.top <= 0 && vY < 0)) {
    vY = -vY;
    color();
  }
  if ((box.left + box.width >= window.innerWidth && vX > 0) || (box.left <= 0 && vX < 0)) {
    vX = -vX;
    color();
  }
  requestAnimationFrame(move);
}
requestAnimationFrame(move);
