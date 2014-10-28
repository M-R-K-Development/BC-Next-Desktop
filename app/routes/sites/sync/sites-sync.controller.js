/**
 * Main Sync Controller
 *
 * @param  {[type]} $scope       [description]
 * @param  {[type]} $routeParams [description]
 *
 * @return {[type]}              [description]
 */
app.controller('SitesSyncCtrl', ['$scope', '$routeParams', 'SiteDatabase', function($scope, $routeParams, SiteDatabase){
    /**
     * Site ID
     *
     * @type {[type]}
     */
    $scope.siteId = $routeParams.id;
    $scope.customerProgress = 0;

    /**
     * Title progress related fields
     */
    $scope.totalTitles;
    $scope.completedTitles = 0;
    $scope.titleSyncComplete = false;


    SiteDatabase.create($scope.siteId);
    SiteDatabase.migrate();
}]);