# BelClient

## Описание

Мобильное приложение для отправки показаний счетчика ЗАО «Балашихинская Электросеть»

## Разработка

Программа написана на платформе [ionic](http://ionicframework.com/):
* [Apache Cordova](https://cordova.apache.org/)
* [AngularJs](https://angular.io/)
* JavaScript, HTML, CSS

Для начала необходимо скачать и установить [NodeJs](https://nodejs.org/).
Затем установить ionic и cordova:
```shell
> sudo npm install -g ionic
> sudo npm install -g cordova
```

Запуск проекта в браузере:
```shell
> ionic serve
```

## Сборка

Сборка проекта под Android:
```shell
> cordova build --release android
```

Процесс подписи сборки под andoid описан в разделе ["Publishing your app"](http://ionicframework.com/docs/guide/publishing.html).

## Релизы

Готовые сборки программы под andorid можно скачать в разделе [Releases](./releases).
Для устновки скачайте файл "BelClient.apk", и кликните по нему в проводнике android. При необходимости так же надо будет включить установку от ["неизвестных поставщиков"](http://developer.android.com/distribute/tools/open-distribution.html#unknown-sources) (этот пункт можно найти в разделе "безопасность" вашего телефона).

## Требования
_Определяются плагином cordova-plugin-datepicker_

* iOS 6.0+
* Android 2.3+

## Лицензия

MIT (см файл LICENSE)
