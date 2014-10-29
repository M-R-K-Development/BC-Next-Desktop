app.factory('CustomerResource', ['$resource', 'State', function($resource, State){
    return $resource(
        State.site.uri + 'webresources/api/v3/sites/:siteId/customers/:id',
        {id : '@id'},
        {
            'get':    {method:'GET'},
            'store':  {method:'POST'},
            'update': {method:'PUT'},
            'query':  {method:'GET'},
            'destroy': {method:'DELETE'}
        }
    );
}]);