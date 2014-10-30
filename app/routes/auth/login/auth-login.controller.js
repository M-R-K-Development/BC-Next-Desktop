app.controller('AuthLoginCtrl', ['$scope', 'AuthService', 'State', '$location', 'MainDB',function($scope, AuthService, State, $location, MainDB){
    $scope.username, $scope.password, $scope.error;
    $scope.formSubmitted = false;
    State.token = '';

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
            AuthService.login($scope.username, $scope.password).
                  success(function(data, status, headers, config) {
                    State.token = data.token;
                    MainDB.setToken(data.token);
                    $scope.formSubmitted = false;
                    $location.path('/sites/index');
                  }).
                  error(function(data, status, headers, config) {
                        if(data.code && data.code == 107003){
                            $scope.error = 'TOU is not signed. Please accept that from your BC admin';
                        } else {
                            $scope.error = 'Invalid Username/Password'
                        }
                        console.log(data);
                        $scope.formSubmitted = false;
                  });
        }
    }


}]);