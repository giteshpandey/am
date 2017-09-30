var userAssignmentControllers = angular.module('userAssignmentControllerModule', []);

userAssignmentControllers.controller('UserAssignmentCntrl', ['$timeout', '$scope','$cookies', '$state', 'UserAssignmentService', function($timeout, $scope, $cookies, $state, UserAssignmentService) {
	var userObj = $cookies.getObject('user');
	$scope.userId = userObj !== undefined && userObj !== null ? userObj.id.toUpperCase() : null;
	$scope.hasUserCompleted = false;
	$scope.getUserAssignments = function() {
		var success = function(userAssignments) {
			$scope.userAssignments = userAssignments;
		};

		var failure = function() {
			alert('problem occurred in getting user assignments');
		};

		UserAssignmentService.getAssignments($scope.userId, success, failure);
	};

	$scope.setAssignmentInScope = function() {
		$scope.userAssignment = UserAssignmentService.getUserAssignment();
	};

	$scope.getOrTakeAssignment = function() {
		var success = function(userAssignmentDTO) {
			UserAssignmentService.setUserAssignment(userAssignmentDTO);
			$state.go('user-taking-assignment');
		};
		var failure = function() {
			alert('problem occurred in attempting the assignment');
		};

		UserAssignmentService.getOrTakeAssignment($scope.userId, $scope.userAssignment.id, success, failure);
	};

	$scope.showCompletedNotification = function() {
			$scope.hasUserCompleted = true;
			$timeout(function() {
                    $scope.hasUserCompleted = false;
                }, 2000);
	};

}]);


userAssignmentControllers.controller('UserTakingAssignmentCntrl', ['$scope', '$state', 'UserAssignmentService', '$cookies', '$timeout', function($scope, $state, UserAssignmentService, $cookies, $timeout) {
	$scope.initAssignment = function() {		
		var userObj = $cookies.getObject('user');
		$scope.userId = userObj !== undefined && userObj !== null ? userObj.id.toUpperCase() : null;
		$scope.assignment = UserAssignmentService.getUserAssignment();	
		$scope.totalAssignmentItemCount = $scope.assignment !== undefined ? $scope.assignment.assignmentItems.length : null;
		$scope.itemTracker = {};
		$scope.itemTracker.currentAssignmentItem = 0;	
		$scope.assignmentProgressSaved = false;
		$scope.showResult = false;
	}

	$scope.showCurrentQues = function(key) {
		if (key === $scope.itemTracker.currentAssignmentItem)
		 return true;
		else return false;
	};

	$scope.saveOrSubmitAssignmentProgress = function(isSubmit) {
		var success = function(userAssignmentDTO) {
            if (!isSubmit) {
                $scope.assignmentProgressSaved = true;
                $timeout(function() {
                    $scope.assignmentProgressSaved = false;
                }, 2000);
            }
            else {
                $scope.showResult = true;
                $scope.scorePercentage = userAssignmentDTO.scorePercentage;
            }                                              
            $scope.$parent.assignment = userAssignmentDTO;
        };
        var failure = function() {
                        alert('problem occurred in saving the assignment progress!');
        };

        UserAssignmentService.saveOrSubmitAssignmentProgress($scope.assignment, isSubmit, success, failure);	
	};

	$scope.resetAssignmentProgress = function() {
		$scope.assignmentProgressSaved = false;
	};

	$scope.enablePrev = function(key) {
		if (key > 0) return true;		
		else return false;
	};

	$scope.enableNext = function(key) {		
		if (key < $scope.totalAssignmentItemCount - 1) return true;
		else return false;
	};	

	$scope.enableSubmit = function(key) {
		if (key === $scope.totalAssignmentItemCount - 1) return true;
		else return false;
	};

	$scope.showAndSetNextAssignmentItem = function(currentAssignmentItemKey) {
		$scope.itemTracker.currentAssignmentItem = parseInt(currentAssignmentItemKey) + 1;
	};

	$scope.showAndSetPrevAssignmentItem = function(currentAssignmentItemKey) {
		$scope.itemTracker.currentAssignmentItem = parseInt(currentAssignmentItemKey) - 1;
	};

	$scope.submitAssignment = function () {

	}
}]);