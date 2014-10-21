app.controller('TokenCheckCtrl', ['$scope', '$location', 'State', 'MainDB', function($scope, $location, State, MainDB){
        MainDB.create();
        MainDB.migrate();

        MainDB.getToken().then(function(token){
            if(token == null){
                $location.path('/auth/login');
            } else {
                State.token = token;
                $location.path('/sites/index');

            }
        })
}])