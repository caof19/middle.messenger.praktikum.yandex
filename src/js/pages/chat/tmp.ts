import textConst from './lang';

import ChatWrapper from "../../../templates/pages/chat/ChatWrapper";
import ChatHeader from "../../../templates/pages/chat/chat_header/ChatHeader";
import Input from "../../../templates/input/Input";
import ChatItem from "../../../templates/pages/chat/chat_item/ChatItems";
import Profile from "../../../templates/pages/chat/profile/Profile";
import Button from "../../../templates/btn/Btn";
import MessageItem from "../../../templates/pages/chat/message_item/MessageItem";
import Form from "../../../templates/form/Form";
import Composition from "../../libs/Composition.ts";
import User from "../../libs/User.ts";
import Chat from "../../libs/Chat.ts";
import Block from "../../libs/Block.ts";
import {DefaultObjectString} from "../../libs/Types.ts";
import MessageListItem from "../../../templates/pages/chat/chat_list/ChatListItem.ts";
import ProfileAvatar from "../../../templates/pages/chat/profile_avatar/ProfileAvatar.ts";
import {RES_DOMAIN} from "../../../constants.ts";


const chat = new Composition();


chat.composit(() => {
    const buttonMsg = new Button({});

    const inputMsg = new Input({
        data: {
            placeholder: 'Введите сообщение',
            type: 'text',
            name: 'message',
        }
    });

    const chatInput = new Form({
            attr: {
                class: 'chat__inputs'
            },
            children: {
                inputSection: [inputMsg],
                buttonSection: [buttonMsg]
            }
        },
        function (value) {
            const actualChat = new Chat();

            actualChat.sendMessage(value.message);

            inputMsg.setPropsData({value: ''});


        })

    const msgList: Array<MessageItem> = []
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

    const profileFields: Array<Input> = [];
    profileInputs.forEach(input => {
        profileFields.push(
            new Input({
                data: {
                    text: input.text,
                    type: input.type,
                    name: input.name,
                    placeholder: input.placeholder,
                    rules: input.rules
                }
            })
        )
    })

    chat.setLinkToValue('profileInputs', profileFields);

    const passFields: Array<Input> = [];
    passInputs.forEach(input => {
        passFields.push(
            new Input({
                data: {
                    text: input.text,
                    type: input.type,
                    name: input.name,
                    placeholder: input.placeholder,
                    rules: input.rules
                }
            })
        )
    })

    chat.setLinkToValue('passInputs', passFields)

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

    const avatarSaveBtn = new ProfileAvatar({
        events: {
            change: function (e:InputEvent) {
                const files = (e.target as HTMLInputElement).files;
                if(files && files.length) {
                    const needleFile = files[0];

                    const user = new User();
                    const formData = new FormData();

                    formData.append('avatar', needleFile, needleFile.name);

                    user.changeAvatar(formData).then(res => {
                        if(res.status === 200) {
                            const userInfo = JSON.parse(res.responseText);
                            const profile = chat.getValueByLink('profile')[0];
                            if(!profile) {
                                return;
                            }

                            profile.setPropsData({avatar:RES_DOMAIN+userInfo.avatar})
                        } else {
                            alert(JSON.parse(res.responseText).reason);
                        }
                    });
                }
            }
        }

    })

    const addChatBtn = new Button({
        data: {
            text: '+',
            class: 'btn--big',
        },
        events: {
            click: function () {
                const chatName = prompt('Введите название нового чата');

                const chatModel = new Chat();
                if (chatName) {
                    const chatObj = {title: chatName}
                    chatModel.addNew(chatObj).then(res => {
                        if (res.status === 200) {
                            const addedChat = JSON.parse(res.responseText);

                            chat.getWrapper().addPropsChildren('chatListSection',
                                new ChatItem({
                                    data: {
                                        img: '',
                                        name: chatName,
                                        desc: 'Чат создан',
                                        active: false,
                                        id: addedChat.id,
                                        hide: false,
                                    }
                                }), true)
                        }
                    });
                }
            }
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
    }, (valuse) => {
        const user = new User();

        user.changeProfile(valuse).then(res => {
            if (res.status === 200) {
                alert('Данные профиля успешно поменяли')
            } else {
                alert(JSON.parse(res.responseText).reason);
            }
        })
    })

    const formPass = new Form({
        attr: {
            class: 'form'
        },
        children: {
            inputSection: passFields,
            buttonSection: [passSaveBtn],
        }
    }, function (values) {
        const user = new User();

        user.changePass(values).then(res => {
            if (res.status === 200) {
                alert('Успешная смена пароля');
                passFields.forEach(input => {
                    input.setPropsData({value: ''})
                })
            } else {
                alert(JSON.parse(res.responseText).reason);
            }
        })
    })

    const logOutBtn = new Button({
        data: {
            text: 'Выйти'
        },
        events: {
            click() {
                const user = new User();

                user.logout()
                chat.navigate('/');
            }
        }
    })

    const profile = new Profile({
        data: {
            avatar: 'https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'
        },
        children: {
            profileInfoSection: [formProfile],
            passInfoSection: [formPass],
            btnSection: [logOutBtn],
            btnAvatarSection: [avatarSaveBtn],
        }
    });

    chat.setLinkToValue('profile', [profile]);


    const {chats} = textConst;
    const chatsSec: Array<ChatItem> = [];

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
        },
        events: {
            keyup: function (e: Event) {
                const needle = (e.target as HTMLInputElement).value;
                const chatList = chat.getWrapper().getChildren('chatListSection');

                if (!chatList) {
                    return;
                }

                chatList.forEach(chatLocal => {
                    const chatName = chatLocal.getData<string>('name');

                    if (!chatName) {
                        return;
                    }

                    chatLocal.setProps({attr: {class: 'chat__item'}});

                    if (needle.length > 1) {
                        if (!chatName.toLowerCase().includes(needle.toLowerCase())) {
                            chatLocal.setProps({attr: {class: 'chat__item chat__item--hide'}});
                        }
                    }
                })
            }
        }
    })

    const chatHeader = new ChatHeader({
        children: {
            searchSection: [searchInput],
        }
    })

    const addUserToChat = new MessageListItem({
        data: {
            text: 'Добавить пользователя'
        },
        events: {
            click: function () {
                const login = prompt('Введите логин');

                if(login) {
                    const user = new User();
                    const chatModel = new Chat()

                    user.searchUser(login).then(res => {
                        if(res.status === 200) {
                            const obj = JSON.parse(res.responseText);
                            if(!obj) {
                                return;
                            }
                            const userId = obj[0].id;

                            chatModel.addNewMemberToChat(userId);

                        }
                    })
                }
            }
        }
    })

    const removeUserFromChat = new MessageListItem({
        data: {
            text: 'Удалить пользователя'
        },
        events: {
            click: function () {
                const login = prompt('Введите логин');

                if(login) {
                    const user = new User();
                    const chatModel = new Chat()

                    user.searchUser(login).then(res => {
                        if(res.status === 200) {
                            const obj = JSON.parse(res.responseText);
                            if(!obj) {
                                return;
                            }
                            const userId = obj[0].id;

                            chatModel.removeMemberFromChat(userId);

                        }
                    })
                }
            }
        }
    })

    const parent = {
        children: {
            chatHeaderSection: [chatHeader],
            chatListSection: chatsSec,
            chatProfileSection: [profile],
            chatMsgsSection: msgList,
            chatInputsSection: [chatInput],
            addChatSection: [addChatBtn],
            contextChatSection: [addUserToChat,removeUserFromChat],
        },
        attr: {
            class: 'full-width chat',
        },
    }

    return parent;
})

chat.addBeforeRender(async () => {
    const user = new User();
    const chats = new Chat();

    const responseInfo = await user.getInfo();

    /**/
    if (responseInfo.status == 200 && responseInfo.responseText) {
        const userInfo = JSON.parse(responseInfo.responseText);
        const userInputs = chat.getValueByLink('profileInputs');

        user.setId(userInfo.id);
        userInputs.forEach(input => {
            const key = input.getData<string>('name');
            if (key && userInfo[key] && userInfo[key].length > 0) {
                input.setPropsData({value: userInfo[key]});
            }
        })

        const profile = chat.getValueByLink('profile')[0];
        if(!profile) {
            return;
        }

        profile.setPropsData({avatar:RES_DOMAIN+userInfo.avatar})
    } else {
        chat.navigate('/');
        return;
    }

    const allChatsResponse = await chats.getAll();
    if (allChatsResponse) {
        const chatList = JSON.parse(allChatsResponse.responseText);
        const newChats: Array<Block> = []
        if (chatList.length) {
            chatList.forEach((chatServer: DefaultObjectString) => {
                let lastMsg = 'Чат создан';
                if (chatServer.last_message) {
                    const lastMessage = chatServer.last_message as unknown as { content: string };
                    lastMsg = lastMessage.content;
                }
                newChats.push(new ChatItem({
                    data: {
                        img: chatServer.avatar,
                        name: chatServer.title,
                        desc: lastMsg,
                        active: false,
                        id: chatServer.id
                    }
                }))
            })
            chat.getWrapper().updatePropsChildren('chatListSection', newChats);
        }
    }
})
chat.setWrapper(new ChatWrapper(chat.props));
chat.addWrapperClass('chat');
chat.addBodyClass('page--chats');

export default chat;
