/**
 * Title Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} CustomerTypeResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('CustomerTypeSyncCtrl', ['$scope', 'CustomerTypeResource', 'SiteDatabase', function($scope, CustomerTypeResource, SiteDatabase){
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
    $scope.$watch('completedCustomerTypes', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearCustomerTypes();
        }

        if($scope.completedCustomerTypes != $scope.totalCustomerTypes){
            $scope.syncCustomerTypes($scope.completedCustomerTypes);
        } else {
            $scope.customerTypeSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncCustomerTypes = function(skip){
         CustomerTypeResource.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalCustomerTypes = response.totalItemsCount;
                $scope.completedCustomerTypes += response.items.length;
                SiteDatabase.addCustomerTypes(response.items);
            },
            function(errorResponse){
                console.log('customer types sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalCustomerTypes){
            return {}
        }

        $scope.percent = parseInt($scope.completedCustomerTypes / $scope.totalCustomerTypes * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);