app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/auth/token-check', {
            templateUrl : appDir + '/app/routes/auth/token-check/auth-token-check.template.html',
            controller : 'TokenCheckCtrl'
        });
}]);
