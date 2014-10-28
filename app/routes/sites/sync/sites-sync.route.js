app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/sites/:id/sync', {
            templateUrl : appDir + '/app/routes/sites/sync/sites-sync.template.html',
            controller : 'SitesSyncCtrl'
        });
}]);
