import { toggleClass } from './methods.js';

console.log(88);

document.addEventListener('DOMContentLoaded', ():void => {
  const avatarElem:Element|null = document.querySelector('.chat__avatar')
  if (avatarElem) {
    avatarElem.addEventListener('click', ():void => {
      toggleClass('.profile', 'profile--active');
    });
  }
});
