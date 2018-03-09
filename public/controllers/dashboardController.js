app.controller('dashboardController', ['$scope', '$http', '$mdToast', '$animate', 'currentUserService', 'receivedMailService',
	'sentMailService',
	function($scope, $http, $mdToast, $animate, currentUserService, receivedMailService, sentMailService){
		
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
						
		$http.get('/inMails', {
			params: { user: currentUserService.get() }
		})
		.then(
			function(response){
				$scope.receivedCount = response.data.length;
				receivedMailService.set(response.data);
			},
			function(response){
				if(response.data.reason == undefined){
					$scope.showToast("Unable to retieve user info, Please relogin");
				}
			}
		);
		
		$http.get('/outMails', {
			params: { user: currentUserService.get()}
		})
		.then(
			function(response) {
				console.log(response.data);
				$scope.sentCount = response.data.length;
				sentMailService.set(response.data);
			},
			function(response) {
				if(response.data.reason == undefined){
					$scope.showToast("Unable to retieve user info, Please relogin");
				}
			}	
		);
		
	}
]);