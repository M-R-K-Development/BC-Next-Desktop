app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/sites/:siteId/orders/list', {
            templateUrl : appDir + '/app/routes/sites/orders/list/orders-list.template.html',
            controller : 'OrdersListCtrl'
        });
}]);
