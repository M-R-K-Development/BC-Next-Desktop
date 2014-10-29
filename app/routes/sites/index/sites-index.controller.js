app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'SiteService','MainDB', function($scope, State, $location, SiteService, MainDB){

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
        $location.path('/sites/' + $scope.selectedSite.id + '/sync').search({sync: true})
    }


    /**
     * Resync database. clear databases.
     *
     * @return {[type]} [description]
     */
    $scope.reSync = function(index){
        $scope.selectedSite = $scope.sites[index];
        $location.path('/sites/' + $scope.selectedSite.id + '/sync').search({sync: true})
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