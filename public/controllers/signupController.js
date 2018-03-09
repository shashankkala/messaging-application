app.controller('signupController', ['$scope', '$http', '$mdToast', '$animate', '$location', 
	function($scope, $http, $mdToast, $animate, $location){
		
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
		
		$scope.changeState = function(){
			$scope.signupForm.username.$dirty = true;
		};
		
		$scope.signup = function(){
			//check to ensure that the password and the confirm password are same 
			if($scope.password != $scope.confirmPassword){
				$scope.confirmPassword = "";
				$scope.showToast("Password and confirm password do not match");
				return;
			}
			
			var data = {
				username: $scope.username,
				password: $scope.password
			};
			
			//calling backend api to insert username and password
			$http.post('/addUser', data)
				.then(
					function(response) {
						console.log('post success');
						console.log(response);
						if(typeof response.data == "object" && response.data.active == true){
							$scope.showToast("User created successfully");
							$location.path('/main');
						}
					},
				
					function(response) {
						console.log('post error');
						if(response.data.error.code == 11000){
							$scope.showToast("Username already taken");
							$scope.username="";
							$scope.signupForm.username.$dirty = false;
							return;
						}
					}
				);
		};
		
	}
]);