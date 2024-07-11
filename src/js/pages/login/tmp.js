import {textConst} from './lang.js';

import formTmp from '../../../templates/form/form.hbs';
import inputTmp from '../../../templates/input/input.hbs';
import btn from '../../../templates/btn/btn.hbs';
import linkTmp from '../../../templates/link/link.hbs';

document.addEventListener('DOMContentLoaded', () => {
  if( !document.getElementById('login-article')) {
    return;
  }
  const loginWrap  = document.getElementById('login-article');
  loginWrap.innerHTML = formTmp({uniqId: textConst.uniqId})

  let $inputs = ''
  const loginForm = document.getElementById(textConst.uniqId)
  textConst.inputs.forEach( input => {
    $inputs += inputTmp({
      text: input.text,
      type: input.type,
      name: input.name,
      placeholder: input.placeholder,
    })
  })


  const btns = btn(
    {
      text: textConst.btn,
      addClass: textConst.btnClass
    }
  );

  const link = linkTmp({
    path: textConst.link,
    text: textConst.linkText,
  })

  loginForm.innerHTML = $inputs + btns + link;


});