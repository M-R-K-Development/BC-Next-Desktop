app.controller('SitesIndexCtrl', ['$scope', 'State', '$location', 'Site', function($scope, State, $location, Site){

    $scope.sites = [];


    Site.list(State.token).
        success(function(data){
            console.log(data);
            $scope.sites = data.items;
        }).
        error(function(data){
            console.log(data);

        })
}]);