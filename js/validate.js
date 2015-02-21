/*Валидировать поля формы надо в процессе набора (но не показывать ошибки до того, как пользователь что-то ввел).
 Форму нельзя мочь отправить, если есть ошибки. Если показаны ошибки, кнопка отправки формы должна быть неактивной
 (код неактивной кнопки закомментирован).
 Поля с ошибкой должны подсвечиваться должным образом (который можно увидеть, раскомментировав код на бутстрап странице).

 Возможные ошибочные ситуации. Для каждой придумать и выводить поясняющее сообщение. Из сообщения должно быть ясно в чем проблема.
 +1. Поле, обязательное к заполнению не заполнено
 +2. Ошибка в email-е
 +3. email уже занят (сверяться со статическим списком email-ов, который хоранится на глобальном уровне в переменной usedEmails)
 ['author@mail.com', 'foo@mail.com', 'tester@mail.com']
 +4. Пароль слишком короток (до 5 символов)
 +5. Простой пароль (только числа, только буквы)
 +6. Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)
 +7. Международный формат записи телефона не выдержан
 +8. Галочка "Согласен со всем" не поставлена
 +9. Имя и данные - буквенно-цифровые символы
 Решение должно работать в IE9+*/


(function validateForm() {
    'use strict';

    var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
    var form = window.document.querySelector('form');
    var submitButton = window.document.querySelector('.btn-primary');
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var city = document.querySelector('#city');
    var phone = document.querySelector('#phone');
    var checkBox = document.querySelector('input[type=checkbox]');
    var isAlerts = [email, password];
    var validateEmailId = null;
    var validatePassId = null;
    var validateCityId = null;
    var validatePhoneId = null;
    var currentEmail = null;
    delegateEvents();

    function delegateEvents() {
        /*По поводу начального состояние сабмита: disabled, исходя из соображений юзабилити.
         Если делать его с самого начала enabled, тогда нужно будет дополнительно предусмотреть,
         что без заполнения формы пользователь может нажать на submit. Соответственно, нужно создавать
         отдельный обработчик на этот случай и подсвечивать незаполненные обязательные поля и при этом отключать кнопку.
         В то же время лейблы и так говорят пользователю о том, что есть обязательные для заполнения поля,
         так что такое подсвечивание было бы избыточным.*/
        submitButton.disabled = 'disabled';
        email.addEventListener('keyup', validateEmail, false);
        password.addEventListener('keyup', validatePass, false);
        city.addEventListener('keyup', validateCity, false);
        phone.addEventListener('keyup', validatePhone, false);
        email.addEventListener('blur', validateEmail, false);
        password.addEventListener('blur', validatePass, false);
        email.addEventListener('input', validateEmail, false);
        password.addEventListener('input', validatePass, false);
        city.addEventListener('input', validateCity, false);
        phone.addEventListener('input', validatePhone, false);
        form.addEventListener('submit', validateCheckbox, false);
    }

    function validateEmail() {
        // if we don't validate current email last time, validate it
        if (currentEmail !== email.value) {
            currentEmail = email.value;
            if (isAlerts.indexOf(email) === -1) {
                isAlerts.push(email);
            }
            viewSubmitButton();
            clearingTimeout(validateEmailId);
            validateEmailId = setTimeout(function () {
                var nullTemplate = /^\s*$/g;
                var emailTemplate = /^([a-z0-9-_\.-]+)@([a-z0-9-_\.-]+)\.([a-z\.]{2,6})$/g;
                if (email.value === '' || nullTemplate.test(email.value)) {
                    showAlertMessage(email, 'Логин не может быть пустым!');
                    viewSubmitButton();
                } else if (!emailTemplate.test(email.value)) {
                    showAlertMessage(email, 'Формат адреса электронной почты не соблюден!');
                    viewSubmitButton();
                } //else if (usedEmails.indexOf(email.value) !== -1)
                else {
                    var emailUsingStatus = null;
                    var request = new XMLHttpRequest();
                    var STATE_READY = 4;

                    hideAlertMessage(email);
                    isAlerts.push(email);
                    request.open('get', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + email.value, true);
                    request.onreadystatechange = function () {
                        if (request.readyState === STATE_READY) {
                            emailUsingStatus = JSON.parse(request.responseText).used;
                            if (emailUsingStatus === true) {
                                showAlertMessage(email, 'Данный адрес уже используется!');
                                viewSubmitButton();
                            }
                            else {
                                hideAlertMessage(email);
                                viewSubmitButton();
                            }
                        }
                    };
                    request.send();
                }
            }, 500);
        }
    }

    function validatePass(event) {
        clearingTimeout(validatePassId);
        event.preventDefault();
        validatePassId = setTimeout(function () {
            var passTemplate = /.{5,}?/g;
            var illegalPassTemplate = /[^0-9a-zA-Z_-]+/g;
            var passComplexTemplate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/g;
            if (password.value === '') {
                showAlertMessage(password, 'Пароль не может быть пустым!');
                viewSubmitButton();
            } else if (!passTemplate.test(password.value)) {
                showAlertMessage(password, 'Пароль слишком короткий!');
                viewSubmitButton();
            } else if (illegalPassTemplate.test(password.value)) {
                showAlertMessage(password, 'Недопустимые символы в пароле!');
                viewSubmitButton();
            } else if (!passComplexTemplate.test(password.value)) {
                showAlertMessage(password, 'Пароль слишком простой!');
                viewSubmitButton();
            } else {
                hideAlertMessage(password);
                viewSubmitButton();
            }
        }, 500);
    }

    function validateCity() {
        clearingTimeout(validateCityId);
        validateCityId = setTimeout(function () {
            var illegalCityTemplate = /[^a-zA-Z-]+/g;
            if (illegalCityTemplate.test(city.value)) {
                showAlertMessage(city, 'Недопустимые символы в названии города!');
                viewSubmitButton();
            } else {
                hideAlertMessage(city);
                viewSubmitButton();
            }
        }, 500);
    }

    function validatePhone() {
        clearingTimeout(validatePhoneId);
        validatePhoneId = setTimeout(function () {
            var phoneTemplate = /^\+38\d{10}$/g;
            if (phone.value !== '' && !phoneTemplate.test(phone.value)) {
                showAlertMessage(phone, 'Введите номер телефона в правильном формате!');
                viewSubmitButton();
            } else {
                hideAlertMessage(phone);
                viewSubmitButton();
            }
        }, 500);
    }

    //in case checkbox not checked - not submit
    function validateCheckbox(event) {
        if (!checkBox.checked) {
            event.preventDefault();
            addClass(checkBox.parentNode.parentNode.parentNode, 'has-error');
            addClass(checkBox.parentNode, 'control-label');
            checkBox.parentNode.parentNode.appendChild(createAlertMessage('Вы не согласны с условиями?'));
            checkBox.parentNode.parentNode.querySelector('.alert-danger').style.display = 'block';

            if (isAlerts.indexOf(checkBox) === -1) {
                isAlerts.push(checkBox);
            }
            checkBox.addEventListener('change', checkBoxChecked, false);
        }
    }

    function checkBoxChecked() {
        if (checkBox.checked) {
            checkBox.parentNode.parentNode.parentNode.className = 'form-group required';
            checkBox.parentNode.className = '';
            if (checkBox.parentNode.parentNode.querySelector('.alert-danger')) {
                checkBox.parentNode.parentNode.querySelector('.alert-danger').style.display = 'none';
            }

            if (isAlerts.indexOf(checkBox) !== -1) {
                isAlerts.splice(isAlerts.indexOf(checkBox), 1);
            }
            viewSubmitButton();
        }
        else {
            addClass(checkBox.parentNode.parentNode.parentNode, 'has-error');
            addClass(checkBox.parentNode, 'control-label');

            if (!checkBox.parentNode.parentNode.querySelector('.alert-danger')) {
                checkBox.parentNode.parentNode.appendChild(createAlertMessage(text));
            }
            else {
                checkBox.parentNode.parentNode.querySelector('.alert-danger').textContent = 'Вы не согласны с условиями?';
            }
            checkBox.parentNode.parentNode.querySelector('.alert-danger').style.display = 'block';

            if (isAlerts.indexOf(checkBox) === -1) {
                isAlerts.push(checkBox);
            }
            viewSubmitButton();
        }
    }

    // disable or enable submit button
    function viewSubmitButton() {
        if (!isAlerts.length) {
            submitButton.disabled = false;
        }
        else {
            submitButton.disabled = true;
        }
    }

    function createAlertMessage(text) {
        var elem = document.createElement('div');
        elem.className = 'alert alert-danger';
        elem.textContent = text;
        elem.style.display = 'none';
        return elem;
    }

    function showAlertMessage(node, text) {
        addClass(node.parentNode, 'has-error');
        addClass(node.parentNode.querySelector('label'), 'control-label');

        if (!node.parentNode.querySelector('.alert-danger')) {
            node.parentNode.appendChild(createAlertMessage(text));
        }
        else {
            node.parentNode.querySelector('.alert-danger').textContent = text;
        }
        node.parentNode.querySelector('.alert-danger').style.display = 'block';

        if (isAlerts.indexOf(node) === -1) {
            isAlerts.push(node);
        }
    }

    function hideAlertMessage(node) {
        removeClass(node.parentNode, 'has-error');
        node.parentNode.querySelector('label').className = '';
        if (node.parentNode.querySelector('.alert-danger')) {
            node.parentNode.querySelector('.alert-danger').style.display = 'none';
        }

        if (isAlerts.indexOf(node) !== -1) {
            isAlerts.splice(isAlerts.indexOf(node), 1);
        }
    }

    function addClass(el, cls) {
        var c = el.className ? el.className.split(' ') : [];
        for (var i = 0; i < c.length; i++) {
            if (c[i] == cls) return;
        }
        c.push(cls);
        el.className = c.join(' ');
    }

    function removeClass(el, cls) {
        var c = el.className.split(' ');
        for (var i = 0; i < c.length; i++) {
            if (c[i] == cls) c.splice(i--, 1);
        }
        el.className = c.join(' ');
    }

    function clearingTimeout(func) {
        if (func) {
            clearTimeout(func);
        }
    }
})();