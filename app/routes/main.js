app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.otherwise({redirectTo: '/auth/login'})

}]);
