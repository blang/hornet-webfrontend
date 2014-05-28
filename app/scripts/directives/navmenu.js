'use strict';

angular.module('hornetApp')
.directive('navMenu', function($location) {
  return function(scope, element) {
    var links = element.find('li'),
        link,
        currentLink,
        listEntry,
        urlMap = {},
        i;
    for (i = 0; i < links.length; i++) {
      listEntry = angular.element(links[i]);
      link = listEntry.find('a');
      if (link.length > 0) {
        urlMap[link.attr('ng-href')] = listEntry;
      }
    }


    var onrouteChange = function() {
      var pathLink = urlMap['#'+$location.path()] || urlMap[$location.path()];
      if (pathLink) {
        if (currentLink) {
          currentLink.removeClass('active');
        }
        currentLink = pathLink;
        currentLink.addClass('active');
      }
    };
    scope.$on('$routeChangeStart', onrouteChange);
  };
});