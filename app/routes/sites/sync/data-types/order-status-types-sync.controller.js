/**
 * Title Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} OrderStatusResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('OrderStatusTypesSyncCtrl', ['$scope', 'OrderStatusResource', 'SiteDatabase', function($scope, OrderStatusResource, SiteDatabase){
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
    $scope.$watch('completedOrderStatusTypes', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearOrderStatusTypes();
        }

        if($scope.completedOrderStatusTypes != $scope.totalOrderStatusTypes){
            $scope.syncOrderTypes($scope.completedOrderStatusTypes);
        } else {
            $scope.$parent.orderStatusTypeSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncOrderTypes = function(skip){
         OrderStatusResource.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalOrderStatusTypes = response.totalItemsCount;
                $scope.completedOrderStatusTypes += response.items.length;
                console.log(response.items)
                SiteDatabase.addOrderStatusTypes(response.items);
            },
            function(errorResponse){
                console.log('order status type sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalOrderStatusTypes){
            return {}
        }

        $scope.percent = parseInt($scope.completedOrderStatusTypes / $scope.totalOrderStatusTypes * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);