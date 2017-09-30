var headerControllers = angular.module('headerControllerModule', []);

headerControllers.controller('HeaderCntrl', ['$scope', '$state', '$cookies', function($scope, $state, $cookies) {
	var init = function () {
		var userObj = $cookies.getObject('user');
		$scope.userId = userObj !== undefined && userObj !== null ? userObj.id.toUpperCase() : null;		
	};

	init();

	$scope.goToHome = function() {
		if ($scope.userId.toLowerCase() === 'admin') $state.go('admin');
		else $state.go('user-assignment');		
	};
}]);