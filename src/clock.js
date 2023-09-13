const clock = document.querySelector('h1#clock');

const getClock = () => {
  const date = new Date();
  const hour = String(date.getHours());
  let hours = 0;
  if (hour <= 12) hours = String('오전 ' + hour);
  else hours = String('오후 ' + String(hour - 12));
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}시 ${minutes}분 ${seconds}초`;
};

getClock();
setInterval(getClock, 1000);
