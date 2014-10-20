app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'SiteService', 'Site', function($scope, State, $location, SiteService, Site){

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
        var sites = Site.all();
        var existingSites = [];

        sites.list(null, function(results){
            $scope.$apply(function(){
                results.forEach(function(r){
                    angular.forEach($scope.sites, function(site, i){
                        if(r.site_id == site.id){
                            $scope.sites[i].exists = true;
                            $scope.sites[i].created_at = r.created;
                        }
                    });


                });
            })


        });

    }





}]); //controller