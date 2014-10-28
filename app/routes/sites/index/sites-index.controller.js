app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'SiteService','MainDB', function($scope, State, $location, SiteService, MainDB){

    $scope.sites = [];


    //TODO:  check for internet connection
    SiteService.list(State.token).
        success(function(data){
            var sites = data.items;
            $scope.sites = data.items;
            $scope.saveSites(sites);
        }).
        error(function(data){
            console.log('error', data);
            $location.path('/auth/login');
        });


    /**
     * Save the sites into the database.
     *
     * @param  {[type]} sites [description]
     *
     * @return {[type]}       [description]
     */
    $scope.saveSites = function(sites){
        console.log('TOKEN', State.token);
        angular.forEach(sites, function(site, i){
            if(site.id == 4632){
                // console.log('SITE', site);
                $scope.sync(i);
            }
            // MainDB.addSite(site)
        });

        $scope.getSites();
    }


    /**
     * Fetch all sites from database;
     *
     * @return {[type]} [description]
     */
    $scope.getSites = function(){
    }

    /**
     * Check if the sites are already created.
     *
     * @return {[type]} [description]
     */
    $scope.checkExistingSites = function(){
        MainDB.sites().then(function(existingSites){

            angular.forEach(existingSites, function(existingSite){
                angular.forEach($scope.sites, function(site, i){
                        if(existingSite.id == site.id){
                            $scope.sites[i].exists = true;
                            $scope.sites[i].synced_at = existingSite.synced_at;
                            $scope.sites[i].synced = existingSite.synced;
                        }
                });

            });

        });

    }



    /**
     * Import the site
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
    $scope.import = function(index){
        var site = $scope.sites[index];
        MainDB.addSite(site.id);
        $scope.reSync(index);
    }


    /**
     * Sync database from where things we left off.
     *
     * @return {[type]} [description]
     */
    $scope.sync = function(index){
        var site = $scope.sites[index];
        $location.path('/sites/' + site.id + '/sync').search({sync: true})
    }


    /**
     * Resync database. clear databases.
     *
     * @return {[type]} [description]
     */
    $scope.reSync = function(index){
        var site = $scope.sites[index];
        $location.path('/sites/' + site.id + '/sync').search({sync: true})
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





}]); //controller