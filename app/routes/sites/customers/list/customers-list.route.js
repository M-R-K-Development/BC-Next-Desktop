app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/sites/:siteId/customers/list', {
            templateUrl : appDir + '/app/routes/sites/customers/list/customers-list.template.html',
            controller : 'CustomersListCtrl'
        });
}]);
