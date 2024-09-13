
console.log("Hello World!");
document.addEventListener('DOMContentLoaded', function() {
  const monthYear = document.getElementById('month-year');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const calendarDays = document.querySelector('.calendar-days');
  const eventModal = document.getElementById('event-modal');
  const closeModal = document.querySelector('.close');
  const eventTitle = document.getElementById('event-title');
  const eventDate = document.getElementById('event-date');
  const eventForm = document.getElementById('event-form');


  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];

  function renderCalender(month, year) {
    monthYear.innerText =`${months[month]} ${year}`;
    calendarDays.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    console.log(firstDay);
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    // for(let i = 0; i < firstDay; i++) {
    //   calendarDays.innerHTML += `<div></div>`;
    // }

    let emptyDays = '';
    for(let i = 0; i < firstDay; i++) {
      emptyDays += `<div></div>`;
    }
    calendarDays.innerHTML = emptyDays;

    for(let day = 1; day <= daysInMonth; day++) {
      console.log(day);
      const dayElement = document.createElement('div');
      dayElement.innerText = day;
      dayElement.addEventListener('click', () => openEventModal(day, month, year));
      calendarDays.appendChild(dayElement);
    }

  }

  function openEventModal(day, month, year) {
    eventModal.style.display = 'flex';
    eventDate.value = `${months[month]} ${day}, ${year}`;
  }

  function closeModalEvent() {
    eventModal.style.display = 'none';
  }

  prevButton.addEventListener('click', () => {
    currentMonth--;
    if(currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalender(currentMonth, currentYear);
  });

  nextButton.addEventListener('click', () => {
    currentMonth++;
    if(currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalender(currentMonth, currentYear);
  });

  closeModal.addEventListener('click', () => {
    closeModalEvent();
  });

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = eventTitle.value;
    const date = eventDate.value;
    alert(`Event Created: ${title} on ${date}`)
    console.log(title, date);
    eventTitle.value = '';
    closeModalEvent();
  });

  renderCalender(currentMonth, currentYear);
})
