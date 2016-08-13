[![belclient](https://towa48.github.io/bel-client/images/screenshot-small.png)](https://towa48.github.io/bel-client)

# BelClient

## Описание

Мобильное приложение для отправки показаний счетчика ЗАО «Балашихинская Электросеть»

## Готовые сборки

Готовые сборки программы под andorid можно скачать в разделе [Releases](https://github.com/towa48/bel-client/releases).
Для устновки скачайте файл "BelClient.apk", и кликните по нему в проводнике android. При необходимости так же надо будет включить установку от ["неизвестных поставщиков"](http://developer.android.com/distribute/tools/open-distribution.html#unknown-sources) (этот пункт можно найти в разделе "безопасность" вашего телефона).

## Разработка

Программа написана на платформе [ionic](http://ionicframework.com/):
* [Apache Cordova](https://cordova.apache.org/)
* [AngularJs](https://angular.io/)
* JavaScript, HTML, CSS

Для начала необходимо скачать и установить [NodeJs](https://nodejs.org/).
Затем установить зависимости:
```shell
# npm install -g gulp
# npm install -g ionic
# npm install -g cordova
# npm install -g bower
> npm install
> bower install
```

Сборка и запуск проекта в браузере:
```shell
> gulp
> ionic serve
```

## Сборка

Предварительно необходимо скачать и настроить ["Android SDK и Java Development Kit"](https://cordova.apache.org/docs/ru/latest/guide/platforms/android/).

Сборка проекта под Android:
```shell
> gulp --release
> cordova platform add android
> cordova build --release android
```

Процесс подписи сборки под andoid описан в разделе ["Publishing your app"](http://ionicframework.com/docs/guide/publishing.html).

## Отладка в эмуляторе Android

Установка приложения в эмулятор
```shell
> adb install ~/workspace/belclient/belclient-signed-1.0.0-beta3.apk
```

Просмотр вывода console.log с эмулятора

```shell
> adb logcat chromium:D *:S
```

## Требования
_Определяются плагином cordova-plugin-datepicker_

* iOS 6.0+
* Android 2.3+

## Лицензия

MIT (см файл LICENSE)
