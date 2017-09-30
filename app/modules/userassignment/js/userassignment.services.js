var userAssignmentServices = angular.module('userAssignmentServiceModule', ['ngResource']);

userAssignmentServices.service('UserAssignmentService', ['$resource', 'APP_SERVICES_URL', function($resource, APP_SERVICES_URL) {
		var userAssignmentBaseUrl = APP_SERVICES_URL.USERASSIGNMENT;
		var userassignment;

		this.getAssignments = function(userId, success, failure) {
			var userAssignmentUrl = userAssignmentBaseUrl// + "/:userId/:assignmentId";
			var userAssignments = $resource(userAssignmentUrl, 
											{userId: '@userId', assignmentId: '@assignmentId'}, 
											{query: {isArray: false}}
											);
			userAssignments.query({userId : userId}, success, failure);
		};

		this.setUserAssignment = function(assignment) {
			userassignment = assignment;
		};

		this.getUserAssignment = function() {
			return userassignment;
		};


		this.getOrTakeAssignment = function(userId, assignmentId, success, failure) {
			var userAssignmentUrl = userAssignmentBaseUrl// + "/:userId/:assignmentId";
			var userAssignments = $resource(userAssignmentUrl, 
											{userId: '@userId', assignmentId: '@assignmentId'}, 
											{query: {isArray: false}}
											);
			userAssignments.query({userId : userId, assignmentId : assignmentId}, success, failure);
		};

		this.saveOrSubmitAssignmentProgress = function(userAssignmentDTO, isSubmit, success, failure) {
			var userAssignments = $resource(userAssignmentBaseUrl);
			userAssignments.save({userAssignmentDTOStr : userAssignmentDTO, isSubmit : isSubmit}, success, failure);	
		};
}]);