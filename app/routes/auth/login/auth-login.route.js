app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/auth/login', {
            templateUrl : appDir + '/app/routes/auth/login/auth-login.template.html',
            controller : 'AuthLoginCtrl'
        });
}]);
