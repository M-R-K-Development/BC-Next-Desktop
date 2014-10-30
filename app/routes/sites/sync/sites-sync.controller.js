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



    SiteDatabase.create($scope.siteId);
    SiteDatabase.migrate();
}]);