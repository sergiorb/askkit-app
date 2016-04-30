'use strict';

/* App Module */

var askkitApp = angular.module('askkit-app', [
  'ngRoute',
  'askkitControllers',
  'askkitServices',
  'chart.js'
]);

askkitApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/polls', {
        templateUrl: 'partials/poll-list.html',
        controller: 'pollListCtrl'
      }).
      when('/polls/create', {
        templateUrl: 'partials/poll-create.html',
        controller: 'pollCreateCtrl'
      }).
      when('/polls/:pollId', {
        templateUrl: 'partials/poll-detail.html',
        controller: 'pollDetailCtrl'
      }).
      when('/options/:optionId', {
        templateUrl: 'partials/option-detail.html',
        controller: 'optionDetailCtrl'
      }).
      otherwise({
        redirectTo: '/polls'
      });
  }]);

