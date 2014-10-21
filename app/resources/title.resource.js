app.factory('TitleResource', ['$resource', function($resource){
    return $resource(
        '/webresources/api/v3/sites/current/titletypes/:id',
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