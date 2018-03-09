app.controller('sentController', ['$scope', '$mdToast', '$animate', '$location', 'sentMailService',
	function($scope, $mdToast, $animate, $location, sentMailService){
		
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
		
		$scope.newMail = function(){
			$location.path('/compose');
		};
		
		//getting array of sent messages
		$scope.messages = sentMailService.get();
		
		if($scope.messages.length == 0){
			$scope.showToast("You don't have any sent items");
		}
	}
]);