import * as obj from './login.js'

let user = localStorage.getItem('name');
//let messedesDate = [];
let socket = new WebSocket("wss://fep-app.herokuapp.com/ ");


socket.onclose = function (event) {

  if (connection.checked) {
    let socket = new WebSocket("wss://fep-app.herokuapp.com/ ");
  } else {
    let message = 'Connection interrupted';
    print('system', message);
  }
};

function print(user, message) {
  let messageElem = document.createElement('div');
  messageElem.classList.add('user-mes');
  messageElem.innerHTML = `<span>${user} </span><span> ${message}</span>`;
  document.getElementById('messages').append(messageElem);
};


function printUser(user) {
  let div = document.createElement('div');
  div.classList.add('user-name');
  div.textContent = user;
  document.querySelector('.user-box').append(div);
};

socket.onerror = function (error) {
  let message = error.message;
  print('system', message);
};


class messegeObj {
  constructor(user, text) {
    this.type = "message";
    this.payload = {
      username: user,
      message: text
    }
  }
}

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}



document.forms.publish.onsubmit = function () {

  let text = this.message.value;
  if (!text) {
    alert("Input message")
  } else {
    let myMessegeObj = new messegeObj(user, text);
    let myMessageStr = JSON.stringify(myMessegeObj);
    socket.send(myMessageStr);
    this.message.value = '';
    return false;
  }
};


let nameBox = [];

let messedesDate = [];

socket.onmessage = function (event) {
  let getMessage = JSON.parse(event.data);
  if (JSON.parse(localStorage.getItem('date'))) {
    messedesDate = JSON.parse(localStorage.getItem('date'));
  }
  messedesDate.push(getMessage);
  localStorage.setItem('date', JSON.stringify(messedesDate));

  let messageElem = document.createElement('div');
  messageElem.textContent = `${getMessage.payload.username}  ${getMessage.payload.message}`;
  document.getElementById('messages').append(messageElem);



  if (nameBox.includes(getMessage.payload.username)) {
    return;
  } else {
    let div = document.createElement('div');
    div.classList.add('user-name');
    div.textContent = getMessage.payload.username;
    document.querySelector('.user-box').append(div);
  }

};

document.addEventListener("DOMContentLoaded", function () {
  let messedesDate = JSON.parse(localStorage.getItem('date'));
  if (!messedesDate) {
    return
  } else {
    for (let i = 0; i < messedesDate.length; i++) {
      print(messedesDate[i].payload.username, messedesDate[i].payload.message);
   }
  }
  connection.checked = true;

  

});