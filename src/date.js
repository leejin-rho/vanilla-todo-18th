const dateElm = document.querySelector('span#date');

const getDate = () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayName = days[date.getDay()];

  dateElm.innerText = `${year}-${month}-${day} ${dayName}`;
};

getDate();
