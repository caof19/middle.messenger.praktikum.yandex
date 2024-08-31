import { toggleClass } from './methods.js';

document.addEventListener('DOMContentLoaded', ():void => {
    document.body.addEventListener('click', (e:MouseEvent):void => {
      if(e.target && (e.target as HTMLElement).classList.contains('chat__avatar')) {
        toggleClass('.profile', 'profile--active');
      }
    });
});
