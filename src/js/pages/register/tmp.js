import {textConst} from './lang.js';
import formTmp from '../../../templates/form/form.hbs';
import inputTmp from '../../../templates/input/input.hbs';
import btn from '../../../templates/btn/btn.hbs';

document.addEventListener('DOMContentLoaded', () => {
  if(!document.getElementById('register-article')) {
    return;
  }
  const registerWrap  = document.getElementById('register-article');
  registerWrap.innerHTML = formTmp({uniqId: textConst.uniqId})

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
      text: textConst.btnText,
      addClass: textConst.btnClass,
    }
  );

  loginForm.innerHTML = $inputs + btns;
});

