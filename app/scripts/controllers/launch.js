'use strict';

angular.module('hornetApp')
  .controller('LaunchCtrl', function ($scope, hornet) {
    $scope.overlays = [];

    $scope.Overlays = function(showMsg){
      hornet.Overlays().then(function(data){
        $scope.overlays = data;
        if (showMsg) {
          showSuccessMessage('Refreshed');
        }
      },function(error){
        showErrorMessage(error);
      });
    };

    $scope.Launch = function(instance){
      hornet.Launch(instance).then(function() {
        showSuccessMessage('Successfully launched');
      }, function(error) {
        showErrorMessage(error);
      });
    };

    $scope.Overlays(false);

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