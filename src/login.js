export * from './login.js'


document.querySelector('.chat').classList.add('hidden');
document.querySelector('.logIn').classList.add('hidden');

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('name')) {
    document.querySelector('.chat').classList.remove('hidden');
  } else {
    document.querySelector('.logIn').classList.remove('hidden');
  }
});


submit.addEventListener('click', function (e) {
  e.preventDefault();
  let user = userName.value;
  userName.value = '';
  validName(user);
  location.reload();

})

function validName(name) {
  
  if (!name) {
    alert('Input a users name!')
        

  } else {
    localStorage.setItem('name', name);
    document.querySelector('.logIn').classList.add('hidden');
    document.querySelector('.chat').classList.remove('hidden');
  }
}