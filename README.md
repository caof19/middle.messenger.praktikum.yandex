# Проект "Веб чат"

# Обновления
## Спринт номер 2

Добавлено:
- Добавлен класс Block, от которого наследуются все компоненты во фронт части, позволяющей работать не с DOM, а с данными напрямую. Тем самым обновляя "верстку" и заполняя ее актуальными данными
- Класс Block может работать со множественной вложенностью компонентов
- Добавлен класс FormModel. На данный момент этот класс предназначен для валидации полей в формах
- Добавлен класс Req предназначенный для xhr запросов
- Добавлен esLint и исправлены все ошибки
- Добавлен Typescript, произведена типизации, согласно рекомендациям проверки
- Все формы при отправке выводят в консоль только заполненные данные
- Ко всем формам подключена валидация при отправке, так же валидация происходит при потери фокуса над полем


## Для чего этот проект?
Этот проект предназначен для тренировки своих навыков в front-end области.

Проект (будет) представляет из себя spa веб чат приложения с возможностью (список будет пополняться):
- Регистрации
- [x] Верстка
- [ ] Реализация
- Авторизации
- [x] Верстка
- [ ] Реализация
- Список чатов
- [x] Верстка
- [ ] Реализация
- Переписка между пользователями
- [x] Верстка
- [ ] Реализация
- Профиль
- [x] Верстка
- [ ] Реализация

Особенность данного проекта является полное отсутствие библиотек, только ванила, только хардкор

Дизайн был разработан мной (цветовая схема взята с другого сайта и чатисно телеграмма) [Тык](https://www.figma.com/design/C2L3zICqKdIaLfmufotRci/Untitled?node-id=0-1)

Изначально дизайн разрабатывался как сайт-портфолио по написанию телеграмм ботов, но был заброшен. А сейчас пригодился

Страницы сайта (даже урл интересный урвал)

https://deploy--superwebchat.netlify.app/ - авторизация (она же главная)

https://deploy--superwebchat.netlify.app/register - страница регистрации

https://deploy--superwebchat.netlify.app/chats - страница чатов/рабочей области и профиля

https://deploy--superwebchat.netlify.app/404 и https://deploy--superwebchat.netlify.app/50x

Чтоб открыть профиль нужно клацнуть на иконку слева от поиска (который находится в левом верхнем углу)

Переход между страницами сделан сейчас через js, по нажатию на button

Мобильная версия не предусмотренна (в целом чат предназначен для мониторов от 1024 в ширину)

### Как запустить проект?

    npm run dev

Запускает проект в watch режиме на 5173 порту

    npm run build

Собирает приложение и помещает его в папку /dist

    npm run start

Собирает приложение и запускает его на 3000 порту
    
    npm run eslint

Проверяет на ошибки eslint

    npm run ts

Проверяет на ошибки ts

    npm run stylelint

Проверяет на ошибки stylelint

Пришлось отключить некоторые файлы из проверки stylelint, потому что он ругается на использование миксинов в этих файлах, как бы я их не подключал

Так же пришлось добавить в игнор src/css/entry.less, в котором все импорты, stylelint говорить что нужно испортировать через url, как только импортируешь через url, хоть по относительному пути, хоть по абсолютному, то сборка пишет, что файл не найден и показывает путь /src/css/templates/pages/chat/chat_item/index.less, несмотря на то что там стоит "../"

## Если честно, не знаю можно ли так общаться с ревьвером, но у меня есть вопрос: На сколько такая организация файлов жизнеспособна? Первый раз организую так и не могу понять, иногда путаюсь. То ли дело в том что я еще не привык к такой удобной организации, то ли она будет проблемной в дальнейшем. Можно ее как то улучшить?


