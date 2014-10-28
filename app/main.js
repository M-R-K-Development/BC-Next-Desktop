var app = angular.module('bcNextApp',['ngRoute', 'ngResource']);

app.run(['$rootScope', 'State', function($rootScope, State){
    $rootScope.appState = State;
}])