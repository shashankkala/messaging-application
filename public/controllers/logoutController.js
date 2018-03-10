app.controller('logoutController', ['$scope', '$mdToast', '$animate', '$location', '$cookies',
	function($scope, $mdToast, $animate, $location, $cookies){
		
		$scope.toastPosition = {
			bottom: false,
			top: true,
			left: false,
			right: true
		};
		
		$scope.getToastPosition = function(){
			return Object.keys($scope.toastPosition)
				.filter(function (pos){
					return $scope.toastPosition[pos];
				})
				.join(' ');
		};
		
		$scope.showToast = function(message){
			$mdToast.show(
						$mdToast.simple()
							.content(message)
							.position($scope.getToastPosition())
							.hideDelay(3000)
					);
		};
		
		//removing the cookie
		$cookies.remove("user");
		$location.path('/home');
		
		$scope.showToast("You have been logged out. Please relogin to use the application");
	}
]);