import textConst from './lang';

import ChatWrapper from "../../../templates/pages/chat/ChatWrapper";
import ChatHeader from "../../../templates/pages/chat/chat_header/ChatHeader";
import Input from "../../../templates/input/Input";
import ChatItem from "../../../templates/pages/chat/chat_item/ChatItems";
import Profile from "../../../templates/pages/chat/profile/Profile";
import Button from "../../../templates/btn/Btn";
import MessageItem from "../../../templates/pages/chat/message_item/MessageItem";
import Form from "../../../templates/form/Form";

document.addEventListener('DOMContentLoaded', () => {

  const buttonMsg = new Button({});

  const inputMsg = new Input({data: {
    placeholder: 'Введите сообщение',
    type: 'text',
    name: 'message',
  }});

  const chatInput = new Form({
    attr: {
      class: 'chat__inputs'
    },
    children: {
      inputSection: [inputMsg],
      buttonSection: [buttonMsg]
    }
  })

  const msgList:Array<MessageItem> = []
  const {messageList} = textConst;

  messageList.forEach(msg => {
    msgList.push(new MessageItem({
      data: {
        avatar: msg.avatar,
        text: msg.text,
        self: msg.self,
      }
    }))
  })

  const {inputs: profileInputs, passInputs} = textConst.profile;

  const profileFields:Array<Input> = [];
  profileInputs.forEach(input => {
    profileFields.push(
        new Input({data: {
            text: input.text,
            type: input.type,
            name: input.name,
            placeholder: input.placeholder,
            rules: input.rules
          }})
    )
  })
  
  const passFields:Array<Input> = [];
  passInputs.forEach(input => {
    passFields.push(
        new Input({ data: {
          text: input.text,
          type: input.type,
          name: input.name,
          placeholder: input.placeholder,
          rules: input.rules
        }})
    )
  })

  const profileSaveBtn = new Button({
    data: {
      text: 'Сохранить'
    }
  })
  
  const passSaveBtn = new Button({
    data: {
      text: 'Сохранить'
    }
  })

  const avatarSaveBtn = new Button({
    data: {
      text: 'Заменить фото'
    }
  })

  const formProfile = new Form({
    attr: {
      class: 'form'
    },
    children: {
      inputSection: profileFields,
      buttonSection: [profileSaveBtn],
    }
  })

  const formPass = new Form({
    attr: {
      class: 'form'
    },
    children: {
      inputSection: passFields,
      buttonSection: [passSaveBtn],
    }
  })

  const profile = new Profile({
    data: {
      avatar: 'https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'
    },
    children: {
      profileInfoSection: [formProfile],
      passInfoSection: [formPass],
      btnSection: [profileSaveBtn],
      btnAvatarSection: [avatarSaveBtn],
    }
  });


  const {chats} = textConst;
  const chatsSec:Array<ChatItem> = [];

  chats.forEach(chat => {
    chatsSec.push(
        new ChatItem({
          data: {
            img: chat.img,
            name: chat.name,
            desc: chat.desc,
            active: chat.active,
          }
        })
    )
  })



  const {search} = textConst;
  const searchInput = new Input({
    data: {
      placeholder: search.placeholder,
      name: search.name
    }
  })

  const chatHeader = new ChatHeader({
    children: {
      searchSection: [searchInput],
    }
  })

  const wrapper = new ChatWrapper({
    children: {
      chatHeaderSection: [chatHeader],
      chatListSection: chatsSec,
      chatProfileSection: [profile],
      chatMsgsSection: msgList,
      chatInputsSection: [chatInput],
    },
    attr: {
      class: 'full-width chat',
    },
  });

  wrapper.insertToDOM('.chat');
  // chatHeader.compile();
  // profile.compile();
  // chatInput.compile();
  // formProfile.compile();
  // formPass.compile();
  // if (!document.getElementById('chat__side')) {
  //   return;
  // }
  // const chatSideWrap = document.getElementById('chat__side');
  //
  // if(!chatSideWrap) {
  //   return;
  // }
  //
  // chatSideWrap.innerHTML = chatHeader({ headerId: textConst.chatHeaderId });
  //
  // const chatHeaderElem = document.getElementById(textConst.chatHeaderId);
  //
  // if(chatHeaderElem) {
  //   chatHeaderElem.innerHTML += inputTmp({
  //     name: textConst.search.name,
  //     placeholder: textConst.search.placeholder
  //   });
  // }
  //
  // let chats = '';
  //
  // textConst.chats.forEach((item) => {
  //   chats += chatItem({
  //     img: item.img,
  //     name: item.name,
  //     desc: item.desc,
  //     active: item.active,
  //   });
  // });
  // chatSideWrap.innerHTML += chats;
  //
  // const chatWorkflow = document.getElementById('chat__workflow');
  //
  // if(!chatWorkflow) {
  //   return;
  // }
  //
  // const messageWrap = document.createElement('div');
  // messageWrap.classList.add('messages');
  //
  // messageItemTmp({
  //   avatar: '',
  // });
  // textConst.messageList.forEach((item) => {
  //   messageWrap.innerHTML += messageItemTmp({
  //     avatar: item.avatar,
  //     text: item.text,
  //     self: item.self,
  //   });
  // });
  //
  // chatWorkflow.innerHTML += profileTmp({
  //   avatarId: textConst.profile.avatarId,
  //   inputsId: textConst.profile.inputsId,
  //   passId: textConst.profile.passId,
  //   avatar: 'https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg',
  // });
  //
  // const avatarElem = document.getElementById(textConst.profile.avatarId);
  // if(avatarElem) {
  //   avatarElem.innerHTML += btnTmp({text: 'Заменить фото'});
  // }
  //
  // const profileInfo = document.getElementById(textConst.profile.inputsId);
  //
  // if(profileInfo) {
  //   textConst.profile.inputs.forEach((item) => {
  //     profileInfo.innerHTML += inputTmp({
  //       name: item.name,
  //       text: item.text,
  //       placeholder: item.placeholder,
  //       type: item.type,
  //     });
  //   });
  // }
  //
  // const passInfo = document.getElementById(textConst.profile.passId);
  //
  // if(passInfo) {
  //   textConst.profile.passInputs.forEach((item) => {
  //     passInfo.innerHTML += inputTmp({
  //       name: item.name,
  //       text: item.text,
  //       placeholder: item.placeholder,
  //       type: item.type,
  //     });
  //   });
  // }
  //
  // const profileBtn = document.getElementById('profile__btn');
  //
  // if(profileBtn) {
  //   profileBtn.innerHTML = btnTmp({text: 'Сохранить'});
  // }
  //
  // chatWorkflow.append(messageWrap);
  //
  // const messageInput = document.createElement('form');
  // messageInput.classList.add('chat__inputs');
  //
  // messageInput.innerHTML += inputTmp({
  //   name: 'message',
  //   placeholder: 'Введите сообщение',
  // });
  //
  // messageInput.innerHTML += btnTmp({});
  //
  // chatWorkflow.append(messageInput);
});
