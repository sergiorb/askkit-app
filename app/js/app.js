'use strict';

/* App Module */

var askkitApp = angular.module('askkit-app', [
  'ngRoute',
  'askkitControllers',
  'askkitServices'
]);

askkitApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/polls', {
        templateUrl: 'partials/poll-list.html',
        controller: 'pollListCtrl'
      }).
      when('/polls/:pollId', {
        templateUrl: 'partials/poll-detail.html',
        controller: 'pollDetailCtrl'
      }).
      otherwise({
        redirectTo: '/polls'
      });
  }]);
