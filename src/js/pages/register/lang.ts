export const textConst = {
    uniqId: 'register-form',
    btnText: 'Создать пользователя',
    btnClass: 'btn__reg',
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
            text: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Введите почту',
            rules: {
                email: true,
            }
        },
        {
            text: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
            rules: {
                minWidth: 8,
                maxWidth: 40,
                evenNumber: true,
                evenUppercase: true,
            }
        },
        {
            text: 'Повторите пароль',
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
        }
    ],
};
