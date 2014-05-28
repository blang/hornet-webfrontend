'use strict';

angular.module('hornetApp')
  .controller('ConfigCtrl', function ($scope, $http) {
    // Data holders
    $scope.config = {};

    // Methods
    $scope.Fetch = function() {
      $http.get('http://127.0.0.1:7000/config').success(function (data){
        $scope.config = data;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data.error);
      });
    };

    $scope.Save = function() {
      $http.post('http://127.0.0.1:7000/config',$scope.config).success(function (data){
        console.log('Save returned data: ',data);
        $scope.$emit('API:connected');
        $scope.config = data;
        showSuccessMessage('Successfully saved');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data.error);
      });
    };

    $scope.Fetch();

    // Helper Functions
    function showErrorMessage(message) {
      $scope.errorMsg = message;
      $('#errorMsg').fadeIn(1000).delay(3000).fadeOut(1000);
    }

    function showSuccessMessage(message) {
      $scope.successMsg = message;
      $('#successMsg').fadeIn(500).delay(1500).fadeOut(500);
    }
  });