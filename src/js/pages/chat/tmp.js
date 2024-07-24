import {textConst} from './lang.js';

import chatHeader from '../../../templates/pages/chat/chat_header/chat_header.hbs'
import chatItem from '../../../templates/pages/chat/chat_item/chat-item.hbs'
import inputTmp from '../../../templates/input/input.hbs';
import btnTmp from '../../../templates/btn/btn.hbs'
import messageItemTmp from '../../../templates/pages/chat/message_item/message_item.hbs'
import profileTmp from '../../../templates/pages/chat/profile/profile.hbs'

document.addEventListener('DOMContentLoaded', () => {
  if( !document.getElementById('chat__side')) {
    return;
  }
  const chatSideWrap  = document.getElementById('chat__side');
  chatSideWrap.innerHTML = chatHeader({headerId: textConst.chatHeaderId})

  document.getElementById(textConst.chatHeaderId).innerHTML += inputTmp({name: textConst.search.name, placeholder: textConst.search.placeholder})


  let chats = '';

  textConst.chats.forEach(item => {
    chats += chatItem({
      img: item.img,
      name: item.name,
      desc: item.desc,
      active: item.active
    })
  })
  chatSideWrap.innerHTML += chats;

  if( !document.getElementById('chat__workflow')) {
    return;
  }
  const chatWorkflow= document.getElementById('chat__workflow');

  const messageWrap = document.createElement('div');
  messageWrap.classList.add('messages');

   messageItemTmp({
    avatar: ``
  })
  textConst.messageList.forEach(item => {
    messageWrap.innerHTML += messageItemTmp({
      avatar: item.avatar,
      text: item.text,
      self: item.self,
    })
  })

  chatWorkflow.innerHTML += profileTmp({
    avatarId: textConst.profile.avatarId,
    inputsId: textConst.profile.inputsId,
    passId: textConst.profile.passId,
    avatar: 'https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'
  })

  document.getElementById(textConst.profile.avatarId).innerHTML += btnTmp({text: 'Заменить фото'})

  const profileInfo = document.getElementById(textConst.profile.inputsId)

  textConst.profile.inputs.forEach(item => {
    profileInfo.innerHTML += inputTmp({
      name: item.name,
      text: item.text,
      placeholder: item.placeholder,
      type: item.type,
    })
  })

  const passInfo = document.getElementById(textConst.profile.passId);

  textConst.profile.passInputs.forEach(item => {
    passInfo.innerHTML += inputTmp({
      name: item.name,
      text: item.text,
      placeholder: item.placeholder,
      type: item.type,
    })
  })

  document.getElementById('profile__btn').innerHTML = btnTmp({text: 'Сохранить'})

  chatWorkflow.append(messageWrap);




  const messageInput = document.createElement('form');
  messageInput.classList.add('chat__inputs');



  messageInput.innerHTML += inputTmp({
    name: 'message',
    placeholder: 'Введите сообщение',
  });

  messageInput.innerHTML += btnTmp()

  chatWorkflow.append(messageInput);
});

