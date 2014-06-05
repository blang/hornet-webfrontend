'use strict';

angular.module('hornetApp')
  .controller('ConfigCtrl', function ($scope, $http, hornet) {
    // Data holders
    $scope.config = {};

    // Methods
    $scope.Fetch = function() {
      hornet.Config().then(function(data){
        $scope.config = data;
      }, function(error) {
        showErrorMessage(error);
      });
    };

    $scope.Save = function() {
      hornet.SetConfig($scope.config).then(function(data) {
        $scope.config = data;
        showSuccessMessage('Successfully saved');
      }, function(error) {
        showErrorMessage(error);
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