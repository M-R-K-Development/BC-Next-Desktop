app.service('SiteService', ['$http', function($http){
    return {
        list  : function(token){
            return $http.get(SITES_LIST_API)
        }
    }
}])