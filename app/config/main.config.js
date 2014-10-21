app.factory('httpRequestInterceptor', function (State) {
  return {
    request: function (config) {
      config.headers['Authorization'] = State.token;
      config.headers['Content-Type'] = 'application/json';
      return config;
    }
  };
});


app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

