import Block from "../../../../js/libs/Block";
import chatItemTemplate from './chat-item.hbs'
import {NestedObject} from "../../../../js/libs/Types.ts";
import User from "../../../../js/libs/User.ts";
import Chat from "../../../../js/libs/Chat.ts";
import chat from "../../../../js/pages/chat/tmp.ts";


export default class ChatItem extends Block {
    constructor(props:NestedObject) {
        super('div', Object.assign(props, {attr: {
            class: 'chat__item',
            },
            events: {
                click: () => {

                    const allLocalChats = chat.getWrapper().getChildren('chatListSection')
                    allLocalChats?.forEach(item => {
                        item.updatePropsData('active', false);
                    })

                    const chatId = this.getData<number>('id');
                    this.updatePropsData('active', true);

                    if(!chatId) {
                        return;
                    }

                    const user = new User();
                    const chatModel = new Chat();

                    chatModel.connect(user.getId(), chatId);
                },
                contextmenu: (e:PointerEvent) => {
                    e.preventDefault();
                    const $contextMenu:HTMLElement = document.querySelector('.chat__context') as HTMLElement;
                    const chat = new Chat();
                    const chatId = this.getData<number>('id');

                    if(!$contextMenu) {
                        return;
                    }
                    if(!chatId) {
                        return;
                    }


                    const x = e.clientX + 10,
                        y = e.clientY;

                    $contextMenu.style.left = x + 'px';
                    $contextMenu.style.top = y + 'px';
                    $contextMenu.style.display = 'block';

                    chat.setChatIdToAdd(chatId);
                }
            }
        }));
    }

    render() {
        return chatItemTemplate({
            img: this.getData<string>('img'),
            name: this.getData<string>('name'),
            desc: this.getData<string>('desc'),
            active: this.getData<string>('active'),
        })
    }
}
