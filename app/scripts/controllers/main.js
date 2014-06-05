'use strict';

angular.module('hornetApp')
  .controller('MainCtrl', function ($scope, $rootScope, hornet, $timeout) {
    $rootScope.hornetConnected = false;
    $scope.Ping = function () {
      hornet.Ping().then(function(){
        $rootScope.hornetConnected = true;
      }, function() {
        $rootScope.hornetConnected = false;
        $timeout(function(){
          $scope.Ping();
        }, 3000);
      });
    };

    $scope.Ping();
  });
