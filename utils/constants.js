const BAD_REQUEST_CODE = 400;

const WRONG_LOGIN_CODE = 401;

const FORBIDDEN_CODE = 403;

const NOT_FOUND_CODE = 404;

const EMAIL_CONFLICT_CODE = 409;

const DEFAULT_ERROR_CODE = 500;

const CREATED_CODE = 201;

const DATA_UPDATED_CODE = 204;

const BAD_REQUEST_MESSAGE = 'Некорректные данные';

const NOT_FOUND_MESSAGE = 'Данные не найдены';

const WRONG_LOGIN_MESSAGE = 'Неправильные почта или пароль';

const NEED_AUTH_MESSAGE = 'Необходима авторизация';

const USER_IS_BLOCKED_MESSAGE = 'Данный аккаунт заблокирован';

const EMAIL_CONFLICT_MESSAGE = 'Такой email уже зарегистрирован';

const FORBIDDEN_MESSAGE = 'Ошибка доступа';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const LOGOUT_MESSAGE = 'Выход из аккаунта успешно выполнен';

module.exports = {
    BAD_REQUEST_CODE,
    NOT_FOUND_CODE,
    WRONG_LOGIN_CODE,
    DEFAULT_ERROR_CODE,
    EMAIL_CONFLICT_CODE,
    FORBIDDEN_CODE,
    CREATED_CODE,
    DATA_UPDATED_CODE,
    BAD_REQUEST_MESSAGE,
    NOT_FOUND_MESSAGE,
    WRONG_LOGIN_MESSAGE,
    NEED_AUTH_MESSAGE,
    USER_IS_BLOCKED_MESSAGE,
    EMAIL_CONFLICT_MESSAGE,
    FORBIDDEN_MESSAGE,
    DEFAULT_ERROR_MESSAGE,
    LOGOUT_MESSAGE,
};
