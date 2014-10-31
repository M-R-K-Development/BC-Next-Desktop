/**
 * Order Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} OrderResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('OrderSyncCtrl', ['$scope', 'OrderResource', 'SiteDatabase', '$routeParams', function($scope, OrderResource, SiteDatabase, $routeParams){
    /**
     * Percentage completed
     */
    $scope.percent = 0;

    /**
     * [description]
     *
     * @param  {[type]} newValue [description]
     * @param  {[type]} oldValue [description]
     *
     * @return {[type]}          [description]
     */
    $scope.$watch('completedOrders', function(newValue, oldValue){
        // TODO: check the resync/sync flags and clear things accordingly
        // There is a flaw in the v3 orders api where lastUpdateDate is not exposed.
        // This makes it practically impossible to jumpstart a sync from between.
        if(newValue == 0){
            SiteDatabase.clearOrders();
        }

        if($scope.completedOrders != $scope.totalOrders){
            $scope.syncOrders($scope.completedOrders);
        } else {
            $scope.$parent.orderSyncComplete = true;
        }
    });


    /**
     * Sync orders
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncOrders = function(skip){
         OrderResource.get({siteId: $scope.siteId, skip: skip, limit: 50}).$promise
            .then(function(response){
                $scope.totalOrders = response.totalItemsCount;
                $scope.completedOrders += response.items.length;
                SiteDatabase.saveOrders(response.items);
            },
            function(errorResponse){
                console.log('order sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalOrders){
            return {}
        }

        $scope.percent = parseInt($scope.completedOrders / $scope.totalOrders * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);