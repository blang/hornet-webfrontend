'use strict';

angular.module('hornetApp')
.service('hornet', function($http, $q, $rootScope, $location){
  var stingerBaseUrl = 'http://127.0.0.1:9003';
  var hornetBaseUrl = 'http://127.0.0.1:7000';
  
  this.Ping = function() {
    var deferred = $q.defer();
    $http.get(hornetBaseUrl+'/ping').success(function () {
      console.log('Ping successful');
      deferred.resolve();
    }).error(function() {
      console.log('Ping not successful');
      deferred.reject();
    });
    return deferred.promise;
  };

  this.Overlays = function() {
    var deferred = $q.defer();
    $http.get(stingerBaseUrl+'/overlay').success(function (data) {
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log('error', data, status, headers, config);
      if (status === 0) {
        deferred.reject('Connection to Stinger failed');
      }else{
        deferred.reject(data.error);
      }
    });
    return deferred.promise;
  };

  this.Launch = function(instance) {
    var deferred = $q.defer();
    $http.post(hornetBaseUrl+'/launch', instance).success(function (data) {
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      if (status === 0) {
        emitHornetDisconnected();
      }
      console.log('error', data, status, headers, config);
      deferred.reject(data.error);
    });
    return deferred.promise;
  };

  this.Config = function() {
    var deferred = $q.defer();
    $http.get(hornetBaseUrl+'/config').success(function (data){
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      if (status === 0) {
        emitHornetDisconnected();
      }
      console.log('error', data, status, headers, config);
      deferred.reject(data.error);
    });
    return deferred.promise;
  };
  this.SetConfig = function(data) {
    var deferred = $q.defer();
    $http.post(hornetBaseUrl+'/config',data).success(function (data){
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      if (status === 0) {
        emitHornetDisconnected();
      }
      console.log('error', data, status, headers, config);
      deferred.reject(data.error);
    });
    return deferred.promise;
  };

  function emitHornetDisconnected() {
    $rootScope.hornetConnected = false;
    $rootScope.$emit('hornet:disconnected');
  }

  function disconnectTrap() {
    if(!$rootScope.hornetConnected) {
      $location.path('/');
    }
  }

  $rootScope.$on('hornet:disconnected', function(){
    disconnectTrap();
  });
  disconnectTrap();
});