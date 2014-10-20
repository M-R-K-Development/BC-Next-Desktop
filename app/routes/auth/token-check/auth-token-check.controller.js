app.controller('TokenCheckCtrl', ['$scope', '$location', 'State', 'Setting', function($scope, $location, State, Setting){


        Setting.all().filter('name', '=', 'token').limit(1).list(function(result){

            if(result.length){
                    result.forEach(function(r){
                        $scope.$apply(function(){
                            State.token = r.value;
                            $location.path('/sites/index');
                        })
                    })
            } else {

                $scope.$apply(function(){
                    $location.path('/auth/login');
                });
            }
        }); //setting

}])