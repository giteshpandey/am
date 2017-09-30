var loginControllers = angular.module('loginControllerModule', ['loginServiceModule']);

loginControllers.controller('LoginCntrl', ['$scope', 'LoginService', '$location', '$cookies', function($scope, LoginService, $location, $cookies){

	var init = function() {
		$scope.userTypes = ['USER', 'ADMIN'];
		$scope.userType = 'USER';
		$scope.loginResult = null;
	};

	init();
	$scope.dropdownShowMe = false;
    $scope.loginDropdown = function() {
        $scope.dropdownShowMe = !$scope.dropdownShowMe;
    }

	$scope.login = function() {
		var queryObj = {};
		queryObj['soeId'] = $scope.soeId;
		
		var success = function(user) {
			if (user.id === null) {
				$scope.loginResult = "User Not Registered!";

			}
			else {
				$cookies.putObject('user', user);
				if (user.role === 'USER') {
					$location.path('userassignment');		
				} 
				else {
					$location.path('admin');		
				} 
			}
		};

		var failure = function(user) {
			$scope.loginResult = "User Not Registered!";
		};

		if ($scope.userType === 'ADMIN') {
			queryObj['password'] = $scope.password;
		}
		
		LoginService.login(queryObj, success, failure);
	};
}]);