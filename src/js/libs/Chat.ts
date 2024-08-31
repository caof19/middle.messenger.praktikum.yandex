import Req from "./Request.ts";
import {DOMAIN, RES_DOMAIN} from "../../constants.ts";
import {DefaultObjectString} from "./Types.ts";
import chat from "../pages/chat/tmp.ts";
import MessageItem from "../../templates/pages/chat/message_item/MessageItem.ts";
import User from "./User.ts";
import Block from "./Block.ts";
interface IUser {
    id: number;
    avatar: string;
}
// import {WebSocket} from "vite";

export default class Chat {
    private server: Req;
    private socket: WebSocket;
    private chatId: number;
    private WSSDomain = 'wss://ya-praktikum.tech/ws/chats/';
    private chatIdToAdd = 0;
    private usersAvatar:{[key:number]:string} = {};

    public static instance: Chat;


    constructor() {
        this.server = new Req();

        if (Chat.instance) {
            return Chat.instance;
        }

        Chat.instance = this;
    }

    public addNew(chatName: DefaultObjectString) {
        return this.server.post(DOMAIN + '/chats', {data: chatName});
    }

    public getAll() {
        return this.server.get(DOMAIN + '/chats')
    }

    public connect(userId: number, chatId: number) {
        if (this.socket) {
            this.socket.close();
        }
        this.chatId = chatId;
        this.getToken().then(res => {
            if (res.status === 200) {
                let token = JSON.parse(res.responseText).token;

                this.socket = new WebSocket(this.WSSDomain + userId + '/' + chatId + '/' + token);

                this.socket.addEventListener('message', res => {
                    const msg = JSON.parse(res.data);
                    if(msg.type !== 'user connected') {
                        this.sendMsgToView(msg)
                    }
                })

                this.socket.addEventListener('open', () => {
                    this.socket.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));


                    setTimeout(() => {
                        if(document.querySelector('.messages')) {
                            document.querySelector('.messages')?.scrollTo(99999, document.body.scrollHeight);
                        }
                    }, 500)
                })

                this.socket.addEventListener('error', (event:ErrorEvent) => {
                    console.log('Ошибка', event.message);
                });
            }
        });

        this.getAllUsers().then(res => {
            if(res.status === 200) {
                const users = JSON.parse(res.responseText);


                users.forEach((user:IUser) => {
                    if(!this.usersAvatar[user.id]) {
                        this.usersAvatar[user.id] = '';
                    }
                    this.usersAvatar[user.id] = user.avatar;
                })

            } else {
                alert(JSON.parse(res.responseText).reason);
            }
        });
    }

    public sendMessage(message: string) {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                content: message,
                type: 'message',
            }));
        }
    }

    public addNewMemberToChat(userId:number) {
        let addToChat = {
            users: [userId],
            chatId: this.chatIdToAdd,
        };

        this.server.put(DOMAIN+'/chats/users', {data:addToChat});
    }

    public removeMemberFromChat(userId:number) {
        let rmFromChat = {
            users: [userId],
            chatId: this.chatIdToAdd,
        };

        this.server.delete(DOMAIN+'/chats/users', {data:rmFromChat});
    }

    public setChatIdToAdd(chatId: number) {
        this.chatIdToAdd = chatId;
    }

    public getAllUsers() {
        return this.server.get(DOMAIN + '/chats/'+this.chatId+'/users');
    }

    private getToken() {
        return this.server.post(DOMAIN + '/chats/token/' + this.chatId, {});
    }

    private sendMsgToView(message: Array<DefaultObjectString> | DefaultObjectString) {
        let msgList:Array<Block> = [];
        let user = new User();
        if (Array.isArray(message)) {
            message.forEach(msg => {
                msgList.unshift(new MessageItem({
                    data: {
                        avatar: RES_DOMAIN+this.usersAvatar[+msg.user_id],
                        text: msg.content,
                        self: +msg.user_id === user.getId(),
                    }
                }))
            })

            chat.getWrapper().updatePropsChildren('chatMsgsSection', msgList);
        } else {
            let newMsg = new MessageItem({
                    data: {
                        avatar: RES_DOMAIN+this.usersAvatar[+message.user_id],
                        text: message.content,
                        self: +message.user_id === user.getId(),
                    }
                });
            chat.getWrapper().addPropsChildren('chatMsgsSection',newMsg);
        }

    }
}