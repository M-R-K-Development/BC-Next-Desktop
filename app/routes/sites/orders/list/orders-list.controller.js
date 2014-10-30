/**
 * Order listing controller.
 *
 * @param  {[type]} $scope       [description]
 * @param  {[type]} SiteDatabase [description]
 *
 * @return {[type]}              [description]
 */
app.controller('OrdersListCtrl', ['$scope', 'SiteDatabase' ,'$routeParams', function($scope, SiteDatabase, $routeParams){
    $scope.currentPage;
    $scope.totalOrders;
    $scope.limit = 15;
    $scope.orders = [];

    SiteDatabase.init($routeParams.siteId);


    /**
     * Watch current page change for pagination.
     *
     * @param  {[type]} newValue [description]
     * @param  {[type]} oldValue [description]
     *
     * @return {[type]}          [description]
     */
    $scope.$watch('currentPage', function(newValue, oldValue){
        if(!newValue){
            return;
        }

        var skip = ($scope.currentPage - 1) * $scope.limit;
        $scope.list(skip, $scope.limit);
    });


    /**
     * customer listing.
     *
     * @param  {[type]} skip  [description]
     * @param  {[type]} limit [description]
     *
     * @return {[type]}       [description]
     */
    $scope.list = function(skip, limit){
        // count
        SiteDatabase.getOrderCount([]).
            then(function(totalOrders){
                $scope.totalOrders = totalOrders;
            });

        // orders
        SiteDatabase.getOrders([], {limit: limit, offset: skip}).
            then(function(orders){
                console.log(orders);
                $scope.orders = orders;
            });
    }

    $scope.currentPage = 1;



    /**
     * Get Type
     *
     * @param  {[type]} typeId [description]
     * @param  {[type]} types  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.getType = function(typeId, types){
        var label = '';
        angular.forEach(types, function(type){
            if(type.id == typeId){
                label =  type.label;
            }
        });

        return label;
    }


}]);