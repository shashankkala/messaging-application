app.controller('loginController', ['$scope', '$http', '$mdToast', '$animate', '$location', '$cookies',
	function($scope, $http, $mdToast, $animate, $location, $cookies){
		
		if($cookies.get("user")){
			$location.path('/dashboard');
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
		
		$scope.cancel = function(){
			$location.path('/main');
		};
		
		$scope.showToast = function(message){
			$mdToast.show(
						$mdToast.simple()
							.content(message)
							.position($scope.getToastPosition())
							.hideDelay(3000)
					);
		};
		
		$scope.changeStateUsername = function(){
			$scope.loginForm.username.$dirty = true;
		};
		
		$scope.changeStatePassword = function(){
			$scope.loginForm.password.$dirty = true;
		};
		
		$scope.resetForm = function(){
			$scope.username = "";
			$scope.password = "";
			$scope.loginForm.username.$dirty = false;
			$scope.loginForm.password.$dirty = false;
		}
		
		$scope.login = function(){
			var data = {
				username: $scope.username,
				password: $scope.password
			};
			
			$http.post('/validateUser', data)
				.then(
					function(response) {
						//console.log(response.data);
						if(response.data.error == ""){
							$scope.showToast("Welcome "+response.data.username+"!");
							$cookies.put("user",response.data.username);
							$location.path('/dashboard');
						}
					},	
					function(response) {
						$scope.showToast(response.data.error);
						$scope.resetForm();
					}	
				);
		};
	}
]);