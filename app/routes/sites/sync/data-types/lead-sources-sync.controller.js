/**
 * Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} LeadSourceType [description]
 *
 * @return {[type]}               [description]
 */
app.controller('LeadSourceSyncCtrl', ['$scope', 'LeadSourceType', 'SiteDatabase', function($scope, LeadSourceType, SiteDatabase){
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
    $scope.$watch('completedLeadSources', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearLeadSources();
        }

        if($scope.completedLeadSources != $scope.totalLeadSources){
            $scope.syncLeadSourceTypes($scope.completedLeadSources);
        } else {
            $scope.$parent.leadSourceSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncLeadSourceTypes = function(skip){
         LeadSourceType.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalLeadSources = response.totalItemsCount;
                $scope.completedLeadSources += response.items.length;
                SiteDatabase.addLeadSources(response.items);
            },
            function(errorResponse){
                console.log('lead source sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalLeadSources){
            return {}
        }

        $scope.percent = parseInt($scope.completedLeadSources / $scope.totalLeadSources * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);