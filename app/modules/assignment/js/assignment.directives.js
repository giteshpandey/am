var assignmentDirectives = angular.module('assignmentDirectiveModule', []);

assignmentDirectives.directive('createNewAssignmentBox', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/assignment/views/new.assignmentBox.html'
	};
});

assignmentDirectives.directive('availableAssignmentBox', ['AssignmentService', function(AssignmentService) {
	return {
		restrict: 'E',
		scope : {
			assignment : "=",
		},
		link : function(scope) {
			scope.assignment.formattedDate = scope.assignment.modifiedAt != null ? moment(scope.assignment.modifiedAt).format('MMMM Do YYYY') : moment().format('MMMM Do YYYY');
			scope.setAssignment = function() {
				
				AssignmentService.setNewAssignment(scope.assignment);
			};
		},
		templateUrl: 'modules/assignment/views/available.assignmentBox.html'
	};
}]);

assignmentDirectives.directive('assignmentItemOption', function() {
	return {
		restrict: 'E',
		scope : {
			choice : "=",
			allChoices : "="
		},
		link : function(scope) {
			// scope.optionIsCorrect = "Incorrect";
			// scope.choice.isCorrect = "Incorrect";			
			// scope.toggleOption = function() {
			// 	if (scope.optionIsCorrect == "Incorrect") {
			// 		scope.choice.isCorrect = "Correct";
			// 		scope.optionIsCorrect = "Correct";
			// 	}
			// 	else {
			// 		scope.choice.isCorrect = "Incorrect";
			// 		scope.optionIsCorrect = "Incorrect";	
			// 	}
			// };
			 
			scope.toggleOption = function() {
				if (scope.choice.isCorrect == "Incorrect") {
					scope.choice.isCorrect = "Correct";
				}
				else {
					scope.choice.isCorrect = "Incorrect";
				}
			};

		    scope.deleteChoice = function() {
		    	for (var c in scope.allChoices) {
		    		if (scope.allChoices[c].desc == scope.choice.desc) {
		    			scope.allChoices.splice(c, 1);
		    		}
		    	}
		    };
		},		
		templateUrl: 'modules/assignment/views/assignmentitem.option.html'
	};
});

