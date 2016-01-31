var DeliveryTypes = {
  Post: 0,
  Email: 1
}

var RequestResult = {
  Ok: 'ok',
  Error: 'error'
}

var TariffType = {
  SingleRate: 0,
  DoubleRate: 1,
  TrippleRate: 2
}

var TariffSelector = {}
TariffSelector[TariffType.SingleRate] = 'Одноставочный тариф';
TariffSelector[TariffType.DoubleRate] = 'Двухзонный тариф';
TariffSelector[TariffType.TrippleRate] = 'Трехзонный тариф';

var BillDeliveryType = {
  Post: 0,
  Email: 1
}

var BillDeliverySelector = {}
BillDeliverySelector[BillDeliveryType.Post] = 'В почтовый ящик';
BillDeliverySelector[BillDeliveryType.Email] = 'По эл.почте';

function CounterData(account) {
  this.confirmed = '';
  this.account = account || '';
  this.c_date = new Date();
  this.c_day = null;
  this.c_night = null;
  this.c_peak = null;
  this.c_delivery = BillDeliveryType.Post;
  this.email = null;
  this.phone = null;
  this.i_am_human = 'y';
}

/*
 * Success modal dialog
 */
var SuccessModal = function($ionicModal, scope) {
  this.$scope = scope.$new(true);
  this._modal = null;
  var self = this;

  this.show = function(done) {
    $ionicModal.fromTemplateUrl('success-modal.html', {
      scope: self.$scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      self._modal = modal;
      self.$scope.closeModal = function(e) {
        e && e.preventDefault();

        modal.hide.call(modal);
        modal.remove();
        if (typeof done === 'function') {
          done.call(scope);
        }
        self._modal = null;
      }
      modal.show();
    });

    scope.$on('$destroy', function() {
      self._modal && self._modal.remove();
      self._modal = null;
    });
  }
}

/*
 * Error modal dialog
 */
var ErrorModal = function($ionicModal, scope) {
  this.$scope = scope.$new(true);
  this._modal = null;
  var self = this;

  this.show = function(done) {
    $ionicModal.fromTemplateUrl('error-modal.html', {
      scope: self.$scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      self._modal = modal;
      self.$scope.closeModal = function(e) {
        e && e.preventDefault();

        modal.hide.call(modal);
        modal.remove();
        if (typeof done === 'function') {
          done.call(scope);
        }
        self._modal = null;
      }
      modal.show();
    });

    scope.$on('$destroy', function() {
      self._modal && self._modal.remove();
      self._modal = null;
    });
  }
}

/*
 * ANGULAR APPLICATION
 */
angular.module('BelApp', ['ionic'])

/*
 * Router config
 */
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider' ,function($stateProvider, $urlRouterProvider, $httpProvider) {

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

  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

}])

/*
 * Date Picker
 */
.factory('cordovaDatePicker', ['$window', '$q', function($window, $q) {
  return {
    show: function(options) {
      var q = $q.defer();
      options = options || {date: new Date(), mode: 'date'};

      // check for debug in browser
      if (!$window.datePicker) {
        q.resolve(new Date);
        return q.promise;
      }

      $window.datePicker.show(options, function(date) {
        q.resolve(date);
      }, function(error){
        q.reject(error);
      });
      return q.promise;
    }
  }
}])


/*
 * Drag directive
 */
.directive('dragBack', ['$ionicGesture', '$state', function($ionicGesture, $state) {
  return {
    restrict: 'EAC',
    link: function(scope, elem, attr) {
      $ionicGesture.on('swiperight', function(event) {
        event.preventDefault();
        window.history.back();
      }, elem);
    }
  }
}])

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
 * BelClient Service
 */
.service('BelClient', ['$http', '$q', function($http, $q) {
  this.send = function(data) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    promise.done = function(handler) {
      promise.then(function(response) {
        handler.call(window, response.data, response.status, response.headers);
      });
      return promise;
    }
    promise.fail = function(handler) {
      promise.then(null, function(response) {
        handler.call(window, response.data, response.status, response.headers);
      });
      return promise;
    }

    $http.post('/counter', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(data) {
          var str = [];
          for(var p in data)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
          return str.join("&");
        }})
      .then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject(response);
      });

    return promise;
  }
}])

/*
 * App Controller
 */
.controller('AppController', ['$scope', function($scope) {
  $scope.leftButtons = [];
  /*$scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.sideMenuController.toggleLeft();
    }
  }];*/
}])

.controller('HomeController', ['$scope', function($scope) {
}])

.controller('CounterController', [
  '$scope',
  '$ionicModal',
  '$state',
  'cordovaDatePicker',
  'BelStorage',
  'BelClient',
  function($scope, $ionicModal, $state, cordovaDatePicker, belStorage, belClient) {

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      $scope.sideMenuController.toggleLeft();
    }
  }];

  var account = belStorage.get('AccountID') || '';
  $scope.form = new CounterData(account);
  $scope.tariffType = TariffType.SingleRate;
  $scope.Tariffs = TariffType;
  $scope.TariffSelector = TariffSelector;
  $scope.BillDeliverySelector = BillDeliverySelector;

  $scope.showDatePicker = function() {
    var options = {
      date: $scope.form.c_date,
      mode: 'date',
    };
    cordovaDatePicker.show(options)
      .then(function(date) {
        $scope.form.c_date = date;
        $scope.$digest();
      });
  }

  $scope.goHome = function() {
    $state.go("home");
  }

  $scope.clearForm = function() {
    $scope.form = new CounterData();
  }

  $scope.send = function(e) {
    belClient.send($scope.form)
      .done(function(data, status, headers) {
        if (data.result && data.result === RequestResult.Ok) {
          belStorage.set('AccountID', $scope.form.account);
          new SuccessModal($ionicModal, $scope).show(function() {
            $scope.goHome();
          });
          return;
        }

        // http 200 with error
        console.error('server response (http ' + status + '): ' + data.errorText)
        new ErrorModal($ionicModal, $scope).show(function() {
          $scope.goHome();
        });
      })
      .fail(function(data, status, headers) {
        // http != 200
        console.error('server response (http ' + status + ')');
        new ErrorModal($ionicModal, $scope).show(function() {
          $scope.goHome();
        });
      });
  }

  $scope.cancel = function() {
    $scope.clearForm();
    $scope.goHome();
  }
}])

.run(['$ionicPlatform', function($ionicPlatform) {
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
}])
