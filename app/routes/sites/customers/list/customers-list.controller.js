/**
 * Customer listing controller.
 *
 * @param  {[type]} $scope       [description]
 * @param  {[type]} SiteDatabase [description]
 *
 * @return {[type]}              [description]
 */
app.controller('CustomersListCtrl', ['$scope', 'SiteDatabase' ,'$routeParams', function($scope, SiteDatabase, $routeParams){
    $scope.currentPage;
    $scope.totalCustomers;
    $scope.limit = 15;
    $scope.customers = [];
    $scope.titles = [];
    $scope.customerTypes = [];
    $scope.leadSourceTypes = [];
    $scope.ratingTypes = [];

    SiteDatabase.init($routeParams.siteId);


    /**
     * Watch current page change for pagination.
     *
     * @param  {[type]} newValue [description]
     * @param  {[type]} oldValue [description]
     *
     * @return {[type]}          [description]
     */
    $scope.$watch('currentPage', function(newValue, oldValue){
        if(!newValue){
            return;
        }

        var skip = ($scope.currentPage - 1) * $scope.limit;
        $scope.list(skip, $scope.limit);
    });


    /**
     * customer listing.
     *
     * @param  {[type]} skip  [description]
     * @param  {[type]} limit [description]
     *
     * @return {[type]}       [description]
     */
    $scope.list = function(skip, limit){
        // count
        SiteDatabase.getCustomerCount([]).
            then(function(totalCustomers){
                $scope.totalCustomers = totalCustomers;
            });

        // customers
        SiteDatabase.getCustomers([], {limit: limit, offset: skip}).
            then(function(customers){
                $scope.customers = customers;
            });
    }

    SiteDatabase.getTitles().then(function(titles){
        $scope.titles = titles;
    });

    SiteDatabase.getCustomerTypes().then(function(customerTypes){
        $scope.customerTypes = customerTypes;
    });

    SiteDatabase.getLeadSourceTypes().then(function(leadSourceTypes){
        $scope.leadSourceTypes = leadSourceTypes;
    });

    SiteDatabase.getRatingTypes().then(function(ratingTypes){
        $scope.ratingTypes = ratingTypes;
        // init page
        $scope.currentPage = 1;
    });



    /**
     * Get Type
     *
     * @param  {[type]} typeId [description]
     * @param  {[type]} types  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.getType = function(typeId, types){
        var label = '';
        angular.forEach(types, function(type){
            if(type.id == typeId){
                label =  type.label;
            }
        });

        return label;
    }


}]);