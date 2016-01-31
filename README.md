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
> ionic build android
> cordova build --release android
```

## Требования
_Определяются плагином cordova-plugin-datepicker_

* iOS 6.0+
* Android 2.3+

## Лицензия

MIT (см файл LICENSE)
