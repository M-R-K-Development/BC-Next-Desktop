app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/sites/index', {
            templateUrl : appDir + '/app/routes/sites/index/sites-index.template.html',
            controller : 'SitesIndexCtrl'
        });
}]);
