'use strict';

/* Controllers */

var askkitControllers = angular.module('askkitControllers', []);

askkitControllers.controller('pollListCtrl', ['$scope', 'Poll',
	function($scope, Poll) {

		$scope.messages = {
			'success': null,
			'error': null
		};
		
		$scope.random_polls = Poll.randomset(function(success){
					$scope.messages.success = success;
			}, function(error){
					$scope.messages.error = error;
			});
}]);

askkitControllers.controller('pollDetailCtrl', ['$scope', '$routeParams', 'Poll', 'Option',
	function($scope, $routeParams, Poll, Option) {

	$scope.labels = [];
	$scope.data = [];
	$scope.messages = {
			'success': null,
			'error': null
		};

	$scope.poll = Poll.get({pollId: $routeParams.pollId}, function(pollDetail){

		pollDetail.options.labels = [];

		for (var i = 0; i < pollDetail.options.length; i++) {
			$scope.labels.push(pollDetail.options[i].optionText);
			$scope.data.push(pollDetail.options[i].percentage);
		};
	}, function(error){
		$scope.messages.error = error;
	});

	$scope.vote = function(id) {

		var option = Option.get({optionId: id})


		option.$vote({optionId: id}, function(success){
				$scope.messages.success = success;
			}, function(error){
					$scope.messages.error = error;
			});
	};
}]);

askkitControllers.controller('optionDetailCtrl', ['$scope', '$routeParams', 'Option',
	function($scope, $routeParams, Option) {

		$scope.messages = {
			'success': null,
			'error': null
		};

		$scope.option = Option.get({optionId: $routeParams.optionId});

		$scope.vote = function() {

			$scope.option.$vote(function(success){
					$scope.messages.success = success;
			}, function(error){
					$scope.messages.error = error;
			});

		};
		
}]);