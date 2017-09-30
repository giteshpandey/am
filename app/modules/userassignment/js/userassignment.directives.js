var userAssignmentDirectives = angular.module('userAssignmentDirectiveModule', []);

userAssignmentDirectives.directive('userassignmentAssignmentBox', ['UserAssignmentService', '$state', function(UserAssignmentService, $state) {
	return {
		restrict: 'E',
		scope : {
			userassignment : "=",
			showCompletedNotification : "&"
		},
		link : function(scope) {
			scope.userassignment.formattedDate = scope.userassignment.modifiedAt != null ? moment(scope.userassignment.modifiedAt).format('MMMM Do YYYY') : moment().format('MMMM Do YYYY');
			 var getAssignment = function(userId, assignmentId) {
				var success = function(userAssignment) {
					UserAssignmentService.setUserAssignment(userAssignment);
					$state.go('user-taking-assignment');
				};
				var failure = function() {
					alert('problem occurred in attempting the assignment');
				};

				UserAssignmentService.getOrTakeAssignment(userId, assignmentId, success, failure);
			};

			scope.setUserAssignment = function() {
				if (scope.userassignment.status.toUpperCase() === "IN_PROGRESS") {
					getAssignment(scope.userassignment.userId, scope.userassignment.id);
				}
				else if (scope.userassignment.status.toUpperCase() === "COMPLETED") {
					scope.showCompletedNotification();
				}
				else {
					UserAssignmentService.setUserAssignment(scope.userassignment);
					$state.go("user-assignment-detail");	
				}
			};

			scope.getUserAssignmentStatusClass = function() {
				if (scope.userassignment.status.toUpperCase() === "IN_PROGRESS") {
					return "details-container in_progress";
				}
				else if (scope.userassignment.status.toUpperCase() === "PUBLISHED") {
					return "details-container published";
				}
				else {
					return "details-container completed";
				}
			};
		},		
		templateUrl: 'modules/userassignment/views/userassignment.assignmentBox.html'
	};
}]);


userAssignmentDirectives.directive('assignmentHeader', function() {
	return {
		restrict : 'E',
		scope : {
			items : "=",
			itemTracker : "=",			
			// answeredItems : "="
		},
		templateUrl: 'modules/userassignment/views/userassignment.takingassignment.item.header.html',
		link : function (scope) {
			scope.totalItemsCount = scope.items.length;

            scope.show = function(key) {
                if(key == scope.itemTracker.currentAssignmentItem){
                	return 'current';
                }
                 for (var property in scope.items[key].answers) {
                       if(scope.items[key].answers[property] != undefined && scope.items[key].answers[property] != ""){
                          return 'answered';
                       	
                       }
                     }

				return '';
			};

			scope.jumpToItem = function(key) {
				scope.itemTracker.currentAssignmentItem = key;
			};

		}
	};
});

userAssignmentDirectives.directive('assignmentItem', function() {
	return {
		restrict : 'E',
		scope : {
			item : "=",
			saveAssignmentItemAnswer : "&"
		},
		templateUrl: 'modules/userassignment/views/userassignment.takingassignment.item.content.html',
		link : function (scope) {
           scope.isChecked = function(choiceValue) {
	           	var answers = scope.item.answers;
	           	for (var key in answers) {
	           		if (answers[key] == choiceValue) return true;
	           	}
	           	return false;
           };           
		}
	};
});

userAssignmentDirectives.directive('assignmentFooter', function() {
	return {
		restrict : 'E',
		scope : {
			currentAssignmentItemKey : "@",
			enablePrev : "=",
			enableNext : "=",
			enableSubmit : "=",
			showAndSetNextAssignmentItem : "&",
			showAndSetPrevAssignmentItem : "&",
			submitAssignment : "&"
		},
		templateUrl: 'modules/userassignment/views/userassignment.takingassignment.item.footer.html',
		link : function (scope) {

		}
	};
});