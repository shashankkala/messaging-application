app.controller('dashboardController', ['$scope', '$http', '$mdToast', '$animate', '$cookies', '$location',
	function($scope, $http, $mdToast, $animate, $cookies, $location){
		
		if(!$cookies.get("user")){
			$location.path('/logout');
			return;
		}
		
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
			params: { user: $cookies.get("user")}
		})
		.then(
			function(response){
				$scope.receivedCount = response.data.length;
				$scope.inboxMessages = response.data;
			},
			function(response){
				if(response.data.reason == undefined){
					$scope.showToast("Unable to retieve user info, Please relogin");
				}
			}
		);
		
		$http.get('/outMails', {
			params: { user: $cookies.get("user")}
		})
		.then(
			function(response) {
				$scope.sentCount = response.data.length;
				$scope.sentMessages = response.data;
			},
			function(response) {
				if(response.data.reason == undefined){
					$scope.showToast("Unable to retieve user info, Please relogin");
				}
			}	
		);
		
		$scope.viewby = 10;
		//$scope.totalItems = $scope.inboxMessages.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
		
		$scope.pageChanged = function() {
			console.log('Page changed to: ' + $scope.currentPage);
		  };

		$scope.setItemsPerPage = function(num) {
		  $scope.itemsPerPage = num;
		  $scope.currentPage = 1; //reset to first page
		}
	}
]);