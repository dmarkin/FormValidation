 **Validation of form**
Condition:
Validate form fields must be in the process of filling (but not show error messages until user has entered something).
Form will not be sent by click, if there are errors. In this case, the submit button must to be inactive.
Fields with an error should be highlighted, indicating the specific error.

 Possible error situations:
* The field must be filled, not filled
* Error in email (checked using regexp)
* email is already registered (consult with [a static list of email-s, which is stored in the global variable usedEmails,] or by reference ajax-request to the server https://aqueous-reaches-8130.herokuapp.com/)
* The password is too short (five characters or less)
* Password is too easy (only numbers, only letters)
* Password contains illegal characters (allowed - letters, numbers, underscore and hyphen)
* International telephone recording format (+ 38xxxxxxxxxx) is not sustained
* Checkbox "I agree with everything" is not checked
* Name and data - alphanumeric characters

 *Solution works in IE9+*




 **Валидация формы**
Условие:
Валидировать поля формы необходимо в процессе набора (но не показывать ошибки до того, как пользователь что-то ввел).
Форма не должна отправляться по клику, если при заполнении возникли ошибки.
В этом случае кнопка отправки формы должна быть неактивной. Поля с ошибкой должны подсвечиваться, сообщая о конкретной ошибке.

 Возможные ошибочные ситуации:
* Поле, обязательное для заполнения, не заполнено
* Ошибка в email (проверяется при помощи regexp)
* email уже зарегистрирован (сверяться либо со статическим списком email-ов, который хранится на глобальном уровне в переменной usedEmails, либо путем отсылки ajax-запроса на сервер https://aqueous-reaches-8130.herokuapp.com/
* Пароль слишком короткий (5 или менее символов)
* Пароль слишком простой (только числа, только буквы)
* Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)
* Международный формат записи телефона (+38xxxxxxxxxx) не выдержан
* Checkbox "Согласен со всем" не отмечен
* Имя и данные - буквенно-цифровые символы

 *Реализация работает в IE9+*