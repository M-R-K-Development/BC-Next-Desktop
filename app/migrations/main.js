persistence.store.websql.config(
     persistence,
    'Sites',
    'List of BC Sites selected',
    5 * 1024 * 1024
);


var Setting = persistence.define('settings', {
    name : 'TEXT',
    value : 'TEXT'
});

Setting.index(['name'], {unique:true});

app.factory('Setting', function(){
    return Setting;
});


// BC Site Tables
var Site = persistence.define('sites', {
  site_id: "INT",
  created: "DATE"
});

Site.index(['site_id'], {unique:true})

app.factory('Site', [ function(){
    return Site;
}]);

persistence.schemaSync();


app.factory('MainPersistence', function(){
    return persistence;
})