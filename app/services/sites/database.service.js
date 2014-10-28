app.service('SiteDatabase', [function(){
    return {
        site: "",
        /**
         * Connection instance
         *
         * @type {[type]}
         */
        connection: "",
        /**
         * Create database
         *
         * @return {[type]} [description]
         */
        create: function(site){
          this.site = site;
          this.connection = SQLite({ shortName: site, displayName: site + ' database', maxSize: 500 * 1024 * 1024 });
        },
        /**
         * created the required database;
         *
         * @return {[type]} [description]
         */
        migrate: function(){
            this.titlesTable();
            this.customerTypeTable();
            this.industryTypeTable();
            this.leadSourceTypeTable();
        },
        titlesTable : function(){
            this.connection.dropTable('titles');
          this.connection.createTable('titles', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        customerTypeTable: function(){
          this.connection.createTable('customer_types', '`id` INTEGER PRIMARY KEY, `label` TEXT');
        },
        industryTypeTable: function(){
          this.connection.createTable('industry_types', '`id` INTEGER PRIMARY KEY, `label` TEXT');
        },
        leadSourceTypeTable: function(){
          this.connection.createTable('lead_source_types', '`id` INTEGER PRIMARY KEY, `label` TEXT');
        },
        clearTitles : function(){
            this.connection.destroy('titles', []);
        },
        addTitles : function(titles){
            var self = this;
            angular.forEach(titles, function(title){

                self.connection.insert('titles', {"id": title.id, "label": title.label, "_default": title.default} );
            });
        }

    }
}])