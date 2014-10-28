/**
 * Title Sync controller
 *
 * @param  {[type]} $scope        [description]
 * @param  {[type]} TitleResource [description]
 *
 * @return {[type]}               [description]
 */
app.controller('TitleSyncCtrl', ['$scope', 'TitleResource', 'SiteDatabase', function($scope, TitleResource, SiteDatabase){
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
    $scope.$watch('completedTitles', function(newValue, oldValue){
        if(newValue == 0){
            SiteDatabase.clearTitles();
        }

        if($scope.completedTitles != $scope.totalTitles){
            $scope.syncTitles($scope.completedTitles);
        } else {
            $scope.titleSyncComplete = true;
        }
    });


    /**
     * Sync titles
     *
     * @param  {[type]} skip [description]
     *
     * @return {[type]}      [description]
     */
    $scope.syncTitles = function(skip){
         TitleResource.get({siteId: $scope.siteId, skip: skip, limit: 4}).$promise
            .then(function(response){
                $scope.totalTitles = response.totalItemsCount;
                $scope.completedTitles += response.items.length;
                SiteDatabase.addTitles(response.items);
            },
            function(errorResponse){
                console.log('title sync error', errorResponse);
            }
        );

    }


    /**
     * progress bar style
     *
     * @return {[type]} [description]
     */
    $scope.progressStyle = function(){
        if(!$scope.totalTitles){
            return {}
        }

        $scope.percent = parseInt($scope.completedTitles / $scope.totalTitles * 100)
        return {
            "width" :  $scope.percent +  "%"
        }
    }

}]);