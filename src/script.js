

const btn = document.querySelector('.btn');

btn.addEventListener('click', validUserName);


function validUserName() {
  const User = document.querySelector('#userName').value;
    if (User){
    localStorage.setItem('name', User);
    location.reload() 
  } else {
    
   alert('Input your name');
    
  }
}


window.onload = function () {

  if (localStorage.getItem('name')) {
    let valueUser = localStorage.getItem('name');
    document.querySelector('.logIn').className = 'hidden';
    
  } else {
    validUserName();
    document.querySelector('.chat').className = 'hidden';
  }
}



