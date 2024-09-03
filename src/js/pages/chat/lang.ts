// type BasicObj = {
//   [key:string]: string,
// }


export default {
    chatHeaderId: 'chat-header',
    search: {
        placeholder: 'Введите название чата',
        name: 'search',
    },
    chats: [
        {
            img: '',
            name: '',
            desc: '',
            active: false,
        },
    ],
    messageList: [
        {
            avatar: '',
            text: '',
            self: true,
        },
    ],
    profile: {
        avatarId: 'profile__top',
        inputsId: 'profile__info',
        passId: 'profile__pass',
        inputs: [
            {
                text: 'Имя',
                type: 'text',
                name: 'first_name',
                placeholder: 'Введите имя',
                rules: {
                    onlyLatRus: true,
                    firstLetterUpper: true,
                    spaces: false,
                    specialChars: ['-']
                }
            },
            {
                text: 'Фамилия',
                type: 'text',
                name: 'second_name',
                placeholder: 'Введите фамилию',
                rules: {
                    onlyLatRus: true,
                    firstLetterUpper: true,
                    spaces: false,
                    specialChars: ['-']
                }
            },
            {
                text: 'Логин',
                type: 'text',
                name: 'login',
                placeholder: 'Введите логин',
                rules: {
                    minWidth: 3,
                    maxWidth: 20,
                    onlyEng: true,
                    onlyNumber: false,
                    spaces: false,
                    specialChars: ['_', '-'],
                }
            },
            {
                text: 'Отображаемое имя:',
                type: 'text',
                name: 'display_name',
                placeholder: 'Как вас отображать?)',
                rules: {
                    minWidth: 3,
                    maxWidth: 20,
                    onlyNumber: false,
                    specialChars: ['_', '-'],
                }
            },
            {
                text: 'Почта',
                type: 'text',
                name: 'email',
                placeholder: 'Введите почту',
                rules: {
                    email: true,
                }
            },
            {
                text: 'Телефон',
                type: 'tel',
                name: 'phone',
                placeholder: 'Введите телефон',
                rules: {
                    minWidth: 10,
                    maxWidth: 15,
                    onlyNumber: true
                }
            },
        ],
        passInputs: [
            {
                text: 'Старый пароль',
                type: 'password',
                name: 'oldPassword',
                placeholder: 'Введите пароль',
                rules: {},
            },
            {
                text: 'Новый пароль',
                type: 'password',
                name: 'newPassword',
                placeholder: 'Введите пароль',
                rules: {
                    minWidth: 8,
                    maxWidth: 40,
                    evenNumber: true,
                    evenUppercase: true,
                }
            },
            {
                text: 'Повторите новый пароль',
                type: 'password',
                name: 'password-repeat',
                placeholder: 'Введите пароль',
                rules: {
                    minWidth: 8,
                    maxWidth: 40,
                    evenNumber: true,
                    evenUppercase: true,
                    repeatCheck: true,
                }
            },
        ],
    },
};
