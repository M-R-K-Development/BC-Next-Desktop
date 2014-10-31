app.factory('MainDB', ['$q',function($q){
  var self = this;
  self.connection;

  return {
    /**
     * Connection instance
     *
     * @type {[type]}
     */
    connection: self.connection,
    /**
     * Create database
     *
     * @return {[type]} [description]
     */
    create: function(){
      this.connection = SQLite({ shortName: 'sites', displayName: 'List of Bc Sites Selected', maxSize: 20 * 1024 * 1024 });
    },
    /**
     * created the required database;
     *
     * @return {[type]} [description]
     */
    migrate: function(){
      // sites table
      // this.connection.dropTable('sites');
      this.connection.createTable('sites', '`id` INTEGER PRIMARY KEY, `synced_at` TEXT, `imported` INTEGER DEFAULT 0, `name` TEXT, `uri` TEXT');

      // settings table
      this.connection.createTable('settings', '`name` TEXT PRIMARY KEY, `value` TEXT');
    },

    /**
     * [addSite description]
     *
     * @param {[type]} site [description]
     */
    addSite : function(site){
        var uri;
        angular.forEach(site.siteLinks, function(link){
            if(link.rel == 'secureUrl'){
                uri = link.uri;
            }
        });


        var data = {id: site.id, name: site.name, uri: uri};
        if(site.synced_at){
            data.synced_at = site.synced_at;
        }
        var self = this;

        this.connection.select('sites', '*', 'id=' + site.id, {}, function(results){
            if(results.rows.length){
                self.connection.update('sites', data, 'id=' + site.id);
            } else {
                data.imported = 0;
                self.connection.insert('sites', data)
            }
        });

    },
    keepSites : function(siteIds){
        this.connection.database.transaction(function (transaction) {
            var query = 'DELETE from sites where id NOT IN (' + siteIds.join(',') + ');';
            transaction.executeSql(query, []);
          }
        );
    },
    /**
     * [sites description]
     *
     * @return {[type]} [description]
     */
    sites : function(){
      var deferred = $q.defer();
      var sites = [];
      this.connection.select('sites', '*', {}, {}, function(results){
            var len = results.rows.length, i;


            for (var i = 0; i < len; i++) {
              sites.push(angular.copy(results.rows.item(i)));
            };

            deferred.resolve(sites);

        });


      return deferred.promise;
    },

    /**
     * Mark site as imported.
     *
     * @param  {[type]} siteId [description]
     *
     * @return {[type]}        [description]
     */
    markSiteImported : function(siteId){
        this.connection.update('sites', {imported : 1}, 'id=' + siteId);
    },
    /**
     * [updateSetting description]
     *
     * @param  {[type]} name  [description]
     * @param  {[type]} value [description]
     *
     * @return {[type]}       [description]
     */
    updateSetting: function(name, value){
        var self = this;
        this.getSetting(name).then(function(val){
            if(val == null){
                self.connection.insert('settings', {name:name, value: value})
            } else {
                self.connection.update('settings', {value:value}, {name: name})
            }
        });
    },
    /**
     * [getSetting description]
     *
     * @param  {[type]} name [description]
     *
     * @return {[type]}      [description]
     */
    getSetting: function(name){
        var deferred = $q.defer();
        this.connection.select('settings', '*', {"name" : name}, {limit: 1}, function(result){
            if(result.rows.length){
                deferred.resolve(angular.copy(result.rows.item(0))['value']);
            } else {
                deferred.resolve(null);
            }

        });


        return deferred.promise;
    },
    /**
     * [getToken description]
     *
     * @return {[type]} [description]
     */
    getToken : function(){
        return this.getSetting('token');
    },
    /**
     * [setToken description]
     *
     * @param {[type]} token [description]
     */
    setToken: function(token){
        this.updateSetting('token', token);
    }

  }
}])
