app.controller('homeController', ['$scope', '$location', '$cookies',
	function($scope, $location, $cookies){
		
		if($cookies.get("user")){
			$location.path('/dashboard');
			return;
		}
	}
]);