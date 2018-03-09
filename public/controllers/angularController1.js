var app = angular.module('mailingApp', ['ngMaterial', 'ngRoute', 'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'main.html'
	})
	.when('/signup',{
		templateUrl: 'signup.html',
		controller: 'signupController'
	})
	.when('/login',{
		templateUrl: 'login.html',
		controller: 'loginController'
	})
	.when('/dashboard',{
		templateUrl: 'dashboard.html',
		controller: 'dashboardController'
	})
	.when('/compose',{
		templateUrl: 'compose.html',
		controller: 'composeController'
	})
	.when('/inbox',{
		templateUrl: 'inbox.html',
		controller: 'inboxController'
	})
	.when('/sent',{
		templateUrl: 'sent.html',
		controller: 'sentController'
	})
	.otherwise({
		redirectTo : '/'
	});
});

app.factory('receivedMailService', function() {
	var savedData = {}
	function set(data) {
		savedData = data;
	}
	function get() {
		return savedData;
	}

	return {
	set: set,
	get: get
	}

});

app.factory('sentMailService', function() {
	var savedData = {}
	function set(data) {
		savedData = data;
	}
	function get() {
		return savedData;
	}

	return {
	set: set,
	get: get
	}

});

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

app.controller('loginController', ['$scope', '$http', '$mdToast', '$animate', '$location', '$cookies',
	function($scope, $http, $mdToast, $animate, $location, $cookies){
		
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

app.controller('dashboardController', ['$scope', '$http', '$mdToast', '$animate', 'receivedMailService',
	'sentMailService', '$cookies',
	function($scope, $http, $mdToast, $animate, receivedMailService, sentMailService, $cookies){
		
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
			params: { user: $cookies.get("user") }
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
			params: { user: $cookies.get("user")}
		})
		.then(
			function(response) {
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
					console.log(response.data);
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
				message : $scope.message
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

app.controller('inboxController', ['$scope', '$mdToast', '$animate', '$location', 'receivedMailService',
	function($scope, $mdToast, $animate, $location, receivedMailService){
		
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
		
		//getting array of received messages
		$scope.messages = receivedMailService.get();
		
		if($scope.messages.length == 0){
			$scope.showToast("Your inbox is empty");
		}
	}
]);

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