'use strict';

angular
.module('hornetApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    routeid: 'home',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/config', {
    routeid: 'config',
    templateUrl: 'views/config.html',
    controller: 'ConfigCtrl'
  })
  .when('/launch', {
    routeid: 'launch',
    templateUrl: 'views/launch.html',
    controller: 'LaunchCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function ($location, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    $rootScope.routeid = current.$$route.routeid;
  });
});
