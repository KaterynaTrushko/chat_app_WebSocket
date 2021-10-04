import * as obj from './login.js'

let user = 'System error';
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
  messageElem.innerHTML = `<span>${user} </span><span> ${message}</span>`;
  document.getElementById('messages').prepend(messageElem);
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


document.forms.publish.onsubmit = function () {

  let text = this.message.value;
  if(!text){
    alert("Input message")
  } else {
  let myMessegeObj = new messegeObj(user, text);
  let myMessageStr = JSON.stringify(myMessegeObj);
  socket.send(myMessageStr);
  this.message.value = '';
  return false;
  }
};

let messedesDate = [];
socket.onmessage = function (event) {
  let getMessage = JSON.parse(event.data);
  if(JSON.parse(localStorage.getItem('date'))){
    messedesDate = JSON.parse(localStorage.getItem('date'));
  }
  messedesDate.push(getMessage);
  console.log(messedesDate);
  localStorage.setItem('date', JSON.stringify(messedesDate));
  let messageElem = document.createElement('div');
  messageElem.textContent = `${getMessage.payload.username}  ${getMessage.payload.message}`;
  document.getElementById('messages').prepend(messageElem);

};

document.addEventListener("DOMContentLoaded", function () {
  let messedesDate = JSON.parse(localStorage.getItem('date'));
  if (!messedesDate) {
    return
  } else {
    for (let i = 0; i < messedesDate.length; i++) {
      print(messedesDate[i].payload.username, messedesDate[i].payload.message)
    }
  }
  connection.checked = true;
});