app.controller('composeController', ['$scope', '$http', '$mdToast', '$animate', '$location', 'currentUserService',
	function($scope, $http, $mdToast, $animate, $location, currentUserService){
		
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
		
		$scope.discard = function(){
			$scope.showToast("Mail discarded");
			$location.path('/dashboard');
		};
		
		$scope.changeState = function(){
			$scope.composeForm.recipient.$dirty = true;
			
			$http.get('/recipientList', {
				params : {queryString : $scope.recipient}
			})
			.then(
				function(response){
					$scope.recipientList = [];
					for(var i=0; i<response.data.length; i++){
						$scope.recipientList[i] = response.data[i].username;
					}
				},
				function(response){
					
				}
			);
		};
		
		$scope.send = function(){
			
			var data = {
				recipient : $scope.recipient,
				sender : currentUserService.get(),
				message : $scope.message,
			};
			
			$http.post('/sendMail', data)
				.then(
					function(response) {
						//console.log(response.data);
						if(response.data.active == true){
							$scope.showToast("your message has been sent");
							$location.path('/dashboard');
						}
					},
					function(response) {
						$scope.showToast(response.data.error);
						$scope.recipient = "";
						$scope.composeForm.recipient.$dirty = false;
					}
				);
		};
		
	}
]);