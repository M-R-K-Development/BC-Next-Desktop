var app = angular.module('bcNextApp',['ngRoute', 'ngResource', 'ui.bootstrap']);

app.run(['$rootScope', 'State', function($rootScope, State){
    $rootScope.appState = State;
}])