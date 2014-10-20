app.controller('AuthLoginCtrl', ['$scope', 'AuthService', 'State', '$location', 'Setting', 'MainPersistence',function($scope, AuthService, State, $location, Setting, MainPersistence){
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
            AuthService.login($scope.username, $scope.password).
                  success(function(data, status, headers, config) {
                    State.token = data.token;
                    var setting = Setting.all().filter('name', '=', 'token').limit(1);
                    setting.list(function(result){
                      if(result.length == 0){
                        s = new Setting({name: 'token', value : data.token});
                        MainPersistence.add(s);
                        MainPersistence.flush();
                      }
                    })

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