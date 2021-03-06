/*
* angular-rock
* https://github.com/romeOz/angular-rock
*
* Version: 0.10.0
* License: MIT
*/
(function () {
'use strict';

angular.module('rock',
    [
        'pascalprecht.translate',
        'rock.helpers',
        'rock.services',
        'rock.directives',
        'rock.filters',
        'rock.notification',
        'rock.forms'
    ]
)
    .config(configRock)
    .run(runRock);

configRock.$inject = ['$httpProvider', '$translateProvider', '$provide'];

/**
 *  Configure rock.
 * @param $httpProvider
 * @param $translateProvider
 * @param $provide
 */
function configRock($httpProvider, $translateProvider, $provide) {
    // configure http
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.interceptors.push(httpProvider);

    // configure i18n
    var lang = i18nProvider($translateProvider);
    $provide.value('rock', {lang: lang});
}

function i18nProvider($translateProvider) {
    var nav = window.navigator,
        lang = (
            angular.element(document.querySelector('html')).attr('lang') || nav.language ||
            nav.browserLanguage || nav.systemLanguage || nav.userLanguage || 'en'
        ).split('-')[0];

    $translateProvider.translations('en', {
        "lang": {
            "notPage": "page not found",
            "notContent": "content is empty",
            "notFound": "not found",
            "search": "search",
            "username": "username",
            "email": "e-mail",
            "password": "password",
            "confirmPassword": "confirm password",
            "token": "token",
            "captcha": "captcha",
            "invalidEmail": "Email is invalid.",
            "invalidTokenActivated": "Wrong token or user is already activated.",
            "invalidPasswordOrEmail": "Password or email is invalid.",
            "invalidPasswordOrUsername": "Password or login is invalid.",
            "existsUsername": "User with this name already exists.",
            "existsUsernameOrEmail": "User with this name\/e-mail already exists.",
            "notExistsUser": "User with this email does not exist or is blocked.",
            "notActivatedUser": "Account is not activated",
            "failLogin": "Fail authorization.",
            "failRecovery": "Fail recovery password.",
            "failSignup": "Fail registration.",
            "failSendEmail": "Email not sent.",
            "failActivated": "Fail activated.",
            "failLogout": "Fail logout.",
            "successLogin": "You successfully login.",
            "successLogout": "You successfully logout.",
            "successSignup": "Thanks for signing up!<br\/>On e-mail  <b>{{email}}<\/b>, sent an email with an activation code.",
            "successRecovery": "Your new password has been sent to your e-mail <b>{{email}}<\/b>.",
            "successActivate": "Your account is activated.",
            "signup": "sign up",
            "login": "login",
            "signin": "sign in",
            "activation": "activation",
            "close": "close",
            "activate": "activate",
            "registration": "registration",
            "authorization": "login",
            "resetPassword": "reset password",
            "recovery": "recovery",
            "loginLogout": "You're sign in. Authorization is required to <a href=\"{{link}}\" rel=\"nofollow\">logout<\/a> of your profile",
            "signupLogout": "You're sign in. The registration must be <a href=\"{{link}}\" rel=\"nofollow\">logout<\/a> of your profile",
            "recoveryLogout": "You're sign in. To recover the password required to <a href=\"{{link}}\" rel=\"nofollow\">logout<\/a> of your profile",
            "notJs": "Your browser does not support JavaScript. Try to fix this in the browser settings.",
            "logout": "logout",
            "characters": "characters",
            "failHTTPRequest": "HTTP-request error.",
            "failServer": "Server error.",
            "failAccess": "Denied access.",
            "error": "error",
            "value": "value",
            "success": "success",
            "forgotPassword": "forgot password"
        },
        "validate": {
            "required": "{{name}} must not be empty",
            "notRequired": "{{name}} must be empty",
            "min": "{{name}} must be greater than {{minValue}}",
            "minInclusive": "{{name}} must be greater than or equals {{minValue}}",
            "notMin": "{{name}} must not be greater than {{minValue}}",
            "notMinInclusive": "{{name}} must not be greater than or equals {{minValue}}",
            "max": "{{name}} must be lower than {{maxValue}}",
            "maxInclusive": "{{name}} must be lower than or equals {{maxValue}}",
            "notMax": "{{name}} must not be lower than {{maxValue}}",
            "notMaxInclusive": "{{name}} must not be lower than or equals {{maxValue}}",
            "email": "{{name}} must be valid",
            "notEmail": "{{name}} must not be valid",
            "regex": "{{name}} contains invalid characters",
            "notRegex": "{{name}} does not contain invalid characters",
            "captcha": "captcha must be valid",
            "notCaptcha": "captcha must not be valid",
            "confirm": "values must be equals",
            "notConfirm": "values must not be equals",
            "call": "{{name}} must be valid",
            "unique": "{{value}} has already been taken",
            "notUnique": "{{value}} not already been taken.",
            "csrf": "CSRF-token must be valid",
            "notCsrf": "CSRF-token must not be valid",
            "date": "{{name}} must be date",
            "dateFormat": "{{name}} must be a valid date. Sample format: {{format}}",
            "notDate": "{{name}} must not be date",
            "notDateFormat": "{{name}} must not be a valid date in the format {{format}}"
        }
    });
    $translateProvider.translations('ru', {
        "lang": {
            "notPage": "страница не найдена",
            "notContent": "материал отсутсвует",
            "notFound": "ничего не найдено",
            "resetPassword": "сбросить пароль",
            "recovery": "восстановление пароля",
            "signup": "зарегистрироваться",
            "signin": "войти",
            "activation": "активация",
            "password": "пароль",
            "confirmPassword": "подтверждение пароля",
            "token": "токен",
            "captcha": "код подтверждения",
            "login": "логин",
            "successLogged": "вы успешно авторизированы",
            "close": "закрыть",
            "notJs": "Ваш браузер не поддерживает JavaScript. Попробуйте исправить это в настройках браузера.",
            "email": "e-mail",
            "username": "логин\/псевдоним",
            "existsUsername": "Пользователь с таким именем уже существует.",
            "existsUsernameOrEmail": "Пользователь с таким именем\/e-mail уже существует.",
            "notExistsUser": "Пользователя с таким email не существует или блокирован.",
            "invalidEmail": "Указан неверный email.",
            "invalidPasswordOrEmail": "Указан неверный пароль или email.",
            "invalidPasswordOrUsername": "Указан неверный пароль или логин.",
            "notActivatedUser": "Учётная запись не активирована.",
            "invalidTokenActivated": "Неверный токен или пользователь уже активирован.",
            "successLogin": "Вы успешно авторизировались.",
            "successLogout": "Вы успешно разлогинились.",
            "successSignup": "Спасибо за регистрацию!<br\/>На указанный Вами адрес электронной почты <b>{{email}}<\/b>, отправлено письмо с подтверждением.",
            "successRecovery": "Новый пароль, был отправлен на Ваш адрес электронной почты <b>{{email}}<\/b>.",
            "successActivate": "Ваша учётная запись активирована.",
            "failLogin": "Ошибка при авторизации.",
            "failRecovery": "Ошибка при восстановлении пароля.",
            "failSignup": "Ошибка при регистрации.",
            "failActivated": "Ошибка при активации.",
            "failLogout": "Ошибка при разлогировании.",
            "failSendEmail": "email не отправлен.",
            "loginLogout": "Вы авторизированы. Для повторной авторизации требуется <a href=\"{{link}}\" rel=\"nofollow\">выйти<\/a> из своего профиля.",
            "signupLogout": "Вы авторизированы. Для регистрации требуется <a href=\"{{link}}\" rel=\"nofollow\">выйти<\/a> из своего профиля.",
            "recoveryLogout": "Вы авторизированы. Для для восстановлении пароля требуется <a href=\"{{link}}\" rel=\"nofollow\">выйти<\/a> из своего профиля.",
            "logout": "выход",
            "characters": "символов",
            "failHTTPRequest": "Ошибка HTTP-запроса.",
            "failServer": "Ошибка сервера.",
            "failAccess": "Отказано в доступе.",
            "error": "ошибка",
            "value": "значение",
            "forgotPassword": "забыли пароль",
            "success": "успех"
        },
        "validate": {
            "required": "{{name}} не должно быть пустым",
            "notRequired": "{{name}} должно быть пустым",
            "min": "{{name}} должно быть больше {{minValue}}",
            "minInclusive": "{{name}} должно быть больше или равно {{minValue}}",
            "notMin": "{{name}} не должно быть больше {{minValue}}",
            "notMinInclusive": "{{name}} не должно быть больше или равно {{minValue}}",
            "max": "{{name}} должно быть меньше {{maxValue}}",
            "maxInclusive": "{{name}} должно быть меньше или равно {{maxValue}}",
            "notMax": "{{name}} не должно быть меньше {{maxValue}}",
            "notMaxInclusive": "{{name}} не дожно быть меньше или равно {{maxValue}}",
            "email": "{{name}} должен быть верным",
            "notEmail": "{{name}} не должен быть верным",
            "regex": "{{name}} содержит неверные символы",
            "notRegex": "{{name}} не содержит верные символы",
            "captcha": "каптча должна быть верной",
            "notCaptcha": "каптча не должна быть верной",
            "confirm": "значения должны совпадать",
            "notConfirm": "значения не должны совпадать",
            "call": "{{name}} должно быть верным",
            "unique": "{{value}} уже существует",
            "notUnique": "{{value}} должно существовать",
            "csrf": "CSRF-токен должен быть верным",
            "notCsrf": "CSRF-токен не должен быть верным",
            "date": "{{name}} должно быть датой",
            "dateFormat": "{{name}} должно соответствовать формату: {{format}}",
            "notDate": "{{name}} не должно быть датой",
            "notDateFormat": "{{name}} не должно соответствовать формату: {{format}}"
        }
    });
    $translateProvider.preferredLanguage(lang);
    return lang;
}

httpProvider.$inject = ['$q', '$injector'];
function httpProvider($q, $injector) {

    return {
        response: function (response) {
            /** @type {httpUtils} httpUtils */
            var httpUtils = $injector.get('httpUtils');
            if (!response.config.cache) {
                httpUtils.csrf(response.data, response.headers);
            }
            return response;

        },
        responseError: function (response) {
            // do something on error
            /** @type {httpUtils} httpUtils */
            var httpUtils = $injector.get('httpUtils');
            if (response.config && !response.config.cache) {
                httpUtils.csrf(response.data, response.headers);
            }
            httpUtils.error(response.data, response.status, response.statusText);
            return $q.reject(response);
        }
    };
}

runRock.$inject = ['$rootScope', '$http', 'csrfUtils', 'userUtils', 'alias', 'rock', 'htmlUtils'];
/**
 *
 * @param $rootScope
 * @param $http
 * @param {csrfUtils} csrfUtils
 * @param {userUtils} userUtils
 * @param {alias} alias
 * @param rock
 * @param {htmlUtils} htmlUtils
 */
function runRock($rootScope, $http, csrfUtils, userUtils, alias, rock, htmlUtils) {
    runCSRF(csrfUtils);
    $rootScope.rock = {};
    /** @type {string} */
    $rootScope.rock.lang = rock.lang;
    /** @type {csrfUtils} */
    $rootScope.rock.csrf = csrfUtils;
    /**  @type {userUtils} */
    $rootScope.rock.user = userUtils;
    /**  @type {htmlUtils} */
    $rootScope.rock.html = htmlUtils;
    /**  @type {alias} */
    $rootScope.rock.alias = alias;
    $rootScope.$watch(function (scope) {
        return scope.rock.csrf.getToken();
    }, function (value) {
        if (!value) {
            return;
        }
        $http.defaults.headers.post['X-CSRF-Token'] = value;
    });
}

function runCSRF(csrfUtils) {
    var csrfParam = angular.element(document.querySelector('meta[name=csrf-param]')).attr('content'),
        csrfToken = angular.element(document.querySelector('meta[name=csrf-token]')).attr('content');

    if (csrfParam && csrfToken) {
        csrfUtils.addToken(csrfToken);
        csrfUtils.addParam(csrfParam);
    }
}
angular
    .module('rock.helpers', [])
    .factory('stringHelper', stringHelper)
    .factory('collectionHelper', collectionHelper)
    .factory('alias', alias);

/**
 * @ngdoc service
 * @name stringHelper
 */
function stringHelper() {
    var StringHelper = {};

    /**
     * Upper first char.
     * @ngdoc method
     * @name stringHelper#upperFirst
     * @param {string} value
     * @returns {string}
     */
    StringHelper.upperFirst = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    /**
     * Find the position of the first occurrence of a substring in a string.
     * @ngdoc method
     * @name stringHelper#strpos
     * @param haystack
     * @param needle
     * @param offset
     * @returns {*|Number}
     * @link http://kevin.vanzonneveld.net
     */
    StringHelper.strpos = function (haystack, needle, offset) {
        if (offset === undefined) {
            offset = 0;
        }
        var i = haystack.indexOf(needle, offset); // returns -1
        return i >= 0 ? i : false;
    };

    /**
     * Reverse string
     * @ngdoc method
     * @name stringHelper#reverse
     * @param string
     * @returns {string}
     */
    StringHelper.reverse = function (string) {
        return string.split("").reverse().join("");
    };

    /**
     * Binary safe string comparison.
     *
     * ```js
     * strncmp('aaa', 'aab', 2); // 0
     * strncmp('aaa', 'aab', 3 ); // -1
     * ```
     * @ngdoc method
     * @name stringHelper#strncmp
     * @param {string} str1
     * @param {string} str2
     * @param {number} lgth
     * @return {number}
     */
    StringHelper.strncmp = function (str1, str2, lgth) {
        var s1 = (str1 + '')
                .substr(0, lgth),
            s2 = (str2 + '')
                .substr(0, lgth);

        return ((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
    };

    /**
     * Find the position of the first occurrence of a substring in a string.
     * @ngdoc method
     * @name stringHelper#strpos
     * @param {string} haystack
     * @param {string} needle
     * @param {number} offset
     * @return {number|boolean}
     */
    StringHelper.strpos = function (haystack, needle, offset) {
        var i = haystack.indexOf(needle, offset); // returns -1
        return i >= 0 ? i : false;
    };

    /**
     * Strip whitespace (or other characters) from the beginning of a string.
     * @ngdoc method
     * @name stringHelper#ltrim
     * @param {string} str
     * @param {string=} charlist
     * @return {string}
     */
    StringHelper.ltrim = function (str, charlist) {

        charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
            .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        var re = new RegExp('^[' + charlist + ']+', 'g');
        return (str + '')
            .replace(re, '');
    };

    /**
     * Strip whitespace (or other characters) from the end of a string.
     * @ngdoc method
     * @name stringHelper#rtrim
     * @param {string} str
     * @param {string=} charlist
     * @return {string}
     */
    StringHelper.rtrim = function (str, charlist) {

        charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
            .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
        var re = new RegExp('[' + charlist + ']+$', 'g');
        return (str + '')
            .replace(re, '');
    };

    return StringHelper;
}

/**
 * @ngdoc service
 * @name collectionHelper
 * @return {*}
 */
function collectionHelper() {
    var CollectionHelper = {};

    /**
     * Calculate CSRF-data.
     * @ngdoc method
     * @name collectionHelper#flatten
     * @param {Array} value
     * @param {Function} callback
     * @return {Array|Object}
     */
    CollectionHelper.flatten = function (value, callback) {
        var isArray = angular.isArray(value),
            result = isArray ? [] : {};
        var recurs = function (value, isArray) {
            angular.forEach(value, function (value, key) {
                if (angular.isObject(value)) {
                    recurs(value, isArray);
                    return;
                }
                if (angular.isFunction(callback)) {
                    value = callback(value);
                }
                if (isArray) {
                    result.push(value);
                } else {
                    result[key] = value;
                }
            });
        };
        recurs(value, isArray);
        return result;
    };

    return CollectionHelper;
}

alias.$inject = ['stringHelper', 'notification'];

/**
 * @ngdoc service
 * @name alias
 * @returns {*}
 */
function alias(stringHelper, notification) {
    var _alias = {},
        aliases = {};

    /**
     * @ngdoc method
     * @name alias#set
     * @param {string} alias
     * @param {string} path
     */
    _alias.set = function (alias, path) {

        if (stringHelper.strncmp(alias, '@', 1)) {
            alias = '@' + alias;
        }
        var delimiter = '/',
            pos = stringHelper.strpos(alias, delimiter),
            root = pos === false ? alias : alias.substr(0, pos);
        if (path !== null) {
            path = stringHelper.strncmp(path, '@', 1) ? stringHelper.rtrim(path, '\\/') : _alias.get(path);
            if (aliases[root] === undefined) {
                if (pos === false) {
                    aliases[root] = path;
                } else {
                    aliases[root] = {};
                    aliases[root][alias] = path;
                }
            } else if (angular.isString(aliases[root])) {
                if (pos === false) {
                    aliases[root] = path;
                } else {
                    aliases[root] = {};
                    aliases[root][alias] = path;
                    aliases[root][root] = aliases[root];
                }
            } else {
                aliases[root][alias] = path;
                //krsort(aliases[root]);
            }
        } else if (aliases[root] !== undefined) {
            if (angular.isArray(aliases[root])) {
                aliases[root][alias] = undefined;
            } else if (pos === false) {
                aliases[root] = undefined;
            }
        }
    };

    /**
     * @ngdoc method
     * @name alias#get
     * @param {string} alias
     * @return {*}
     */
    _alias.get = function (alias) {

        if (stringHelper.strncmp(alias, '@', 1)) {
            // not an alias
            return alias;
        }

        var delimiter = '/',
            pos = stringHelper.strpos(alias, delimiter),
            root = pos === false ? alias : alias.substr(0, pos);

        if (aliases[root] !== undefined) {
            if (angular.isString(aliases[root])) {
                return pos === false ? aliases[root] : aliases[root] + alias.substr(pos);
            } else {
                var result = _.find(aliases[root], function (path, name) {
                    if (stringHelper.strpos(alias + delimiter, name + delimiter) === 0) {
                        return path + alias.substr(name.length);
                    }
                });

            }
        }

        if (result === undefined) {
            notification.debug('Invalid path alias: ' + alias);
        }
        return result;
    };

    /**
     * @ngdoc method
     * @name alias#remove
     * @param {string} alias
     */
    _alias.remove = function (alias) {
        aliases[alias] = undefined;
    };

    return _alias;
}
angular
    .module('rock.services', [])
    .factory('userUtils', userUtils)
    .provider('formUtils', formUtils)
    .provider('httpUtils', httpUtils)
    .factory('csrfUtils', csrfUtils)
    .factory('modalUtils', modalUtils)
    .provider('htmlUtils', htmlUtils);


userUtils.$inject = ['$rootScope', '$http', 'csrfUtils', 'httpUtils', 'notification'];
/**
 * @ngdoc service
 * @name userUtils
 */
function userUtils($rootScope, $http, csrfUtils, httpUtils, notification) {
    var userUtils = {};
    $rootScope._user = undefined;

    /**
     * Set list data fo user.
     * @param {Object} data
     */
    userUtils.set = function (data) {
        $rootScope._user = httpUtils.removeExtend(data);
    };

    /**
     * Adds data by key.
     * @param {string} key
     * @param {*} value
     */
    userUtils.add = function (key, value) {
        if (!$rootScope._user) {
            $rootScope._user = {};
        }
        $rootScope._user[key] = httpUtils.removeExtend(value);
    };

    /**
     * Returns data by key.
     * @param {string} key
     * @return {*}
     */
    userUtils.get = function (key) {
        if (!$rootScope._user) {
            return null;
        }
        return $rootScope._user[key] !== undefined ? $rootScope._user[key] : null;
    };

    /**
     * Returns list data.
     * @return {undefined|*}
     */
    userUtils.getAll = function () {
        return $rootScope._user;
    };

    /**
     * Is logged.
     * @return {boolean|undefined}
     */
    userUtils.isLogged = function () {
        if ($rootScope._user === undefined) {
            return undefined;
        }
        return !!$rootScope._user;
    };

    /**
     * Logout user.
     * @param {string} url
     */
    userUtils.logout = function (url) {
        $http.get(URI(url).setSearch(csrfUtils.get()))
            .success(function () {
                $rootScope._user = null;
                notification.success('lang.successLogout');
                $rootScope.$broadcast('onLogout');
            });
    };

    return userUtils;
}


/**
 * @ngdoc provider
 * @name formUtilsProvider
 * @returns {*}
 */
function formUtils() {
    var defaultMsg = 'Success.';

    /**
     * @ngdoc method
     * @name formUtilsProvider#defaultMsg
     * @description
     * @param {string} msg
     */
    this.defaultMsg = function (msg) {
        defaultMsg = msg;
    };


    this.$get = ['$http', function ($http) {
        var formUtils = {};
        /**
         * Reload captcha.
         * @ngdoc method
         * @name formUtils#reloadCaptcha
         * @param {string} url
         * @return {Object}
         */
        formUtils.reloadCaptcha = function (url) {
            return $http.get(url);
        };

        return formUtils;
    }];
}

/**
 * @ngdoc provider
 * @name httpUtilsProvider
 * @returns {*}
 */
function httpUtils() {
    var extendAttribute = '_extend',
        defaultMsg = 'lang.failHTTPRequest';

    /**
     * @ngdoc method
     * @name httpUtilsProvider#extendAttribute
     * @description
     * @param {string} attribute
     */
    this.extendAttribute = function (attribute) {
        extendAttribute = attribute;
    };


    /**
     * @ngdoc method
     * @name httpUtilsProvider#defaultMsg
     * @description
     * @param {string} msg
     */
    this.defaultMsg = function (msg) {
        defaultMsg = msg;
    };

    this.$get = ['collectionHelper', 'stringHelper', 'csrfUtils', 'notification', function (collectionHelper, stringHelper, csrfUtils, notification) {
        var httpUtils = {};
        /**
         * Calculate CSRF-data.
         * @ngdoc method
         * @name httpUtils#csrf
         * @param {Object} data
         * @param {Function=} headers
         */
        httpUtils.csrf = function (data, headers) {
            if (angular.isObject(data)) {
                if (data[extendAttribute] && data[extendAttribute].csrf) {
                    csrfUtils.addToken(data[extendAttribute].csrf.token);
                    csrfUtils.addParam(data[extendAttribute].csrf.param);
                    return;
                }
            }

            if (angular.isFunction(headers)) {
                csrfUtils.addToken(headers('x-csrf-token'));
            }

        };

        /**
         * Prepare messages.
         * @ngdoc method
         * @name httpUtils#prepareMessages
         * @param {Array|object} messages
         * @param {boolean=true} uniq
         * @param {string=} defaultMessage
         * @return {Array}
         */
        httpUtils.normalizeAlerts = function (messages, uniq, defaultMessage) {
            if (!messages) {
                messages = [defaultMessage || defaultMsg];
            }
            if (uniq === undefined) {
                uniq = true;
            }
            messages = flatten(httpUtils.removeExtend(messages));
            if (uniq === true && angular.isArray(messages)) {
                messages = _.uniq(messages);
            }
            return messages;
        };

        /**
         * Returns extend attribute.
         * @ngdoc method
         * @name httpUtils#getExtend
         * @param {Object} data
         * @param {string=} attribute
         * @return {*}
         */
        httpUtils.getExtend = function (data, attribute) {
            if (!angular.isObject(data) || !data[extendAttribute]) {
                return null;
            }
            if (attribute) {
                return data[extendAttribute][attribute] || null;
            }
            return data[extendAttribute];
        };

        /**
         * Removes extend attribute.
         * @ngdoc method
         * @name httpUtils#removeExtend
         * @param {Object} data
         * @return {*}
         */
        httpUtils.removeExtend = function (data) {
            delete(data[extendAttribute]);
            return data;
        };

        /**
         * @ngdoc method
         * @name httpUtils#error
         * @param {*} data
         * @param {number} status
         * @param {string=} statusText
         */
        httpUtils.error = function (data, status, statusText) {
            if (data && data.error && data.error.message) {
                notification.debug(data.error.message);
            }
            switch (status) {
                case 400:
                case 422:
                    break;
                case 403:
                    notification.error('lang.failAccess', {}, prepareMessage(statusText));
                    break;
                case 404:
                    notification.error('lang.notPage', {}, prepareMessage(statusText));
                    break;
                case 500:
                    notification.error('lang.failServer', {}, prepareMessage(statusText));
                    break;
            }
        };

        /**
         *
         * @param {Array} value
         * @return {Array}
         */
        function flatten(value) {
            return collectionHelper.flatten(value, function (value) {
                return prepareMessage(value);
            });
        }

        /**
         *
         * @param {string} message
         * @return {string}
         */
        function prepareMessage(message) {
            message = stringHelper.upperFirst(message);
            if (message.slice(-1) !== '.') {
                return message + '.';
            }
            return message;
        }

        return httpUtils;
    }];
}

/**
 * @ngdoc service
 * @name csrfUtils
 */
function csrfUtils() {
    var csrfUtils = {},
        csrf = {token: undefined, param: undefined};

    /**
     * Adds CSRF-token.
     * @param {string} token
     */
    csrfUtils.addToken = function (token) {
        if (angular.isString(token)) {
            csrf.token = token;
        }
    };
    /**
     * Adds CSRF-param.
     * @param {string} param
     */
    csrfUtils.addParam = function (param) {
        if (param) {
            csrf.param = param;
        }
    };
    /**
     *  Returns `<param>:<token>`.
     * @return {Object|null}
     */
    csrfUtils.get = function () {
        if (csrf.token && csrf.param) {
            var result = {};
            result[csrf.param] = csrf.token;
            return result;
        }
        return null;
    };
    /**
     * Return CSRF-token.
     * @return {string}
     */
    csrfUtils.getToken = function () {
        return csrf.token;
    };
    /**
     *  Return CSRF-param
     * @return {string}
     */
    csrfUtils.getParam = function () {
        return csrf.param;
    };
    /**
     * Exists CSRF-token.
     * @return {boolean}
     */
    csrfUtils.has = function () {
        return csrf && csrf.token;
    };
    return csrfUtils;
}

/**
 * @ngdoc service
 * @name modalUtils
 */
modalUtils.$inject = ['$modal'];
function modalUtils($modal) {
    var modalUtils = {};
    modalUtils.show = function ($scope, url, ctrl) {
        $modal.open({
            templateUrl: url,
            controller: ctrl
        });
    };
    return modalUtils;
}

/**
 * @ngdoc service
 * @name htmlUtils
 */
function htmlUtils() {
    var tpl = '<iframe width="{{width}}" height="{{height}}" frameborder="0" allowfullscreen="allowfullscreen" src="{{src}}"></iframe>',
        width = 480,
        height = 360;

    /**
     *
     * @type {{width: Function(width:number), height: Function(height:number)}}
     */
    this.video = {
        width: function (_width) {
            width = _width;
        },
        height: function (_height) {
            height = _height;
        }
    };

    this.$get = ['$modal', '$interpolate', function ($modal, $interpolate) {

        var htmlUtils = {};

        /**
         *
         * @param {string} src
         * @param {number} width
         * @param {number} height
         * @param {string} title
         * @param {Event} $event
         */
        htmlUtils.playVideo = function (src, width, height, title, $event) {
            if (!src) {
                return;
            }
            $event.preventDefault();
            angular.element($event.target).replaceWith(interpolate(tpl, src, width, height))
        };
        htmlUtils.playVideoModal = function (src, width, height, title, $event) {
            if (!src) {
                return;
            }
            $event.preventDefault();

            Controller.$inject = ['$scope', '$modalInstance'];
            function Controller($scope, $modalInstance) {

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            }

            if (title) {
                title = '<div class="modal-header">' +
                    '<button data-ng-click="cancel()" class="close" type="button">×</button>' +
                    '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' + title + '</h4>' +
                    '</div>';
            }

            $modal.open({
                template: title +
                '<div class="modal-body">' + interpolate(tpl, src, width, height) + '</div>',
                controller: Controller
            });
        };
        function interpolate(tpl, src, width, height) {
            return $interpolate(tpl)({
                width: width,
                height: height,
                src: src
            });
        }

        return htmlUtils;
    }];
}
angular
    .module('rock.filters', [])
    .filter('unsafe', unsafe)
    .filter('byKeys', byKeys);

/**
 * @ngdoc filter
 * @name unsafe
 */
unsafe.$inject = ['$sce'];
function unsafe($sce) {
    return function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return $sce.trustAsHtml(value);
    };
}

/**
 * @ngdoc filter
 * @name byKeys
 */
function byKeys() {
    return function (inputs, attrubutes) {
        if (inputs && angular.isObject(inputs)) {
            inputs = _.filter(inputs, function (value, attribute) {
                return _.contains(attrubutes, attribute);
            });
            if (_.isEmpty(inputs)) {
                return null;
            }
            return inputs;
        }
    };
}
angular
    .module('rock.directives', [])
    .directive('bindCompiledHtml', bindCompiledHtml)
    .directive('rockMetaCsrf', rockMetaCsrf)
    .directive('rockModifyLink', rockModifyLink);

rockMetaCsrf.$inject = ['csrfUtils'];
/**
 * @ngdoc directive
 * @name metaCsrf
 * @restrict A
 */
function rockMetaCsrf(csrfUtils) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $scope.$root.$watch(function () {
                return csrfUtils.getToken();
            }, function (value) {
                if (!value) {
                    return;
                }
                $element.attr('content', value);
            });
        }
    };
}

/**
 * @ngdoc directive
 * @name bindCompiledHtml
 * @restrict A
 */
bindCompiledHtml.$inject = ['$compile'];
function bindCompiledHtml($compile) {
    return {
        restrict: 'A',
        scope: {
            rawHtml: '=bindCompiledHtml'
        },
        link: function ($scope, $element) {
            $scope.$watch('rawHtml', function (value) {
                if (!value) return;
                // we want to use the scope OUTSIDE of this directive
                // (which itself is an isolate scope).

                var newElem = $compile(value)($scope.$parent);
                $element.contents().remove();
                $element.append(newElem);
            });
        }
    };
}

/**
 * @ngdoc directive
 * @name rockModifyLink
 * @restrict A
 */
function rockModifyLink() {
    return {
        restrict: 'A',
        scope: {
            options: '=rockModifyLink'
        },
        link: function ($scope, $elem, $attr) {
            if (!$scope.options || !angular.isObject($scope.options)) {
                return;
            }
            var attribute = tagName($elem[0]) === 'form' ? 'action' : 'href',
                options = $scope.options;
            if (options.attr) {
                attribute = options.attr;
            }
            if (!$attr[attribute]) {
                return;
            }
            var url = URI($attr[attribute]);

            if (options.self) {
                if (options.scheme === 'abs') {
                    url.scheme(URI().scheme());
                    url.host(URI().hostname());
                    url.port(URI().port());
                    url.username(URI().username());
                    url.password(URI().password());
                }
                url.pathname(URI().pathname());
            }

            if (options.modify) {
                angular.forEach(options.modify, function(value, key){
                    if (isNumeric(key)) {
                        if (value) {
                            if (value === '!#') {
                                url.hash('');
                            } else if (value === '!') {
                                url.search('');
                            } else if (value[0] === '!') {
                                url.removeSearch(value.substr(1,value.length));
                            }
                        }
                    } else if (key === '#') {
                        url.hash(value);
                    } else {
                        url.addSearch(key, value);
                    }
                });
            }

            $elem.attr(attribute, url);
            if (!options.csrf) {
                return;
            }

            $scope.$root.$watch(function (scope) {
                return scope.rock.csrf.getToken();
            }, function (value) {
                if (!value) {
                    return;
                }
                $elem.attr(attribute, url.setSearch($scope.$root.rock.csrf.get()));
            });
        }
    };

    function tagName(elem){
        return angular.lowercase(elem.tagName || elem.nodeName);
    }
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
angular
    .module('rock.notification',
    [
        'rock.notification.controllers',
        'rock.notification.services'
    ]
);
angular
    .module('rock.notification.controllers', ['ui.bootstrap'])
    .controller('NotificationController', NotificationController);

NotificationController.$inject = ['$scope', 'notification'];
function NotificationController($scope, notification) {
    $scope.notifications = notification.getAll();
    $scope.merge = function (messages) {
        notification.merge(messages);
    };

    $scope.closeable = true;
    $scope.closeAlert = function (index) {
        notification.remove(index);
    };
}
angular
    .module('rock.notification.services', [])
    .provider('notification', notification);

/**
 * @ngdoc provider
 * @name notificationProvider
 * @returns {*}
 */
function notification() {
    var messages = [],
        debug = true;

    /**
     * @ngdoc method
     * @name notificationProvider#debugEnabled
     * @description
     * @param {boolean} debugEnabled enable or disable debug level messages
     */
    this.debugEnabled = function (debugEnabled) {
        debug = debugEnabled;
    };

    this.$get = ['$translate', function ($translate) {

        return {
            /**
             * @ngdoc method
             * @name notification#log
             *
             * @description
             * Write a log message
             * @param {string} msg
             * @param {Object} placeholders
             * @param {string} _default
             */
            log: function (msg, placeholders, _default) {
                translate('log', msg, placeholders, _default);
            },

            /**
             * @ngdoc method
             * @name notification#info
             *
             * @description
             * Write an information message
             * @param {string} msg
             * @param {Object=} placeholders
             * @param {string=} _default
             */
            info: function (msg, placeholders, _default) {
                translate('info', msg, placeholders, _default);
            },

            /**
             * @ngdoc method
             * @name notification#success
             *
             * @description
             * Write an information message
             * @param {string} msg
             * @param {Object=} placeholders
             * @param {string=} _default
             */
            success: function (msg, placeholders, _default) {
                translate('success', msg, placeholders, _default);
            },

            /**
             * @ngdoc method
             * @name notification#warn
             *
             * @description
             * Write a warning message
             * @param {string} msg
             * @param {Object=} placeholders
             * @param {string=} _default
             */
            warn: function (msg, placeholders, _default) {
                translate('warn', msg, placeholders, _default);
            },

            /**
             * @ngdoc method
             * @name notification#error
             *
             * @description
             * Write an error message
             * @param {string} msg
             * @param {Object=} placeholders
             * @param {string=} _default
             */
            error: function (msg, placeholders, _default) {
                translate('error', msg, placeholders, _default);
            },

            /**
             * @ngdoc method
             * @name notification#debug
             *
             * @description
             * Write a debug message
             * @param {string} msg
             */
            debug: function (msg) {
                if (angular.isString(msg)) {
                    msg = new Error(msg);
                }
                console.debug(msg);
            },

            /**
             * @ngdoc method
             * @name notification#merge
             *
             * @description adds list messages
             * @param {Object[]|string[]} data
             */
            merge: function (data) {
                if (!data) {
                    return;
                }
                if (angular.isString(data[0])) {
                    data = data.map(function (value) {
                        return {msg: value};
                    });
                }
                angular.extend(messages, data);
            },

            /**
             * @ngdoc method
             * @name notification#getAll
             *
             * @description returns list messages
             * @return {Object[]}
             */
            getAll: function () {
                return messages;
            },

            /**
             * @ngdoc method
             * @name notification#exists
             *
             * @description exists messages
             * @return {boolean}
             */
            exists: function () {
                return !!messages;
            },

            /**
             * @ngdoc method
             * @name notification#remove
             *
             * @description remove message
             * @param {number} index
             */
            remove: function (index) {
                if (!!messages) {
                    messages.splice(index, 1);
                }
            },

            /**
             * @ngdoc method
             * @name notification#removeAll
             *
             * @description remove all messages
             */
            removeAll: function () {
                messages = [];
            }
        };

        function translate(type, msg, placeholders, _default) {
            var push = function (msg) {
                switch (type) {
                    case 'warn':
                        type = 'warning';
                        break;
                    case 'error':
                        type = 'danger';
                        break;
                    case 'success':
                        type = 'success';
                        break;
                    default:
                        type = 'info';
                }
                messages.push({msg: msg, type: type});
            };

            $translate(msg, placeholders).then(push)['catch'](function (msg) {
                push(_default || msg);
            });
        }
    }];
}
angular
    .module('rock.forms',
    [
        'rock.forms.controllers',
        'rock.forms.directives'
    ]
);
angular
    .module(
    'rock.forms.directives',
    [
        'ui.bootstrap.progressbar',
        'template/progressbar/progress.html',
        'template/progressbar/progressbar.html'
    ]
)
    .directive('rockFormFocus', rockFormFocus)
    .directive('rockPasswordStrong', rockPasswordStrong)
    .directive('rockMatch', rockMatch)
    .directive('rockResetField', rockResetField)
    .directive('rockResetFieldIcon', rockResetFieldIcon);

function rockMatch() {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            match: '=rockMatch'
        },
        link: function ($scope, $element, attrs, ctrl) {
            $scope.$watch(function () {
                var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                return (ctrl.$pristine && angular.isUndefined(modelValue)) || $scope.match === modelValue;
            }, function (currentValue) {
                ctrl.$setValidity('match', currentValue);
            });
        }
    };
}

rockFormFocus.$inject = ['$timeout'];
function rockFormFocus($timeout) {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function () {
                element.addClass(FOCUS_CLASS);
                $timeout(function () {
                    ctrl.$focused = false;
                }, 0);
            }).bind('blur', function () {
                element.removeClass(FOCUS_CLASS);
                $timeout(function () {
                    ctrl.$focused = true;
                }, 0);
            });
        }
    };
}

rockPasswordStrong.$inject = ['$animate', 'stringHelper', '$templateCache'];
function rockPasswordStrong($animate, StringHelper, $templateCache) {
    if (!$templateCache.get('form/strong-password')) {
        $templateCache.put('form/strong-password', '<progressbar value="value" type="{{class}}">{{value}}%</progressbar>');
    }
    return {
        templateUrl: 'form/strong-password',
        restrict: 'A',
        scope: {
            pwd: '=rockPasswordStrong'
        },
        link: function (scope, element) {
            $animate.enabled(element, false);
            var
                mesureStrength = function (p) {
                    var matches = {
                            pos: {},
                            neg: {}
                        },
                        counts = {
                            pos: {},
                            neg: {
                                seqLetter: 0,
                                seqNumber: 0,
                                seqSymbol: 0
                            }
                        },
                        tmp,
                        strength = 0,
                        letters = 'abcdefghijklmnopqrstuvwxyz',
                        numbers = '01234567890',
                        symbols = '\\!@#$%&/()=?¿',
                        back,
                        forth,
                        i;

                    if (p) {
                        // Benefits
                        matches.pos.lower = p.match(/[a-z]/g);
                        matches.pos.upper = p.match(/[A-Z]/g);
                        matches.pos.numbers = p.match(/\d/g);
                        matches.pos.symbols = p.match(/[$-/:-?{-~!^_`\[\]]/g);
                        matches.pos.middleNumber = p.slice(1, -1).match(/\d/g);
                        matches.pos.middleSymbol = p.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

                        counts.pos.lower = matches.pos.lower ? matches.pos.lower.length : 0;
                        counts.pos.upper = matches.pos.upper ? matches.pos.upper.length : 0;
                        counts.pos.numbers = matches.pos.numbers ? matches.pos.numbers.length : 0;
                        counts.pos.symbols = matches.pos.symbols ? matches.pos.symbols.length : 0;

                        tmp = _.reduce(counts.pos, function (memo, val) {
                            // if has count will add 1
                            return memo + Math.min(1, val);
                        }, 0);

                        counts.pos.numChars = p.length;
                        tmp += (counts.pos.numChars >= 8) ? 1 : 0;

                        counts.pos.requirements = (tmp >= 3) ? tmp : 0;
                        counts.pos.middleNumber = matches.pos.middleNumber ? matches.pos.middleNumber.length : 0;
                        counts.pos.middleSymbol = matches.pos.middleSymbol ? matches.pos.middleSymbol.length : 0;

                        // Deductions
                        matches.neg.consecLower = p.match(/(?=([a-z]{2}))/g);
                        matches.neg.consecUpper = p.match(/(?=([A-Z]{2}))/g);
                        matches.neg.consecNumbers = p.match(/(?=(\d{2}))/g);
                        matches.neg.onlyNumbers = p.match(/^[0-9]*$/g);
                        matches.neg.onlyLetters = p.match(/^([a-z]|[A-Z])*$/g);

                        counts.neg.consecLower = matches.neg.consecLower ? matches.neg.consecLower.length : 0;
                        counts.neg.consecUpper = matches.neg.consecUpper ? matches.neg.consecUpper.length : 0;
                        counts.neg.consecNumbers = matches.neg.consecNumbers ? matches.neg.consecNumbers.length : 0;


                        // sequential letters (back and forth)
                        for (i = 0; i < letters.length - 2; i++) {
                            var p2 = p.toLowerCase();
                            forth = letters.substring(i, parseInt(i + 3));
                            back = StringHelper.reverse(forth);
                            if (p2.indexOf(forth) !== -1 || p2.indexOf(back) !== -1) {
                                counts.neg.seqLetter++;
                            }
                        }

                        // sequential numbers (back and forth)
                        for (i = 0; i < numbers.length - 2; i++) {
                            forth = numbers.substring(i, parseInt(i + 3));
                            back = StringHelper.reverse(forth);
                            if (p.indexOf(forth) !== -1 || p.toLowerCase().indexOf(back) !== -1) {
                                counts.neg.seqNumber++;
                            }
                        }

                        // sequential symbols (back and forth)
                        for (i = 0; i < symbols.length - 2; i++) {
                            forth = symbols.substring(i, parseInt(i + 3));
                            back = StringHelper.reverse(forth);
                            if (p.indexOf(forth) !== -1 || p.toLowerCase().indexOf(back) !== -1) {
                                counts.neg.seqSymbol++;
                            }
                        }

                        // repeated chars
                        counts.neg.repeated = _.chain(p.toLowerCase().split('')).
                            countBy(function (val) {
                                return val;
                            })
                            .reject(function (val) {
                                return val === 1;
                            })
                            .reduce(function (memo, val) {
                                return memo + val;
                            }, 0)
                            .value();

                        // Calculations
                        strength += counts.pos.numChars * 4;
                        if (counts.pos.upper) {
                            strength += (counts.pos.numChars - counts.pos.upper) * 2;
                        }
                        if (counts.pos.lower) {
                            strength += (counts.pos.numChars - counts.pos.lower) * 2;
                        }
                        if (counts.pos.upper || counts.pos.lower) {
                            strength += counts.pos.numbers * 4;
                        }
                        strength += counts.pos.symbols * 6;
                        strength += (counts.pos.middleSymbol + counts.pos.middleNumber) * 2;
                        strength += counts.pos.requirements * 2;

                        strength -= counts.neg.consecLower * 2;
                        strength -= counts.neg.consecUpper * 2;
                        strength -= counts.neg.consecNumbers * 2;
                        strength -= counts.neg.seqNumber * 3;
                        strength -= counts.neg.seqLetter * 3;
                        strength -= counts.neg.seqSymbol * 3;

                        if (matches.neg.onlyNumbers) {
                            strength -= counts.pos.numChars;
                        }
                        if (matches.neg.onlyLetters) {
                            strength -= counts.pos.numChars;
                        }
                        if (counts.neg.repeated) {
                            strength -= (counts.neg.repeated / counts.pos.numChars) * 10;
                        }
                    }

                    return Math.max(0, Math.min(100, Math.round(strength)));
                },

                getClass = function (s) {
                    switch (Math.round(s / 33)) {
                        case 0:
                        case 1:
                            return 'danger';
                        case 2:
                            return 'warning';
                        case 3:
                            return 'success';
                    }
                    return '';
                };


            scope.$watch('pwd', function () {
                scope.value = mesureStrength(scope.pwd);
                scope.class = getClass(scope.value);
            });

        }
    };
}

function rockResetField() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, attrs, ctrl) {
            $scope.$watch('isSend()', function (value) {
                if (value === true) {
                    ctrl.$setViewValue(undefined);
                    ctrl.$setPristine(true);
                    ctrl.$render();
                }
            });
        }
    };
}

rockResetFieldIcon.$inject = ['$compile', '$templateCache', 'notification'];
function rockResetFieldIcon($compile, $templateCache, notification) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attr, $ngModel) {
            var template;
            if (!(template = $templateCache.get('form/reset-field-icon'))) {
                template = '<i ng-show="enabled" ng-mousedown="resetField()" class="glyphicon glyphicon-remove-circle reset-icon"></i>';
                $templateCache.put('form/reset-field-icon', template);
            }
            // limit to input element of specific types
            var inputTypes = /text|search|tel|url|email|password/i;
            if ($element[0].nodeName !== "INPUT") {
                notification.debug(new Error("'resetField' is limited to input elements"));
                return;
            }
            if (!inputTypes.test($attr.type)) {
                notification.debug(new Error("Invalid input type for resetField: " + $attr.type));
                return;
            }
            $scope = $scope.$new();
            // compiled reset icon template
            template = $compile(template)($scope);
            $element.after(template);
            $scope.resetField = function () {
                $ngModel.$setViewValue(undefined);
                $ngModel.$setPristine(true);
                $ngModel.$render();
            };
            $element.bind('input', function () {
                $scope.enabled = !$ngModel.$isEmpty($element.val());
            })
                .bind('focus', function () {
                    $scope.enabled = !$ngModel.$isEmpty($element.val());
                })
                .bind('blur', function () {
                    $scope.enabled = false;
                });
        }
    };
}
angular
    .module('rock.forms.controllers', ['pascalprecht.translate'])
    .controller('RockFormController', RockFormController)
    .filter('normalizeAlerts', normalizeAlerts);

/**
 * @ngdoc filter
 * @name normalizeAlerts
 */
normalizeAlerts.$inject = ['httpUtils'];
function normalizeAlerts(httpUtils) {
    return function (inputs, unique) {
        if (inputs) {
            if (unique === undefined) {
                unique = true;
            }
            return httpUtils.normalizeAlerts(inputs, unique);
        }
    };
}

RockFormController.$inject = ['$scope', '$http', '$translate', 'csrfUtils', 'formUtils', 'userUtils', 'notification'];

/**
 *
 * @param $scope
 * @param $http
 * @param {$translate} $translate
 * @param {formUtils} formUtils
 * @param {userUtils} userUtils
 * @param {notification} notification
 * @param {csrfUtils} csrfUtils
 * @constructor
 * @ngInject
 * @export
 */
function RockFormController($scope, $http, $translate, csrfUtils, formUtils, userUtils, notification) {
    $scope.response = {};
    $scope.sending = false;
    $scope.class = 'alert-danger';
    $scope.formName = null;
    $scope.validateOnChanged = false;
    /**
     * Is send http-request.
     * @return {boolean}
     */
    $scope.isSend = function () {
        return $scope.sending;
    };

    /**
     * Adds alert message by attribute.
     * @param {string} attributeName
     * @param {string} msg
     */
    $scope.addAlert = function (attributeName, msg) {
        if (!$scope.response.messages) {
            $scope.response.messages = {};
        }
        $scope.response.messages[attributeName] = msg;
    };

    /**
     * Returns alert by attribute.
     * @return {string|undefined}
     */
    $scope.getAlert = function (attributeName) {
        if (!$scope.isAlerts()) {
            return undefined;
        }
        return $scope.response.messages[attributeName];
    };

    /**
     * Returns list alerts.
     * @return {Object}
     */
    $scope.getAlerts = function () {
        return $scope.response.messages;
    };

    /**
     * Is alerts.
     * @return {boolean}
     */
    $scope.isAlerts = function () {
        return !!$scope.response.messages;
    };

    /**
     * Exists alert by attribute.
     * @return {boolean}
     */
    $scope.existsAlert = function (attributeName) {
        if (!$scope.isAlerts()) {
            return false;
        }
        return !!$scope.response.messages[attributeName];
    };

    /**
     * Reset `$scope.response`.
     */
    $scope.clear = function () {
        $scope.response = {};
    };

    /**
     * Pristine value.
     * @param {string} attributeName
     * @returns {boolean}
     */
    $scope.pristine = function (attributeName) {
        var formName = $scope.formName;
        if (!$scope[formName] || !$scope[formName][attributeName]) {
            return false;
        }
        return $scope[formName][attributeName].$pristine;
    };

    /**
     * Invalid value.
     * @param {string} attributeName
     * @returns {boolean}
     */
    $scope.invalid = function (attributeName) {
        var formName = $scope.formName;
        if (!$scope[formName] || !$scope[formName][attributeName]) {
            return true;
        }
        return $scope[formName][attributeName].$invalid;
    };

    /**
     * Bind error.
     * @param {string} attributeName
     * @return {string|undefined}
     */
    $scope.bindError = function (attributeName) {
        return $scope.getAlert(attributeName);
    };

    /**
     * Show error.
     * @param {string} attributeName
     * @param {string} ruleName
     * @returns {boolean}
     */
    $scope.showError = function (attributeName, ruleName) {
        var formName = $scope.formName;

        if (!$scope[formName] || !$scope[formName][attributeName]) {
            return false;
        }
        if (!!$scope.validateOnChanged) {
            return ($scope[formName][attributeName].$dirty || $scope[formName].$submitted) &&
                ($scope[formName][attributeName].$focused || $scope[formName].$submitted) &&
                $scope[formName][attributeName].$error[ruleName];
        }
        return ($scope[formName][attributeName].$dirty || $scope[formName].$submitted) &&
            $scope[formName][attributeName].$error[ruleName];
    };

    /**
     * Hide error.
     * @param {string} attributeName
     * @returns {boolean}
     */
    $scope.hideError = function (attributeName) {
        var formName = $scope.formName;
        if (!$scope[formName] || !$scope[formName][attributeName]) {
            return false;
        }
        return $scope[formName][attributeName].$valid;
    };

    /**
     * Highlighting input.
     * @param {string} attributeName
     * @return {string}
     */
    $scope.showHighlightError = function (attributeName) {
        var formName = $scope.formName;
        if (!$scope[formName] || !$scope[formName][attributeName]) {
            return '';
        }
        if (!!$scope.validateOnChanged) {
            return $scope[formName][attributeName].$invalid &&
            ($scope[formName][attributeName].$focused || $scope[formName].$submitted) &&
            (!$scope[formName][attributeName].$pristine || $scope[formName].$submitted) ? 'has-error' : '';
        }
        return $scope[formName][attributeName].$invalid && (!$scope[formName][attributeName].$pristine || $scope[formName].$submitted) ? 'has-error' : '';
    };

    /**
     * Returns `src` of captcha.
     * @return {string}
     */
    $scope.getCaptcha = function () {
        return $scope.response.captcha;
    };

    /**
     * Reload captcha.
     * @param {string} url
     * @param {Event} $event
     */
    $scope.reloadCaptcha = function (url, $event) {
        if (!url) {
            return;
        }
        $event.preventDefault();
        formUtils.reloadCaptcha(url).success(function (data) {
            if (data) {
                // changed src
                $event.target.src = data;
                return;
            }
            notification.debug('Request data "captcha" is empty.');
        });
    };

    /**
     * Submit form
     * @param {string} url
     * @param {Event} $event
     */
    $scope.submit = function (url, $event) {
        var formName,
            data = {};

        if (!$scope.formName) {
            notification.debug('Name of form is empty');
            $event.preventDefault();
            return;
        }
        formName = $scope.formName;
        $scope[formName].$setSubmitted();

        if ($scope[formName].$invalid) {
            $event.preventDefault();
            return;
        }

        if (!url) {
            return;
        }
        $event.preventDefault();

        $scope[formName].$submitted = false;
        if (!$scope[formName].values) {
            notification.debug('Values of form is empty');
            return;
        }
        $scope.clear();
        $scope.sending = true;
        data[formName] = $scope[formName].values;
        // add CSRF-token
        data[formName][csrfUtils.getParam()] = csrfUtils.getToken();

        $http.post(url, data).success(httpSuccess).error(httpFail);
    };

    /**
     * @param {string} url
     * @param {Event} $e
     */
    $scope.logout = function (url, $e) {
        if (!url) {
            return;
        }
        $e.preventDefault();
        userUtils.logout(url);
    };

    function httpSuccess(data) {
        $scope.sending = false;
        //$scope.$root.$broadcast('onHttpFormSuccess');
        if (!data) {
            return;
        }
        $scope.class = 'alert-success';
        $translate('lang.success')
            .then(function (msg) {
                if (!$scope.response.messages) {
                    $scope.response.messages = [];
                }
                $scope.response.messages.push(msg);
            });
    }

    function httpFail(data, status) {
        $scope.sending = false;
        $scope.class = 'alert-danger';
        //$scope.$root.$broadcast('onHttpFormFail');
        if (status === 422) {
            $scope.response.messages = data;
        }
    }
}})();