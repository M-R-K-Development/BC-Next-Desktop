app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'SiteService','MainDB', function($scope, State, $location, SiteService, MainDB){

    $scope.sites = [];


    SiteService.list(State.token).
        success(function(data){
            $scope.sites = data.items;
            $scope.checkExistingSites();
        }).
        error(function(data){
            $location.path('/auth/login');
        });


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
                            $scope.sites[i].created_at = existingSite.created_at;
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
    }





}]); //controller