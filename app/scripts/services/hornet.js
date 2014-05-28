'use strict';

angular.module('hornetApp')
.service('hornet', function($http, $q){
  var stingerBaseUrl = 'http://127.0.0.1:9003';
  var hornetBaseUrl = 'http://127.0.0.1:7000';
  
  this.Overlays = function() {
    var deferred = $q.defer();
    $http.get(stingerBaseUrl+'/overlay').success(function (data) {
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log('error', data, status, headers, config);
      deferred.reject(data.error);
    });
    return deferred.promise;
  };

  this.Launch = function(instance) {
    var deferred = $q.defer();
    $http.post(hornetBaseUrl+'/launch', instance).success(function (data) {
      console.log('Data', data);
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log('error', data, status, headers, config);
      deferred.reject(data.error);
    });
    return deferred.promise;
  };
});