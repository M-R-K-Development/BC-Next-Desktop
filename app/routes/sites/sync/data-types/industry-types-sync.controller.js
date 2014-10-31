/**
 * Title Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} IndustryTypeResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('IndustryTypeSyncCtrl', ['$scope', 'IndustryTypeResource', 'SiteDatabase', function($scope, IndustryTypeResource, SiteDatabase){
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
    $scope.$watch('completedIndustryTypes', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearIndustryTypes();
        }

        if($scope.completedIndustryTypes != $scope.totalIndustryTypes){
            $scope.syncIndustryTypes($scope.completedIndustryTypes);
        } else {
            $scope.$parent.industryTypesSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncIndustryTypes = function(skip){
         IndustryTypeResource.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalIndustryTypes = response.totalItemsCount;
                $scope.completedIndustryTypes += response.items.length;
                SiteDatabase.addIndustryTypes(response.items);
            },
            function(errorResponse){
                console.log('industry type sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalIndustryTypes){
            return {}
        }

        $scope.percent = parseInt($scope.completedIndustryTypes / $scope.totalIndustryTypes * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);