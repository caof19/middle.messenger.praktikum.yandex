import {toggleClass} from "./methods.js";

document.addEventListener('DOMContentLoaded', () => {

  if(document.querySelector('.chat__avatar')) {
    document.querySelector('.chat__avatar').addEventListener('click', function () {
      toggleClass('.profile', 'profile--active')
    });
  }

  const hrefClasses = {
    '.btn__login': '/chat.html',
    '.btn__reg': '/chat.html',
  }

  Object.keys(hrefClasses).forEach(item => {
    if(document.querySelector(item)) {
      document.querySelector(item).addEventListener('click', function (e) {
        e.preventDefault();
        console.log(99);
        location.href = '/chats.html'
      })
    }
  })
})


