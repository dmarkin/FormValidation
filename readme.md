 **Validation of form**
 Condition:
 Validate form fields must be in the process of filling (but not show error messages until user has entered something).
 Form will not be sent by click, if there are errors. In this case, the submit button must to be inactive.
 Fields with an error should be highlighted, indicating the specific error.

 Possible error situations:
 1. The field must be filled, not filled
 2. Error in email (checked using regexp)
 3. email is already registered (consult with [a static list of email-s, which is stored in the global variable usedEmails,] or by reference ajax-request to the server https://aqueous-reaches-8130.herokuapp.com/)
 4. The password is too short (five characters or less)
 5. Password is too easy (only numbers, only letters)
 6. Password contains illegal characters (allowed - letters, numbers, underscore and hyphen)
 7. International telephone recording format (+ 38xxxxxxxxxx) is not sustained
 8. Checkbox "I agree with everything" is not checked
 9. Name and data - alphanumeric characters

 *Solution works in IE9+*




 **Валидация формы**
 Условие:
 Валидировать поля формы необходимо в процессе набора (но не показывать ошибки до того, как пользователь что-то ввел).
 Форма не должна отправляться по клику, если при заполнении возникли ошибки.
 В этом случае кнопка отправки формы должна быть неактивной. Поля с ошибкой должны подсвечиваться, сообщая о конкретной ошибке.

 Возможные ошибочные ситуации:
 1. Поле, обязательное для заполнения, не заполнено
 2. Ошибка в email (проверяется при помощи regexp)
 3. email уже зарегистрирован (сверяться либо со статическим списком email-ов, который хранится на глобальном уровне в переменной usedEmails, либо путем отсылки ajax-запроса на сервер https://aqueous-reaches-8130.herokuapp.com/
 4. Пароль слишком короткий (5 или менее символов)
 5. Пароль слишком простой (только числа, только буквы)
 6. Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)
 7. Международный формат записи телефона (+38xxxxxxxxxx) не выдержан
 8. Checkbox "Согласен со всем" не отмечен
 9. Имя и данные - буквенно-цифровые символы

 *Реализация работает в IE9+*