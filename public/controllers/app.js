var app = angular.module('mailingApp', ['ngMaterial', 'ngRoute', 'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/../views/home.html',
		controller: 'homeController'
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
		templateUrl: '/../views/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/sent',{
		templateUrl: '/../views/sent.html',
		controller: 'dashboardController'
	})
	.when('/logout',{
		templateUrl: '/../views/home.html',
		controller: 'logoutController'
	})
	.otherwise({
		redirectTo : '/'
	});
});