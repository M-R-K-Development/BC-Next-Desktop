app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'SiteService','MainDB', '$modal', function($scope, State, $location, SiteService, MainDB, $modal){

    $scope.sites = [];
    $scope.selectedSite;


    $scope.$watch('selectedSite', function(newValue, oldValue){
        if(newValue){
            State.site = $scope.selectedSite;
        }
    });


        /**
     * Fetch all sites from database;
     *
     * @return {[type]} [description]
     */
    $scope.getSites = function(){
        MainDB.sites().then(function(sites){
            $scope.sites = sites;
        });
    }


    /**
     * Save the sites into the database.
     *
     * @param  {[type]} sites [description]
     *
     * @return {[type]}       [description]
     */
    $scope.saveSites = function(sites){
        angular.forEach(sites, function(site, i){
            MainDB.addSite(site)
        });

        $scope.getSites();
    }

    /**
     * Import the site
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
    $scope.import = function(index){
        $scope.selectedSite = $scope.sites[index];
        $scope.selectedSite.imported = 1;
        MainDB.markSiteImported($scope.selectedSite.id);
        $scope.reSync(index);
    }


    /**
     * Sync database from where things we left off.
     *
     * @return {[type]} [description]
     */
    $scope.sync = function(index){
        $scope.selectedSite = $scope.sites[index];
        $scope.tokenInputModal({sync:true});
        // $location.path('/sites/' + $scope.selectedSite.id + '/sync').search({sync: true})
    }


    /**
     * Resync database. clear databases.
     *
     * @return {[type]} [description]
     */
    $scope.reSync = function(index){
        $scope.selectedSite = $scope.sites[index];
        $scope.tokenInputModal({resync: true})
        // $location.path('/sites/' + $scope.selectedSite.id + '/sync').search({resync: true})
    }


    /**
     * Do not sync. Go directly to customer index page
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
    $scope.noSync = function(index){
        var site = $scope.sites[index];
        $location.path('/sites/' + site.id + '/customers/index');
    }



    /**
     * Bring up a modal for token input.
     *
     * This is a temporary work around as v3 api hasn't implemented
     * external oauth workflow.
     *
     * @param  {[type]} searchOptions [description]
     *
     * @return {[type]}               [description]
     */
    $scope.tokenInputModal = function(searchOptions){
        var modalInstance = $modal.open({
            templateUrl: 'token-input.html',
            controller: 'TokenInputModalCtrl',
            size: 'md',
            resolve: {
            }
        });
        modalInstance.result.then(function(token) {
            State.token = token;
            $location.path('/sites/' + $scope.selectedSite.id + '/sync').search(searchOptions)
        });
    }


    // initialise
    if(State.internet){
        SiteService.list(State.token).
            success(function(data){
                var sites = data.items;
                $scope.saveSites(sites);
            }).
            error(function(data){
                $location.path('/auth/login');
            });
    } else {
        $scope.getSites();
    }


}]); //controller


// token input modal controller.
// temporary workaround.
// delete after oauth is working
app.controller('TokenInputModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
    /**
     * Token model.
     */
    $scope.token;

    /**
     * Process once the token is inputted and next button entered.
     *
     * @return {[type]} [description]
     */
    $scope.next = function(){
        $modalInstance.close($scope.token);
    }


    /**
     * Close modal without any token input.
     *
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }

}])