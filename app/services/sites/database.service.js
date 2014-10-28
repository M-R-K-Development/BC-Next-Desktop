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
            this.ratingTypesTable();
        },
        titlesTable : function(){
            this.connection.createTable('titles', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        customerTypeTable: function(){
            this.connection.dropTable('customer_types');
            this.connection.createTable('customer_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        industryTypeTable: function(){
            this.connection.dropTable('industry_types');
          this.connection.createTable('industry_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        leadSourceTypeTable: function(){
            this.connection.dropTable('lead_source_types');
          this.connection.createTable('lead_source_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        ratingTypesTable: function(){
          this.connection.createTable('rating_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        clearTitles : function(){
            this.connection.destroy('titles', []);
        },
        clearRatingTypes : function(){
            this.connection.destroy('rating_types', []);
        },
        addTitles : function(titles){
            var self = this;
            angular.forEach(titles, function(title){

                self.connection.insert('titles', {"id": title.id, "label": title.label, "_default": title.default} );
            });
        },
        addRatingTypes : function(rating_types){
            var self = this;
            angular.forEach(rating_types, function(rating_type){

                self.connection.insert('rating_types', {"id": rating_type.id, "label": rating_type.label, "_default": rating_type.default} );
            });
        }

    }
}])