app.factory('TitleResource', ['$resource', function($resource){
    return $resource(
        'https://mrkdevelopment.worldsecuresystems.com/webresources/api/v3/sites/:siteId/titletypes/:id',
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