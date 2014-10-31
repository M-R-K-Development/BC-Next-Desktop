/**
 * Customer Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} CustomerResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('CustomterSyncCtrl', ['$scope', 'CustomerResource', 'SiteDatabase', '$routeParams', function($scope, CustomerResource, SiteDatabase, $routeParams){
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
    $scope.$watch('completedCustomers', function(newValue, oldValue){
        // TODO: check the resync/sync flags and clear things accordingly
        // There is a flaw in the v3 customers api where lastUpdateDate is not exposed.
        // This makes it practically impossible to jumpstart a sync from between.
        if(newValue == 0){
            SiteDatabase.clearCustomers();
        }

        if($scope.completedCustomers != $scope.totalCustomers){
            $scope.syncCustomers($scope.completedCustomers);
        } else {
            $scope.$parent.customerSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncCustomers = function(skip){
         CustomerResource.get({siteId: $scope.siteId, skip: skip, limit: 50}).$promise
            .then(function(response){
                $scope.totalCustomers = response.totalItemsCount;
                $scope.completedCustomers += response.items.length;
                SiteDatabase.saveCustomers(response.items);
            },
            function(errorResponse){
                console.log('customer sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalCustomers){
            return {}
        }

        $scope.percent = parseInt($scope.completedCustomers / $scope.totalCustomers * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);