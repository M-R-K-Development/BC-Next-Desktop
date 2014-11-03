app.controller('TokenCheckCtrl', ['$scope', '$location', 'State', 'MainDB', function($scope, $location, State, MainDB){
        MainDB.create();
        MainDB.migrate();

        $scope.appState.loading = 'Please wait while we check your authorisation token';

        // check if we have an internet connection
        var dns = require("dns");
        dns.resolve("google.com", function(error){
        $scope.appState.loading = false;
            if(!error){
                State.internet = true;
                $scope.tokenizedLogin();
            }
            else{
                $scope.$apply(function(){
                    State.internet = false;
                    $location.path('/sites/index');
                });
            }
        });



        /**
         * Tokenized login
         *
         * @return {[type]} [description]
         */
        $scope.tokenizedLogin = function(){
            MainDB.getToken().then(function(token){
                if(token == null){
                    $location.path('/auth/login');
                } else {
                    State.token = token;
                    $location.path('/sites/index');

                }
            })
        }
}])