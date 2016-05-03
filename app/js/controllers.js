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


askkitControllers.controller('pollCreateCtrl', ['$scope', '$routeParams', 'Poll', '$uibModal',
	function($scope, $routeParams, Poll, $uibModal) {

		$scope.info = true;

		$scope.messages = {
			'success': null,
			'error': null
		};

		$scope.poll = new Poll();

		$scope.poll = {
			options : [{'optionText': ''},{'optionText': ''}]
		};

		
		$scope.addOption = function() {
			$scope.poll.options.push({'optionText': ''});
		};

		$scope.removeOption = function() {
			$scope.poll.options.pop();	
		};
		
		$scope.openCreateModal = function () {

			$uibModal.open({
				animation: true,
				templateUrl: 'partials/createPollModal.html',
				controller: 'createPollCtrl',
				resolve: {
					pollObj: function () {
						return $scope.poll;
					}
				}
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

		var checkPollOptionsValue = function () {

			$scope.pollOptionsValueOk = false;

			for(var x=0; x < $scope.poll.options.length; x++) {

				if($scope.poll.options[x].optionText == '' && $scope.poll.options[x].optionText != null) {
					
					return false;
				}
			}

			$scope.pollOptionsValueOk = true;
		};

		var checkPollOptionsDifferents = function () {

			$scope.pollOptionsDifferentsOk = false;

			for(var x=0; x < $scope.poll.options.length; x++) {
				for(var i=0; i < $scope.poll.options.length; i++) {
					if(x!= i) {
						if($scope.poll.options[x].optionText.toLowerCase() == $scope.poll.options[i].optionText.toLowerCase()) {
							return false
						}
					}
				}
			}

			$scope.pollOptionsDifferentsOk = true;
		};

		var checkPollOk = function () {

			$scope.pollOk = false;

			if($scope.pollTitleOk && $scope.pollOptionsValueOk && $scope.pollOptionsDifferentsOk) {

				$scope.pollOk = true;
			}
		};

		$scope.$watch('poll', function () {
			checkDeleteOption();
			checkPollTitle();
			checkPollOptionsValue();
			checkPollOptionsDifferents();
			checkPollOk();
		}, true);
}]);

askkitControllers.controller('createPollCtrl', ['$scope', '$uibModalInstance', '$location', 'Poll', 'pollObj',
	function ($scope, $uibModalInstance, $location, Poll, pollObj) {

  $scope.poll = pollObj;

  $scope.create = function() {

		Poll.save($scope.poll, function(data){
			
			$location.path("/polls/"+data.id);
			$uibModalInstance.dismiss('cancel');

		}, function(error){
			console.log(error);
		});
		
	};

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
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