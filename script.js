let textbox = document.getElementById('textbox');
let titleContainer = document.getElementById('title-container');

let dateElement = document.getElementById('date-picker');
let datePicked = dateElement.value;

const todoContainer = document.getElementById('todo-container');


let todos = [];

function submit() {
  titleContainer.innerText = textbox.value;
  datePicked = dateElement.value;
}

function addTodo() {
  let textbox = document.getElementById('textbox');
  let textContent = textbox.value;
  let datePicker = document.getElementById('date-picker');
  let dueDate = datePicker.value;
  let todoID = '' + new Date().getTime();

  todos.push({
    title: textContent,
    dueDate: dueDate,
    id: todoID
  });

  render();
  console.log(todos);
}

function render() {
  document.getElementById('tdc').innerHTML = '';

  todos.forEach(
    function(obj) {
      let newDiv = document.createElement('div');
      newDiv.innerHTML = obj.title + ' ' + obj.dueDate;

      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'remove';
      deleteButton.onclick = deleteDiv;
      deleteButton.id = obj.id;
      deleteButton.style = 'display: inline; margin-left: 15px';
      newDiv.appendChild(deleteButton);

      document.getElementById('tdc').appendChild(newDiv);
    }
  )
}

function deleteDiv(event) {
  let deleteButton = event.target;
  let idToDelete = deleteButton.id;

  todos = todos.filter(
    function (todo) {
      if (todo['id'] === idToDelete) {
        return false;
      } else {
        return true;
      }
    }
  );

  render();
  console.log(todos);
  reset();
}

function reset() {
  if (todos.length === 0) {
    titleContainer.innerText = 'Hi 2100!';
    datePicked = '2100-01-01';
  }
  else {
    let lastIndex = todos.length - 1;
    titleContainer.innerText = todos[lastIndex].title;
    datePicked = todos[lastIndex].dueDate;
  }
}


function countDown() {
  const currentDate = new Date();
  const newYearsDate = new Date(datePicked);
  const difference = (newYearsDate - currentDate)/1000;

  const seconds = Math.floor(difference % 60);
  const minutes = Math.floor((difference/60) % 60);
  const hours = Math.floor((difference/3600) % 24);
  const days = Math.floor(difference/(3600*24));

  const daysElement = document.getElementById('days');
  daysElement.innerText = formatTime(days);

  const hoursElement = document.getElementById('hours');
  hoursElement.innerText = formatTime(hours);

  const minutesElement = document.getElementById('minutes');
  minutesElement.innerText = formatTime(minutes);

  const secondsElement = document.getElementById('seconds');
  secondsElement.innerText = formatTime(seconds);
}

function formatTime(time) {
  return (time < 10) ? `0${time}`: time;
}


countDown();
setInterval(countDown, 1000);

