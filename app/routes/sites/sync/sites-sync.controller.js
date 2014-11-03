/**
 * Main Sync Controller
 *
 * @param  {[type]} $scope       [description]
 * @param  {[type]} $routeParams [description]
 *
 * @return {[type]}              [description]
 */
app.controller('SitesSyncCtrl', ['$scope', '$routeParams', 'SiteDatabase', '$location', '$timeout', 'MainDB', function($scope, $routeParams, SiteDatabase, $location, $timeout, MainDB){
    /**
     * Site ID
     *
     * @type {[type]}
     */
    $scope.siteId = $routeParams.id;
    $scope.synced = false;

    /**
     * Title progress related fields
     */
    $scope.totalTitles;
    $scope.completedTitles = 0;
    $scope.titleSyncComplete = false;


    /**
     * Ratings progress related field.
     *
     * @type {Number}
     */
    $scope.completedRatingTypes = 0;
    $scope.ratingTypeSyncComplete = false;
    $scope.totalRatingTypes;

    /**
     * Order status related progress fields
     *
     * @type {Number}
     */
    $scope.completedOrderStatusTypes = 0;
    $scope.orderStatusTypeSyncComplete = false;
    $scope.totalOrderStatusTypes;


    /**
     * lead source related progress fields
     *
     * @type {Number}
     */
    $scope.completedLeadSources = 0;
    $scope.leadSourceSyncComplete = false;
    $scope.totalLeadSources;


    /**
     * Customer types related progress fields.
     *
     * @type {Number}
     */
    $scope.completedCustomerTypes = 0;
    $scope.customerTypeSyncComplete = false;
    $scope.totalCustomerTypes;


    /**
     * Industry type related fields
     *
     * @type {Number}
     */
    $scope.completedIndustryTypes = 0;
    $scope.industryTypesSyncComplete = false;
    $scope.totalIndustryTypes;


    /**
     * Customer related sync
     *
     * @type {Number}
     */
    $scope.completedCustomers = 0;
    $scope.customerSyncComplete = false;
    $scope.totalCustomers;

    /**
     * Order related sync
     *
     * @type {Number}
     */
    $scope.completedOrders = 0;
    $scope.orderSyncComplete = false;
    $scope.totalOrders;



    $scope.$watch('synced', function(newValue, oldValue){
        if(newValue){
            // save timestamp and update flag for site.
            $scope.appState.site.synced_at = new Date().toISOString();
            MainDB.addSite($scope.appState.site);
            $scope.appState.loading = false;
            // auto redirect
            $timeout(function(){
                $location.path('/sites/' + $scope.siteId + '/customers/list').search({});
            }, 5000);
        }
    });

    /**
     * check if sync is completed.
     *
     * @return {Boolean} [description]
     */
    $scope.isSyncCompleted = function(){
        $scope.synced = $scope.titleSyncComplete && $scope.ratingTypeSyncComplete && $scope.orderStatusTypeSyncComplete && $scope.leadSourceSyncComplete && $scope.customerTypeSyncComplete && $scope.industryTypesSyncComplete && $scope.customerSyncComplete && $scope.orderSyncComplete;

        return $scope.synced;
    }



    SiteDatabase.init($scope.siteId);
    SiteDatabase.migrate();

    $scope.appState.loading = 'Please wait while we sync data from your ' +  $scope.appState.site.name + ' account';
}]);