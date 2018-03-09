var app = angular.module('mailingApp', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/../views/main.html'
	})
	.when('/signup',{
		templateUrl: '/../views/signup.html',
		controller: 'signupController'
	})
	.when('/login',{
		templateUrl: '/../views/login.html',
		controller: 'loginController'
	})
	.when('/dashboard',{
		templateUrl: '/../views/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/compose',{
		templateUrl: '/../views/compose.html',
		controller: 'composeController'
	})
	.when('/inbox',{
		templateUrl: '/../views/inbox.html',
		controller: 'inboxController'
	})
	.when('/sent',{
		templateUrl: '/../views/sent.html',
		controller: 'sentController'
	})
	.otherwise({
		redirectTo : '/'
	});
});

app.factory('currentUserService', function() {
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