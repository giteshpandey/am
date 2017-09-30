var assignmentControllers = angular.module('assignmentControllerModule', []);

assignmentControllers.controller('AssignmentCntrl', ['$scope', 'AssignmentService', '$state', function($scope, AssignmentService, $state){
	
	$scope.newAssignment = new Assignment();

	$scope.createNewAssignment = function() {
		var success = function(assignment) {
			$scope.newAssignment = assignment;
			AssignmentService.setNewAssignment(assignment);
			$state.go('edit-assignment');
		};

		var failure = function() {
			alert('problem occurred in creating new assignment');
		};

		AssignmentService.saveAssignment($scope.newAssignment, success, failure);
	}

	$scope.getAllAssignments = function() {
		var success = function(assignments) {
			$scope.allAssignments = assignments;
		};

		var failure = function() {
			alert('problem occurred in getting all assignments');
		};

		AssignmentService.getAllAssignments(success, failure);
	}

	$scope.publishAssignment = function() {
		var success = function(assignment) {
			$scope.newAssignment = assignment;
			alert('Assignment successfully publieshed!!');
		};

		var failure = function() {
			alert('problem occurred in publishing the assignment');
		};

		AssignmentService.publishAssignment(AssignmentService.getNewAssignment(), success, failure);
	}

	$scope.getNewAssignment = function() {
		$scope.newAssignment = AssignmentService.getNewAssignment();
	}

	$scope.setAssignment = function(selectedAssignment) {
		$scope.newAssignment = selectedAssignment;
		AssignmentService.setNewAssignment(selectedAssignment);
	}


}]);

assignmentControllers.controller('AssignmentItemCntrl', ['$scope', 'AssignmentService', 'uiGridConstants', function($scope, AssignmentService, uiGridConstants){
	$scope.assignmentItem = AssignmentService.getCurrentAssignmentItem();
    $scope.assignmentItem.item = new AssignmentItem();
	
	$scope.itemWeightOptions = [1,2,3,4,5,6,7,8,9,10];
	
	//TODO: We should not send/receive the full Assignment object from UI to/from server
	$scope.saveAssignmentItem = function() {
		if ($scope.assignmentItem.item.id == "" || $scope.assignmentItem.item.id ==undefined) {
			AssignmentService.getNewAssignment().assignmentItems.push($scope.assignmentItem.item);	
		}
		var success = function(assignment) {
			AssignmentService.setNewAssignment(assignment);
			var newAssignmentItem = new AssignmentItem();
			AssignmentService.setCurrentAssignmentItem(newAssignmentItem);
			console.log(JSON.stringify(AssignmentService.getNewAssignment()));
		};

		var failure = function() {
			alert('problem occurred in saving assignment item');
		};
		AssignmentService.saveAssignment(AssignmentService.getNewAssignment(), success, failure);
		//$scope.assignmentItem.item = new AssignmentItem();
	}


	$scope.createChoice = function() {
	    $scope.assignmentItem.item.itemChoices.push(new ItemChoice());
	}

	$scope.deleteAssignmentItem = function() {
		if ($scope.assignmentItem.item.id == "") {
			$scope.assignmentItem.item.reset();
		}
		else {
			var currentAssignmentItems = AssignmentService.getNewAssignment().assignmentItems;	
			for (var itemIndex in currentAssignmentItems) {
				if (currentAssignmentItems[itemIndex].id == $scope.assignmentItem.item.id) {
					currentAssignmentItems.splice(itemIndex, 1);
					break;
				}
			}
		}
		var success = function(assignment) {
			AssignmentService.setNewAssignment(assignment);
			var newAssignmentItem = new AssignmentItem();
			AssignmentService.setCurrentAssignmentItem(newAssignmentItem);
		};

		var failure = function() {
			alert('problem occurred in saving assignment item');
		};
		AssignmentService.saveAssignment(AssignmentService.getNewAssignment(), success, failure);
	}


}]);

assignmentControllers.controller('AssignmentItemListCntrl', ['$scope', '$http','AssignmentService', 'uiGridConstants', function($scope, $http, AssignmentService, uiGridConstants){
	$scope.assignmentItem = new AssignmentItem();



  $scope.gridOptions = {
  enableFiltering: true,
  enablePaginationControls: false,
   columnDefs: [
    
      {
        name: 'Description',
        field: 'desc',
        cellTemplate: '<div class="ui-grid-cell-contents grid-status-content" ng-click="doAlert();" ng-init="showToolTip=false;" ng-mouseenter="showToolTip = true" ng-mouseleave="showToolTip = false" ng-bind-html="row.entity[col.field]">{{row.entity[col.field]}}<div ng-if="row.entity[col.field]" ng-show="showToolTip" class="grid-tooltip">{{row.entity[col.field]}}</div></div>',
        cellClass: 'cellToolTip'
      },
      {
        name: 'Weightage',
        field: 'weightage',
        width:'100'
      }
     /*  {
        name: 'id',
        field: 'id',
            sort: {
      			direction: uiGridConstants.ASC,
      			priority: 0
 		   },
        
      }*/
    ]
  };

	var prevRow;
	var currentRow;
  $scope.gridOptions.onRegisterApi = function( gridApi ) {
	    $scope.gridApi = gridApi;
	    gridApi.selection.on.rowSelectionChanged($scope, function(row) {
	    	prevRow = currentRow;
	    	currentRow = row;
	    	if (prevRow != null) {
	    		prevRow.isSelected = false;
	    	}
		    var item = row.entity;
		    AssignmentService.setCurrentAssignmentItem(item);
	  	});
  };


  $scope.getTotalWeightage = function() {
		var totalWeightage = 0;
		angular.forEach(AssignmentService.getNewAssignmentItems(), function(item, index){
			totalWeightage += item.weightage;
		});
		return totalWeightage;
	}
  
    $scope.getItemCount = function() {
		return AssignmentService.getNewAssignmentItems().length;
	}




  $scope.gridOptions.data = AssignmentService.getNewAssignmentItems();
}])