app.service('Site', ['$http', function($http){
    return {
        list  : function(token){
            return $http.get(SITES_LIST_API, {headers: {"Authorization" : token}})
        }
    }
}])