'use strict';

/* Controllers */

var askkitControllers = angular.module('askkitControllers', []);

askkitControllers.controller('pollListCtrl', ['$scope', 'poll',
  function($scope, poll) {
    $scope.random_polls = poll.randomset();
  }]);

askkitControllers.controller('pollDetailCtrl', ['$scope', '$routeParams', 'poll',
  function($scope, $routeParams, poll) {

  	$scope.labels = [];
  	$scope.data = [];

    $scope.poll = poll.get({pollId: $routeParams.pollId}, function(pollDetail){

    	pollDetail.options.labels = [];
    	for (var i = 0; i < pollDetail.options.length; i++) {
    		$scope.labels.push(pollDetail.options[i].optionText);
    		$scope.data.push(pollDetail.options[i].percentage);
    	};
    });	
  }]);

askkitControllers.controller('optionDetailCtrl', ['$scope', '$routeParams', 'option',
  function($scope, $routeParams, option) {
    $scope.option = option.get({optionId: $routeParams.optionId});
  }]);