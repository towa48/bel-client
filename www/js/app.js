angular.module('BelApp', ['ionic'])

/*
 * Router config
 */
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html",
      controller : "HomeController"
    })
    .state('counter', {
      url: "/counter",
      templateUrl: "counter.html",
      controller : "CounterController"
    });

  $urlRouterProvider.otherwise("/home");

})

/*
 * Drag directive
 */
.directive('dragBack', function($ionicGesture, $state) {
  return {
    restrict: 'EAC',
    link: function(scope, elem, attr) {
      $ionicGesture.on('swiperight', function(event) {
        event.preventDefault();
        window.history.back();
      }, elem);
    }
  }
})

/*
 * BelStorage Service
 */
.service('BelStorage', function() {
  this.get = function(name) {
    return JSON.parse(window.localStorage[name] || 'null');
  }
  this.set = function(name, value) {
    window.localStorage[name] = JSON.stringify(value);
  }
})

/*
 * App Controller
 */
.controller('AppController', function($scope) {
  $scope.leftButtons = [];
  /*$scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.sideMenuController.toggleLeft();
    }
  }];*/
})

.controller('HomeController', function($scope) {
})

.controller('CounterController', ['$scope', 'BelStorage', function($scope, belStorage) {

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.sideMenuController.toggleLeft();
    }
  }];

  //belStorage.set('MeterSN', 123456789)
  $scope.meterSN = belStorage.get('MeterSN');

}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
