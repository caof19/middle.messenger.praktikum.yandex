export const textConst = {
  chatHeaderId: 'chat-header',
  search: {
    placeholder: 'Введите название чата',
    name: 'search'
  },
  chats: [
    {
      img: '',
      name: 'Приветствие',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 1,
      active: false,
    },
    {
      img: '',
      name: 'Зачем нужны телеграм боты?',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 2,
      active: true,
    },
    {
      img: '',
      name: 'Обычные боты для проверки подписок',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 3,
      active: false,
    },
    {
      img: '',
      name: 'Боты для автоматизации / сигналов',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 4,
      active: false,
    },
    {
      img: '',
      name: 'Боты FAQ',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 5,
      active: false,
    },
    {
      img: '',
      name: 'Интеграция разных сервисов',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 6,
      active: false,
    },
    {
      img: '',
      name: 'Общение с клиентами',
      desc: 'Доборого времени суток, вы здесь потому что вы ывавфыаываыв',
      chatId: 7,
      active: false,
    },
  ],
  messageList: [
    {
      avatar: 'https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg',
      text: '<p>Тестирование</p>',
      self: true,
    },
    {
      avatar: 'https://img.freepik.com/premium-vector/male-avatar-black-hipster-face-with-modern-hairstyle-isolated-white-background_80590-19954.jpg',
      text: '<p>Тестирование</p><p>Абзацев</p>',
      self: false,
    },
    {
      avatar: 'https://img.freepik.com/premium-vector/male-avatar-black-hipster-face-with-modern-hairstyle-isolated-white-background_80590-19954.jpg',
      text: '<p>Тестирование <a href="https://google.com" target="_blank">ссылок</a></p>',
      self: false,
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
        placeholder: 'Введите имя'
      },
      {
        text: 'Фамилия',
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите фамилию'
      },
      {
        text: 'Логин',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин'
      },
      {
        text: 'Отображаемое имя:',
        type: 'text',
        name: 'display_name',
        placeholder: 'Как вас отображать?)'
      },
      {
        text: 'Почта',
        type: 'text',
        name: 'email',
        placeholder: 'Введите почту'
      },
      {
        text: 'Телефон',
        type: 'tel',
        name: 'phone',
        placeholder: 'Введите телефон'
      },
    ],
    passInputs: [
      {
        text: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        placeholder: 'Введите пароль'
      },
      {
        text: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        placeholder: 'Введите пароль'
      },
      {
        text: 'Повторите новый пароль',
        type: 'password',
        name: 'password-repeat',
        placeholder: 'Введите пароль'
      },
    ]
  }
}