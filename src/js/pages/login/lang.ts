export const textConst = {
  uniqId: 'login-form',
  btn: 'Войти',
  btnClass: 'btn__login',
  link: 'register.html',
  linkText: 'Впервые?',
  inputs: [
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
  ],
};
