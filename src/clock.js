const clock = document.querySelector('span#clock');

const getClock = () => {
  const date = new Date();
  const hour = String(date.getHours());
  let hours = 0;
  let minutes = 0;
  if (hour <= 12) {
    hours = String(hour).padStart(2, '0');
    minutes = String(String(date.getMinutes()).padStart(2, '0') + ' am');
  } else {
    hours = String(hour - 12).padStart(2, '0');
    minutes = String(String(date.getMinutes()).padStart(2, '0') + ' pm');
  }
  clock.innerText = `${hours}:${minutes}`;
};

getClock();
setInterval(getClock, 1000);
