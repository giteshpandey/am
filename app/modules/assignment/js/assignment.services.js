var assignmentServices = angular.module('assignmentServiceModule', ['ngResource']);

assignmentServices.service('AssignmentService', ['$resource', 'APP_SERVICES_URL', function($resource, APP_SERVICES_URL) {
		var assignmentUrl = APP_SERVICES_URL.ASSIGNMENT;
		var newAssignment;
		var newAssignmentItems = [];

		var currentAssignmentItem = new Object();
		currentAssignmentItem.item = new AssignmentItem();

		this.getAllAssignments = function(success, failure) {
			var allAssignments = $resource(assignmentUrl);
			allAssignments.query({}, success, failure);
		};

		this.saveAssignment = function(assignment, success, failure) {
			var assignmentResource = $resource(assignmentUrl);
			assignmentResource.save({}, assignment, success, failure);
		};

		this.setNewAssignment = function(assignment) {
			newAssignment = assignment;

			while (newAssignmentItems.length > 0) {
                newAssignmentItems.pop();
            } 
            for(var index in assignment.assignmentItems){
            	newAssignmentItems.push(assignment.assignmentItems[index]);
            }

			
		};

		this.getNewAssignment = function() {
			return newAssignment;
		};

		this.getNewAssignmentItems = function() {
			return newAssignmentItems;
		};

		this.resetNewAssignment = function() {
			newAssignment = '';
		};

		this.publishAssignment = function(assignment, success, failure) {
			var publishAssignmentUrl = assignmentUrl + "/publish";
			var assignmentResource = $resource(publishAssignmentUrl);
			assignmentResource.save({}, assignment, success, failure);
		};

		this.setCurrentAssignmentItem = function(assignmentItem) {
			currentAssignmentItem.item = assignmentItem;
		};

		this.getCurrentAssignmentItem = function() {
			return currentAssignmentItem;
		};
}]);