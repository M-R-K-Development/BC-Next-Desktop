app.controller('AuthLoginCtrl', ['$scope', 'Auth', 'State', '$location', function($scope, Auth, State, $location){

    $scope.username, $scope.password, $scope.error;
    $scope.formSubmitted = false;

    /**
     * Triggers business catalyst login
     *
     * @return {[type]} [description]
     */
    $scope.login = function(){
        if(!$scope.username || !$scope.password){
            $scope.error = 'Invalid Username/Password';
        } else {
            $scope.formSubmitted = true;
            Auth.login($scope.username, $scope.password).
                  success(function(data, status, headers, config) {
                    console.log(data);

                    State.token = data.token;

                    $scope.formSubmitted = false;
                    $location.path('/sites/index');
                  }).
                  error(function(data, status, headers, config) {
                        if(data.code && data.code == 107003){
                            $scope.error = 'TOU is not signed. Please accept that from your BC admin';
                        } else {
                            $scope.error = 'Invalid Username/Password'
                        }
                        $scope.formSubmitted = false;
                  });
        }
    }


}]);