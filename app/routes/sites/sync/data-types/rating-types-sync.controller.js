/**
 * Title Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} RatingTypesResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('RatingTypesSyncCtrl', ['$scope', 'RatingTypesResource', 'SiteDatabase', function($scope, RatingTypesResource, SiteDatabase){
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
    $scope.$watch('completedRatingTypes', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearRatingTypes();
        }

        if($scope.completedRatingTypes != $scope.totalRatingTypes){
            $scope.syncRatingTypes($scope.completedRatingTypes);
        } else {
            $scope.$parent.ratingTypeSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncRatingTypes = function(skip){
         RatingTypesResource.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalRatingTypes = response.totalItemsCount;
                $scope.completedRatingTypes += response.items.length;
                SiteDatabase.addRatingTypes(response.items);
            },
            function(errorResponse){
                console.log('rating type sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalRatingTypes){
            return {}
        }

        $scope.percent = parseInt($scope.completedRatingTypes / $scope.totalRatingTypes * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);