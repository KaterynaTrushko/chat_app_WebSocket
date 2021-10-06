/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.js */ "./src/login.js");



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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.js */ "./src/login.js");


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
  messageElem.innerHTML = `<span class="name">${user} </span><div class="mess"> ${message}</div>`;
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


document.forms.publish.onsubmit = function () {

  let text = this.message.value;
  if (!text) {
    console.log("Input message");
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
    nameBox = messedesDate.map(m => m.payload.username);
  }
  
  messedesDate.push(getMessage);
  localStorage.setItem('date', JSON.stringify(messedesDate));

  let messageElem = document.createElement('div');
  messageElem.textContent = `${getMessage.payload.username}  ${getMessage.payload.message}`;
  document.getElementById('messages').append(messageElem);

  let uniqueNames = [...new Set(nameBox)];
   if(uniqueNames.includes(getMessage.payload.username)){
     return;
   } else {
     printUser(getMessage.payload.username);
   }
   window.location.reload()
};

document.addEventListener("DOMContentLoaded", function () {
  let messedesDate = JSON.parse(localStorage.getItem('date'));
  if (!messedesDate) {
    return
  } else {
    for (let i = 0; i < messedesDate.length; i++) {
      print(messedesDate[i].payload.username, messedesDate[i].payload.message);
      console.log(messedesDate[i]);
   }
  }
  connection.checked = true;

  const names = messedesDate.map(m => m.payload.username);
  let uniqueNames = [...new Set(names)];

  uniqueNames.forEach(element => {
    printUser(element);
  });

  console.log(names);
  console.log(uniqueNames);
  
});

let logout = document.querySelector('.logout');

logout.onclick = function(){
  localStorage.clear();
  location.reload();
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xYmExYTM0ZmNjY2EwYjNmNzNlZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNuQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxNQUFNLDRCQUE0QixRQUFRO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhCQUE4QixFQUFFLDJCQUEyQjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRfYXBwX1dlYlNvY2tldC8uL3NyYy9sb2dpbi5qcyIsIndlYnBhY2s6Ly9jaGF0X2FwcF9XZWJTb2NrZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hhdF9hcHBfV2ViU29ja2V0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hhdF9hcHBfV2ViU29ja2V0Ly4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICcuL2xvZ2luLmpzJ1xyXG5cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGF0JykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dJbicpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhdCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nSW4nKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxldCB1c2VyID0gdXNlck5hbWUudmFsdWU7XHJcbiAgdXNlck5hbWUudmFsdWUgPSAnJztcclxuICB2YWxpZE5hbWUodXNlcik7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcblxyXG59KVxyXG5cclxuZnVuY3Rpb24gdmFsaWROYW1lKG5hbWUpIHtcclxuICBcclxuICBpZiAoIW5hbWUpIHtcclxuICAgIGFsZXJ0KCdJbnB1dCBhIHVzZXJzIG5hbWUhJylcclxuICAgICAgICBcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lJywgbmFtZSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nSW4nKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGF0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIG9iaiBmcm9tICcuL2xvZ2luLmpzJ1xyXG5cclxubGV0IHVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4vL2xldCBtZXNzZWRlc0RhdGUgPSBbXTtcclxubGV0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3c3M6Ly9mZXAtYXBwLmhlcm9rdWFwcC5jb20vIFwiKTtcclxuXHJcblxyXG5zb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICBpZiAoY29ubmVjdGlvbi5jaGVja2VkKSB7XHJcbiAgICBsZXQgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzczovL2ZlcC1hcHAuaGVyb2t1YXBwLmNvbS8gXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgbWVzc2FnZSA9ICdDb25uZWN0aW9uIGludGVycnVwdGVkJztcclxuICAgIHByaW50KCdzeXN0ZW0nLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBwcmludCh1c2VyLCBtZXNzYWdlKSB7XHJcbiAgbGV0IG1lc3NhZ2VFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbWVzc2FnZUVsZW0uY2xhc3NMaXN0LmFkZCgndXNlci1tZXMnKTtcclxuICBtZXNzYWdlRWxlbS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+JHt1c2VyfSA8L3NwYW4+PGRpdiBjbGFzcz1cIm1lc3NcIj4gJHttZXNzYWdlfTwvZGl2PmA7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJykuYXBwZW5kKG1lc3NhZ2VFbGVtKTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBwcmludFVzZXIodXNlcikge1xyXG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZCgndXNlci1uYW1lJyk7XHJcbiAgZGl2LnRleHRDb250ZW50ID0gdXNlcjtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ib3gnKS5hcHBlbmQoZGl2KTtcclxufTtcclxuXHJcbnNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgbGV0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gIHByaW50KCdzeXN0ZW0nLCBtZXNzYWdlKTtcclxufTtcclxuXHJcblxyXG5jbGFzcyBtZXNzZWdlT2JqIHtcclxuICBjb25zdHJ1Y3Rvcih1c2VyLCB0ZXh0KSB7XHJcbiAgICB0aGlzLnR5cGUgPSBcIm1lc3NhZ2VcIjtcclxuICAgIHRoaXMucGF5bG9hZCA9IHtcclxuICAgICAgdXNlcm5hbWU6IHVzZXIsXHJcbiAgICAgIG1lc3NhZ2U6IHRleHRcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5kb2N1bWVudC5mb3Jtcy5wdWJsaXNoLm9uc3VibWl0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICBsZXQgdGV4dCA9IHRoaXMubWVzc2FnZS52YWx1ZTtcclxuICBpZiAoIXRleHQpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSW5wdXQgbWVzc2FnZVwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IG15TWVzc2VnZU9iaiA9IG5ldyBtZXNzZWdlT2JqKHVzZXIsIHRleHQpO1xyXG4gICAgbGV0IG15TWVzc2FnZVN0ciA9IEpTT04uc3RyaW5naWZ5KG15TWVzc2VnZU9iaik7XHJcbiAgICBzb2NrZXQuc2VuZChteU1lc3NhZ2VTdHIpO1xyXG4gICAgdGhpcy5tZXNzYWdlLnZhbHVlID0gJyc7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIH07XHJcblxyXG5cclxubGV0IG5hbWVCb3ggPSBbXTtcclxuXHJcbmxldCBtZXNzZWRlc0RhdGUgPSBbXTtcclxuXHJcbnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBsZXQgZ2V0TWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGUnKSkpIHtcclxuICAgIG1lc3NlZGVzRGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGUnKSk7XHJcbiAgICBuYW1lQm94ID0gbWVzc2VkZXNEYXRlLm1hcChtID0+IG0ucGF5bG9hZC51c2VybmFtZSk7XHJcbiAgfVxyXG4gIFxyXG4gIG1lc3NlZGVzRGF0ZS5wdXNoKGdldE1lc3NhZ2UpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRlJywgSlNPTi5zdHJpbmdpZnkobWVzc2VkZXNEYXRlKSk7XHJcblxyXG4gIGxldCBtZXNzYWdlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1lc3NhZ2VFbGVtLnRleHRDb250ZW50ID0gYCR7Z2V0TWVzc2FnZS5wYXlsb2FkLnVzZXJuYW1lfSAgJHtnZXRNZXNzYWdlLnBheWxvYWQubWVzc2FnZX1gO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpLmFwcGVuZChtZXNzYWdlRWxlbSk7XHJcblxyXG4gIGxldCB1bmlxdWVOYW1lcyA9IFsuLi5uZXcgU2V0KG5hbWVCb3gpXTtcclxuICAgaWYodW5pcXVlTmFtZXMuaW5jbHVkZXMoZ2V0TWVzc2FnZS5wYXlsb2FkLnVzZXJuYW1lKSl7XHJcbiAgICAgcmV0dXJuO1xyXG4gICB9IGVsc2Uge1xyXG4gICAgIHByaW50VXNlcihnZXRNZXNzYWdlLnBheWxvYWQudXNlcm5hbWUpO1xyXG4gICB9XHJcbiAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBtZXNzZWRlc0RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRlJykpO1xyXG4gIGlmICghbWVzc2VkZXNEYXRlKSB7XHJcbiAgICByZXR1cm5cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzZWRlc0RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcHJpbnQobWVzc2VkZXNEYXRlW2ldLnBheWxvYWQudXNlcm5hbWUsIG1lc3NlZGVzRGF0ZVtpXS5wYXlsb2FkLm1lc3NhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzZWRlc0RhdGVbaV0pO1xyXG4gICB9XHJcbiAgfVxyXG4gIGNvbm5lY3Rpb24uY2hlY2tlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0IG5hbWVzID0gbWVzc2VkZXNEYXRlLm1hcChtID0+IG0ucGF5bG9hZC51c2VybmFtZSk7XHJcbiAgbGV0IHVuaXF1ZU5hbWVzID0gWy4uLm5ldyBTZXQobmFtZXMpXTtcclxuXHJcbiAgdW5pcXVlTmFtZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgIHByaW50VXNlcihlbGVtZW50KTtcclxuICB9KTtcclxuXHJcbiAgY29uc29sZS5sb2cobmFtZXMpO1xyXG4gIGNvbnNvbGUubG9nKHVuaXF1ZU5hbWVzKTtcclxuICBcclxufSk7XHJcblxyXG5sZXQgbG9nb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ291dCcpO1xyXG5cclxubG9nb3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9