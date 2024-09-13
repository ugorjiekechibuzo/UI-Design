function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let hour = (hours % 12) * 30 + (minutes / 2);
  let minute = minutes * 6;
  let second = seconds * 6;
  document.querySelector(".hour-hand").style.transform = `translate(-50%, -100%) rotate(${hour}deg)`;
  document.querySelector(".minute-hand").style.transform = `translate(-50%, -100%) rotate(${minute}deg)`;
  document.querySelector(".second-hand").style.transform = `translate(-50%, -100%) rotate(${second}deg)`;
  setTimeout(updateClock, 1000);

}

updateClock();
