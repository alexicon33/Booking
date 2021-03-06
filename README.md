# Сервис бронирования аудиторий &nbsp;&nbsp;![Gitlab](https://gitlab.com/alexic0n/booking/badges/master/pipeline.svg)
Этот проект --- курсовая работа в рамках Тинькофф Финтех Школы 2021 года.

Текущая версия сайта в проде: https://booking-three.vercel.app/
## Локальный запуск
Примеры данных лежат в файле `data.json`, в качестве основной базы используется Firebase Realtime Database. Локальный запуск проекта:
```
yarn start
```
Если не хочется создавать аккаунт, для доступа к бронированию аудиторий можно воспользоваться аккаунтом с логином и паролем admin.

## Функционал и структура проекта
Есть 2 типа пользователей: администраторы, которые могут бронировать аудитории и приглашать людей на мероприятия, и обычные пользователи, которым расписание мероприятий доступно для просмотра.

##### Страницы:
1. Главная: схема этажа с аудиториями, при наведении на аудиторию отображается расписание мероприятий в ней на ближайшие несколько часов. Для администраторов там же есть ссылки на бронирование аудитории.
2. Страничка с аудиториями: для каждой есть название, фото, расписание на ближайшую неделю. У администраторов есть возможность бронирования.
3. Страничка мероприятия: название, фото, дата, аудитория, забронировавший, описание, список приглашённых пользователей.
4. Личный кабинет
5. Страничка создания мероприятия и бронирования аудитории (доступна для администраторов). Можно управлять всем, что находится на страничке мероприятия. При создании всем участникам отправляется приглашение на почту.
