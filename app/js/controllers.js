'use strict';

/* Controllers */

var askkitControllers = angular.module('askkitControllers', []);

askkitControllers.controller('aboutCtrl', ['$scope', 
	function($scope){
		$scope.foo = false;
}]);

askkitControllers.controller('pollListCtrl', ['$scope', 'Poll',
	function($scope, Poll) {

		$scope.messages = {
			'success': null,
			'error': null
		};

		$scope.info = true;
		
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


askkitControllers.controller('pollCreateCtrl', ['$scope', '$routeParams', 'Poll', '$location',
	function($scope, $routeParams, Poll, $location) {

		$scope.info = true;

		$scope.messages = {
			'success': null,
			'error': null
		};

		$scope.poll = new Poll();

		$scope.poll = {
			options : [{'optionText': ''},{'optionText': ''}]
		}

		
		$scope.addOption = function() {
			$scope.poll.options.push({'optionText': ''});
		}

		$scope.removeOption = function() {
			$scope.poll.options.pop();	
		}

		$scope.addPoll = function() {

			Poll.save($scope.poll, function(data){
				$location.path("/polls/"+data.id);

			}, function(error){
				scope.messages.error = error;
			});
			
		}

		var checkDeleteOption = function () {
			$scope.canDeleteOption = false;
			
			if ($scope.poll.options.length > 2) {
				$scope.canDeleteOption = true;
			}
		};

		var checkPollTitle = function () {
			$scope.pollTitleOk = false;
			
			if($scope.poll.title != '' && $scope.poll.title != null) {
				$scope.pollTitleOk = true;
			}
		};

		var checkPollOptions = function () {
			$scope.pollOptionsOk = false;

			for(var x=0; x < $scope.poll.options.length; x++) {

				if($scope.poll.options[x].optionText == '' && $scope.poll.options[x].optionText != null) {
					
					return false;
				}
			}

			$scope.pollOptionsOk = true;
		};

		var checkPollOk = function () {

			$scope.pollOk = false;

			if($scope.pollTitleOk && $scope.pollOptionsOk) {

				$scope.pollOk = true;
			}
		};

		$scope.$watch('poll', function () {
			checkDeleteOption();
			checkPollTitle();
			checkPollOptions();
			checkPollOk();
		}, true);
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