'use strict';

/* Controllers */

var askkitControllers = angular.module('askkitControllers', []);

askkitControllers.controller('pollListCtrl', ['$scope', 'poll',
  function($scope, poll) {
    $scope.polls = poll.query();
  }]);

askkitControllers.controller('pollDetailCtrl', ['$scope', '$routeParams', 'poll',
  function($scope, $routeParams, poll) {
    $scope.poll = poll.get({pollId: $routeParams.pollId});
  }]);
